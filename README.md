# stoick

[Squid](https://docs.subsquid.io) based data used to index, process, and query on top of Solana for [KodaDot](https://kodadot.xyz) NFT Marketplace.

## Hosted Squids

* Solana Mainet: 🚧 Coming soon 🚧

## Project structure

* `src/generated` - model/server definitions created by `codegen`. Do not alter the contents of this directory manually.
* `src/server-extension` - module with custom `type-graphql` based resolvers.
* `src/types` - data type definitions for chain events and extrinsics created by `typegen`.
* `src/mappings` - mapping module.
* `lib` - compiled js files. The structure of this directory must reflect `src`.
* `.env` - environment variables defined here or supplied by a shell.

## Prerequisites

* Node 20.x
* Docker
* npm
* [just](https://github.com/casey/just)

## Quickly running the sample

```bash
# 1. Install dependencies
npm install

# 2. Build project
just build

# 3. Start target Postgres database container
just upd

# 4. Update database with data objects
just migrate

# 5. Start the processor
just process

# 6. Open a separate terminal and launch the graphql server to query the processed data
just serve

# 7. Visit localhost:4350/graphql to see the result
```

## Misc

### Decoding binary data

`@subsquid/borsh` package allows to easily define fast and type-safe codec for any Solana data structure.

In the future we plan to develop robust code generation tools, 
that would allow to create all relevant definitions from IDL files automatically.

Meanwhile, [abi](./src/abi) module gives an example of how that might look like.

## Disclaimer

Solana support is in beta. 

In particular, we expect to make Subsquid Network data ingestion at least 50 times faster.
