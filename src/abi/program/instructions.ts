import {struct, unit} from '@subsquid/borsh'
import {instruction} from '../idl.support'
import {CreateV1Args, CreateCollectionV1Args, AddPluginV1Args, AddCollectionPluginV1Args, RemovePluginV1Args, RemoveCollectionPluginV1Args, UpdatePluginV1Args, UpdateCollectionPluginV1Args, ApprovePluginAuthorityV1Args, ApproveCollectionPluginAuthorityV1Args, RevokePluginAuthorityV1Args, RevokeCollectionPluginAuthorityV1Args, BurnV1Args, BurnCollectionV1Args, TransferV1Args, UpdateV1Args, UpdateCollectionV1Args, CompressV1Args, DecompressV1Args} from './types'

export interface CreateV1 {
    createV1Args: CreateV1Args
}

export const createV1 = instruction(
    {
        d1: '0x00',
    },
    {
        /**
         * The address of the new asset
         */
        asset: 0,
        /**
         * The collection to which the asset belongs
         */
        collection: 1,
        /**
         * The authority signing for creation
         */
        authority: 2,
        /**
         * The account paying for the storage fees
         */
        payer: 3,
        /**
         * The owner of the new asset. Defaults to the authority if not present.
         */
        owner: 4,
        /**
         * The authority on the new asset
         */
        updateAuthority: 5,
        /**
         * The system program
         */
        systemProgram: 6,
        /**
         * The SPL Noop Program
         */
        logWrapper: 7,
    },
    struct({
        createV1Args: CreateV1Args,
    }),
)

export interface CreateCollectionV1 {
    createCollectionV1Args: CreateCollectionV1Args
}

export const createCollectionV1 = instruction(
    {
        d1: '0x01',
    },
    {
        /**
         * The address of the new asset
         */
        collection: 0,
        /**
         * The authority of the new asset
         */
        updateAuthority: 1,
        /**
         * The account paying for the storage fees
         */
        payer: 2,
        /**
         * The system program
         */
        systemProgram: 3,
    },
    struct({
        createCollectionV1Args: CreateCollectionV1Args,
    }),
)

export interface AddPluginV1 {
    addPluginV1Args: AddPluginV1Args
}

export const addPluginV1 = instruction(
    {
        d8: '0x60155ee2c2357803',
    },
    {
        /**
         * The address of the asset
         */
        asset: 0,
        /**
         * The collection to which the asset belongs
         */
        collection: 1,
        /**
         * The account paying for the storage fees
         */
        payer: 2,
        /**
         * The owner or delegate of the asset
         */
        authority: 3,
        /**
         * The system program
         */
        systemProgram: 4,
        /**
         * The SPL Noop Program
         */
        logWrapper: 5,
    },
    struct({
        addPluginV1Args: AddPluginV1Args,
    }),
)

export interface AddCollectionPluginV1 {
    addCollectionPluginV1Args: AddCollectionPluginV1Args
}

export const addCollectionPluginV1 = instruction(
    {
        d8: '0x178eaad55ddab302',
    },
    {
        /**
         * The address of the asset
         */
        collection: 0,
        /**
         * The account paying for the storage fees
         */
        payer: 1,
        /**
         * The owner or delegate of the asset
         */
        authority: 2,
        /**
         * The system program
         */
        systemProgram: 3,
        /**
         * The SPL Noop Program
         */
        logWrapper: 4,
    },
    struct({
        addCollectionPluginV1Args: AddCollectionPluginV1Args,
    }),
)

export interface RemovePluginV1 {
    removePluginV1Args: RemovePluginV1Args
}

export const removePluginV1 = instruction(
    {
        d8: '0xaa4fca7b5165a858',
    },
    {
        /**
         * The address of the asset
         */
        asset: 0,
        /**
         * The collection to which the asset belongs
         */
        collection: 1,
        /**
         * The account paying for the storage fees
         */
        payer: 2,
        /**
         * The owner or delegate of the asset
         */
        authority: 3,
        /**
         * The system program
         */
        systemProgram: 4,
        /**
         * The SPL Noop Program
         */
        logWrapper: 5,
    },
    struct({
        removePluginV1Args: RemovePluginV1Args,
    }),
)

export interface RemoveCollectionPluginV1 {
    removeCollectionPluginV1Args: RemoveCollectionPluginV1Args
}

export const removeCollectionPluginV1 = instruction(
    {
        d8: '0x6fc1c8bc9f7ef234',
    },
    {
        /**
         * The address of the asset
         */
        collection: 0,
        /**
         * The account paying for the storage fees
         */
        payer: 1,
        /**
         * The owner or delegate of the asset
         */
        authority: 2,
        /**
         * The system program
         */
        systemProgram: 3,
        /**
         * The SPL Noop Program
         */
        logWrapper: 4,
    },
    struct({
        removeCollectionPluginV1Args: RemoveCollectionPluginV1Args,
    }),
)

export interface UpdatePluginV1 {
    updatePluginV1Args: UpdatePluginV1Args
}

export const updatePluginV1 = instruction(
    {
        d8: '0xad44300dff007620',
    },
    {
        /**
         * The address of the asset
         */
        asset: 0,
        /**
         * The collection to which the asset belongs
         */
        collection: 1,
        /**
         * The account paying for the storage fees
         */
        payer: 2,
        /**
         * The owner or delegate of the asset
         */
        authority: 3,
        /**
         * The system program
         */
        systemProgram: 4,
        /**
         * The SPL Noop Program
         */
        logWrapper: 5,
    },
    struct({
        updatePluginV1Args: UpdatePluginV1Args,
    }),
)

export interface UpdateCollectionPluginV1 {
    updateCollectionPluginV1Args: UpdateCollectionPluginV1Args
}

export const updateCollectionPluginV1 = instruction(
    {
        d8: '0xc81039978c92bf17',
    },
    {
        /**
         * The address of the asset
         */
        collection: 0,
        /**
         * The account paying for the storage fees
         */
        payer: 1,
        /**
         * The owner or delegate of the asset
         */
        authority: 2,
        /**
         * The system program
         */
        systemProgram: 3,
        /**
         * The SPL Noop Program
         */
        logWrapper: 4,
    },
    struct({
        updateCollectionPluginV1Args: UpdateCollectionPluginV1Args,
    }),
)

export interface ApprovePluginAuthorityV1 {
    approvePluginAuthorityV1Args: ApprovePluginAuthorityV1Args
}

export const approvePluginAuthorityV1 = instruction(
    {
        d8: '0x374224f0fa496724',
    },
    {
        /**
         * The address of the asset
         */
        asset: 0,
        /**
         * The collection to which the asset belongs
         */
        collection: 1,
        /**
         * The account paying for the storage fees
         */
        payer: 2,
        /**
         * The owner or delegate of the asset
         */
        authority: 3,
        /**
         * The system program
         */
        systemProgram: 4,
        /**
         * The SPL Noop Program
         */
        logWrapper: 5,
    },
    struct({
        approvePluginAuthorityV1Args: ApprovePluginAuthorityV1Args,
    }),
)

export interface ApproveCollectionPluginAuthorityV1 {
    approveCollectionPluginAuthorityV1Args: ApproveCollectionPluginAuthorityV1Args
}

export const approveCollectionPluginAuthorityV1 = instruction(
    {
        d8: '0xba633dbd6f18380a',
    },
    {
        /**
         * The address of the asset
         */
        collection: 0,
        /**
         * The account paying for the storage fees
         */
        payer: 1,
        /**
         * The owner or delegate of the asset
         */
        authority: 2,
        /**
         * The system program
         */
        systemProgram: 3,
        /**
         * The SPL Noop Program
         */
        logWrapper: 4,
    },
    struct({
        approveCollectionPluginAuthorityV1Args: ApproveCollectionPluginAuthorityV1Args,
    }),
)

export interface RevokePluginAuthorityV1 {
    revokePluginAuthorityV1Args: RevokePluginAuthorityV1Args
}

export const revokePluginAuthorityV1 = instruction(
    {
        d8: '0xfba92ac368e9c44a',
    },
    {
        /**
         * The address of the asset
         */
        asset: 0,
        /**
         * The collection to which the asset belongs
         */
        collection: 1,
        /**
         * The account paying for the storage fees
         */
        payer: 2,
        /**
         * The owner or delegate of the asset
         */
        authority: 3,
        /**
         * The system program
         */
        systemProgram: 4,
        /**
         * The SPL Noop Program
         */
        logWrapper: 5,
    },
    struct({
        revokePluginAuthorityV1Args: RevokePluginAuthorityV1Args,
    }),
)

export interface RevokeCollectionPluginAuthorityV1 {
    revokeCollectionPluginAuthorityV1Args: RevokeCollectionPluginAuthorityV1Args
}

export const revokeCollectionPluginAuthorityV1 = instruction(
    {
        d8: '0x788729dc5e06c286',
    },
    {
        /**
         * The address of the asset
         */
        collection: 0,
        /**
         * The account paying for the storage fees
         */
        payer: 1,
        /**
         * The owner or delegate of the asset
         */
        authority: 2,
        /**
         * The system program
         */
        systemProgram: 3,
        /**
         * The SPL Noop Program
         */
        logWrapper: 4,
    },
    struct({
        revokeCollectionPluginAuthorityV1Args: RevokeCollectionPluginAuthorityV1Args,
    }),
)

export interface BurnV1 {
    burnV1Args: BurnV1Args
}

export const burnV1 = instruction(
    {
        d8: '0xf163c24c067e319a',
    },
    {
        /**
         * The address of the asset
         */
        asset: 0,
        /**
         * The collection to which the asset belongs
         */
        collection: 1,
        /**
         * The account paying for the storage fees
         */
        payer: 2,
        /**
         * The owner or delegate of the asset
         */
        authority: 3,
        /**
         * The system program
         */
        systemProgram: 4,
        /**
         * The SPL Noop Program
         */
        logWrapper: 5,
    },
    struct({
        burnV1Args: BurnV1Args,
    }),
)

export interface BurnCollectionV1 {
    burnCollectionV1Args: BurnCollectionV1Args
}

export const burnCollectionV1 = instruction(
    {
        d8: '0x759ea6bce665868e',
    },
    {
        /**
         * The address of the asset
         */
        collection: 0,
        /**
         * The account paying for the storage fees
         */
        payer: 1,
        /**
         * The owner or delegate of the asset
         */
        authority: 2,
        /**
         * The SPL Noop Program
         */
        logWrapper: 3,
    },
    struct({
        burnCollectionV1Args: BurnCollectionV1Args,
    }),
)

export interface TransferV1 {
    transferV1Args: TransferV1Args
}

export const transferV1 = instruction(
    {
        d8: '0xdb5f400a3789856d',
    },
    {
        /**
         * The address of the asset
         */
        asset: 0,
        /**
         * The collection to which the asset belongs
         */
        collection: 1,
        /**
         * The account paying for the storage fees
         */
        payer: 2,
        /**
         * The owner or delegate of the asset
         */
        authority: 3,
        /**
         * The new owner to which to transfer the asset
         */
        newOwner: 4,
        /**
         * The system program
         */
        systemProgram: 5,
        /**
         * The SPL Noop Program
         */
        logWrapper: 6,
    },
    struct({
        transferV1Args: TransferV1Args,
    }),
)

export interface UpdateV1 {
    updateV1Args: UpdateV1Args
}

export const updateV1 = instruction(
    {
        d8: '0xcf9dbb3fcd951fa5',
    },
    {
        /**
         * The address of the asset
         */
        asset: 0,
        /**
         * The collection to which the asset belongs
         */
        collection: 1,
        /**
         * The account paying for the storage fees
         */
        payer: 2,
        /**
         * The update authority or update authority delegate of the asset
         */
        authority: 3,
        /**
         * The system program
         */
        systemProgram: 4,
        /**
         * The SPL Noop Program
         */
        logWrapper: 5,
    },
    struct({
        updateV1Args: UpdateV1Args,
    }),
)

export interface UpdateCollectionV1 {
    updateCollectionV1Args: UpdateCollectionV1Args
}

export const updateCollectionV1 = instruction(
    {
        d8: '0xaa50f8b0aa8e1195',
    },
    {
        /**
         * The address of the asset
         */
        collection: 0,
        /**
         * The account paying for the storage fees
         */
        payer: 1,
        /**
         * The update authority or update authority delegate of the asset
         */
        authority: 2,
        /**
         * The new update authority of the asset
         */
        newUpdateAuthority: 3,
        /**
         * The system program
         */
        systemProgram: 4,
        /**
         * The SPL Noop Program
         */
        logWrapper: 5,
    },
    struct({
        updateCollectionV1Args: UpdateCollectionV1Args,
    }),
)

export interface CompressV1 {
    compressV1Args: CompressV1Args
}

export const compressV1 = instruction(
    {
        d8: '0xe97f67bd47f17fb2',
    },
    {
        /**
         * The address of the asset
         */
        asset: 0,
        /**
         * The collection to which the asset belongs
         */
        collection: 1,
        /**
         * The account receiving the storage fees
         */
        payer: 2,
        /**
         * The owner or delegate of the asset
         */
        authority: 3,
        /**
         * The system program
         */
        systemProgram: 4,
        /**
         * The SPL Noop Program
         */
        logWrapper: 5,
    },
    struct({
        compressV1Args: CompressV1Args,
    }),
)

export interface DecompressV1 {
    decompressV1Args: DecompressV1Args
}

export const decompressV1 = instruction(
    {
        d8: '0x36554c46e4faa451',
    },
    {
        /**
         * The address of the asset
         */
        asset: 0,
        /**
         * The collection to which the asset belongs
         */
        collection: 1,
        /**
         * The account paying for the storage fees
         */
        payer: 2,
        /**
         * The owner or delegate of the asset
         */
        authority: 3,
        /**
         * The system program
         */
        systemProgram: 4,
        /**
         * The SPL Noop Program
         */
        logWrapper: 5,
    },
    struct({
        decompressV1Args: DecompressV1Args,
    }),
)

export type Collect = undefined

export const collect = instruction(
    {
        d8: '0xd02fc29b116252ec',
    },
    {
        /**
         * The address of the recipient 1
         */
        recipient1: 0,
        /**
         * The address of the recipient 2
         */
        recipient2: 1,
    },
    unit,
)
