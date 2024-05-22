export const STARTING_BLOCK = Number(process.env.STARTING_BLOCK || 240_000_000)
export const PREINDEX_BLOCK = Number(246_145_456)
export const PROGRAM_ID = 'CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d'


// Setup
export const ARCHIVE_URL = 'https://v2.archive.subsquid.io/network/solana-mainnet'
export const NODE_URL = process.env.RPC_ENDPOINT || ''

export const disabledRPC = true || NODE_URL == undefined
const CHAIN = 'solana-mainnet'

console.table({
    CHAIN, ARCHIVE_URL, NODE_URL, STARTING_BLOCK,
    REGISTRY: PROGRAM_ID,
    disabledRPC,
    
})

export const getArchiveUrl = (): string => ARCHIVE_URL
export const getNodeUrl = (): string => NODE_URL || ''
