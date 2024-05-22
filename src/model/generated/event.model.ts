import {
  BigIntColumn as BigIntColumn_,
  Column as Column_,
  DateTimeColumn as DateTimeColumn_,
  Entity as Entity_,
  Index as Index_,
  ManyToOne as ManyToOne_,
  PrimaryColumn as PrimaryColumn_,
  StringColumn as StringColumn_,
} from '@subsquid/typeorm-store'
import { Interaction } from './_interaction'
import { NFTEntity } from './nftEntity.model'

@Entity_()
export class Event {
  constructor(props?: Partial<Event>) {
    Object.assign(this, props)
  }

  @PrimaryColumn_()
  id!: string

  @BigIntColumn_({ nullable: true })
  blockNumber!: bigint | undefined | null

  @DateTimeColumn_({ nullable: false })
  timestamp!: Date

  @StringColumn_({ nullable: false })
  caller!: string

  @StringColumn_({ nullable: false })
  currentOwner!: string

  @Column_('varchar', { length: 6, nullable: false })
  interaction!: Interaction

  @StringColumn_({ nullable: false })
  meta!: string

  @Index_()
  @ManyToOne_(() => NFTEntity, { nullable: true })
  nft!: NFTEntity
}
