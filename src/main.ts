import { DataHandlerContext, run } from '@subsquid/batch-processor'
import { augmentBlock } from '@subsquid/solana-objects'
import {
  Block,
  BlockHeader,
  DataSourceBuilder,
  Instruction as _Instruction,
  SolanaRpcClient,
  Transaction as _Transaction,
} from '@subsquid/solana-stream'
import { Store, TypeormDatabase } from '@subsquid/typeorm-store'
import assert from 'assert'
import * as tokenProgram from './abi/token-program'
import { instructions } from './abi/program'
import {
  CollectionEntity as CE,
  Interaction,
  MetadataEntity,
  NFTEntity as NE,
} from './model'
import { debug } from './mappings/utils/logger'
import {
  ARCHIVE_URL,
  disabledRPC,
  NODE_URL,
  PREINDEX_BLOCK,
  PROGRAM_ID,
  STARTING_BLOCK,
} from './environment'

// First we create a DataSource - component,
// that defines where to get the data and what data should we get.
const dataSource = new DataSourceBuilder()
  // Provide Subsquid Network Gateway URL.
  .setGateway(ARCHIVE_URL)
  // Subsquid Network is always about 1000 blocks behind the head.
  // We must use regular RPC endpoint to get through the last mile
  // and stay on top of the chain.
  // This is a limitation, and we promise to lift it in the future!
  .setRpc(
    disabledRPC ? undefined : {
      client: new SolanaRpcClient({
        url: NODE_URL,
        // rateLimit: 100 // requests per sec
      }),
      strideConcurrency: 10,
    },
  )
  // .setRpc(undefined)
  // Currently only blocks from 240_000_000 and above are stored in Subsquid Network.
  // When we specify it, we must also limit the range of requested blocks.
  //
  // Same applies to RPC endpoint of a node that cleanups its history.
  //
  // NOTE, that block ranges are specified in heights, not in slots !!!
  //
  // .setBlockRange({from: 240_000_000})
  // .setBlockRange({from: 267_000_000})
  .setBlockRange({ from: PREINDEX_BLOCK })
  //
  // Block data returned by the data source has the following structure:
  //
  // interface Block {
  //     header: BlockHeader
  //     transactions: Transaction[]
  //     instructions: Instruction[]
  //     logs: LogMessage[]
  //     balances: Balance[]
  //     tokenBalances: TokenBalance[]
  //     rewards: Reward[]
  // }
  //
  // For each block item we can specify a set of fields we want to fetch via `.setFields()` method.
  // Think about it as of SQL projection.
  //
  // Accurate selection of only required fields can have a notable positive impact
  // on performance when data is sourced from Subsquid Network.
  //
  // We do it below only for illustration as all fields we've selected
  // are fetched by default.
  //
  // It is possible to override default selection by setting undesired fields to `false`.
  .setFields({
    block: { // block header fields
      timestamp: true,
    },
    transaction: { // transaction fields
      signatures: true,
    },
    instruction: { // instruction fields
      programId: true,
      accounts: true,
      data: true,
    },
    tokenBalance: { // token balance record fields
      preAmount: true,
      postAmount: true,
      preOwner: true,
      postOwner: true,
    },
  })
  // By default, block can be skipped if it doesn't contain explicitly requested items.
  //
  // We request items via `.addXxx()` methods.
  //
  // Each `.addXxx()` method accepts item selection criteria
  // and also allows to request related items.
  //
  .addInstruction({
    // select instructions, that:
    where: {
      programId: [PROGRAM_ID], // where executed by Whirlpool program
      // d8: [instructions.createCollectionV1.d8], // have first 8 bytes of .data equal to create descriptor
      isCommitted: true, // where successfully committed
    },
    // for each instruction selected above
    // make sure to also include:
    include: {
      innerInstructions: true, // inner instructions
      transaction: true, // transaction, that executed the given instruction
      transactionTokenBalances: true, // all token balance records of executed transaction
    },
  })
  // .addInstruction({
  //     // select instructions, that:
  //     where: {
  //         programId: [PROGRAM_ID], // where executed by Whirlpool program
  //         d8: [instructions.createV1.d8], // have first 8 bytes of .data equal to mint descriptor
  //         isCommitted: true // where successfully committed
  //     },
  //     // for each instruction selected above
  //     // make sure to also include:
  //     include: {
  //         innerInstructions: true, // inner instructions
  //         transaction: true, // transaction, that executed the given instruction
  //         transactionTokenBalances: true, // all token balance records of executed transaction
  //     }
  // })
  .build()

// Once we've prepared a data source we can start fetching the data right away:
//
// for await (let batch of dataSource.getBlockStream()) {
//     for (let block of batch) {
//         console.log(block)
//     }
// }
//
// However, Subsquid SDK can also help to decode and persist the data.
//

// Data processing in Subsquid SDK is defined by four components:
//
//  1. Data source (such as we've created above)
//  2. Database
//  3. Data handler
//  4. Processor
//
// Database is responsible for persisting the work progress (last processed block)
// and for providing storage API to the data handler.
//
// Data handler is a user defined function which accepts consecutive block batches,
// storage API and is responsible for entire data transformation.
//
// Processor connects and executes above three components.
//

// Below we create a `TypeormDatabase`.
//
// It provides restricted subset of [TypeORM EntityManager API](https://typeorm.io/working-with-entity-manager)
// as a persistent storage interface and works with any Postgres-compatible database.
//
// Note, that we don't pass any database connection parameters.
// That's because `TypeormDatabase` expects a certain project structure
// and environment variables to pick everything it needs by convention.
// Companion `@subsquid/typeorm-migration` tool works in the same way.
//
// For full configuration details please consult
// https://github.com/subsquid/squid-sdk/blob/278195bd5a5ed0a9e24bfb99ee7bbb86ff94ccb3/typeorm/typeorm-config/src/config.ts#L21
const database = new TypeormDatabase()

// Now we are ready to start data processing
run(dataSource, database, async (ctx) => {
  // Block items that we get from `ctx.blocks` are flat JS objects.
  //
  // We can use `augmentBlock()` function from `@subsquid/solana-objects`
  // to enrich block items with references to related objects and
  // with convenient getters for derived data (e.g. `Instruction.d8`).
  let blocks = ctx.blocks.map(augmentBlock)

  const collections: CE[] = []

  for (let block of blocks) {
    for (let ins of block.instructions) {
      // https://read.cryptodatabytes.com/p/starter-guide-to-solana-data-analysis
      // console.log(ins.programId === PROGRAM_ID)
      if (ins.programId === PROGRAM_ID) {
        console.log(ins.d1)

        const discriminator = ins.d1 // Number(ins.d1)
        // debug('instruction' as any, ins, true)
        // debug('ins.inner' as any, ins.inner, true)
        // debug('getTX' as any, ins.getTransaction(), true)

        switch (discriminator) {
          // case instructions.createCollectionV1.d8:
          case instructions.createV1.d1:
            const mint = instructions.createV1.decode({
              accounts: ins.accounts,
              data: ins.data,
            })
            debug('createV1' as any, mint, true)
            break
          case instructions.createCollectionV1.d1:
            const collection = instructions.createCollectionV1.decode({
              accounts: ins.accounts,
              data: ins.data,
            })
            debug('createCollectionV1' as any, collection, true)
            break
          case instructions.transferV1.d1:
            const transfer = instructions.createCollectionV1.decode({
              accounts: ins.accounts,
              data: ins.data,
            })
            debug('transferV1' as any, transfer, true)
            break
          default:
            debug('unknown instruction' as any, {
              d1: ins.d1,
              d8: ins.d8,
              discriminator,
              tx: ins.getTransaction().signatures[0],
            }, true)
            break
        }
      }
    }
  }

  // await ctx.store.insert(collections)
})

// export type Block = BlockHeader<Fields>
// export type Process = DataHandlerContext<Block, Store>
