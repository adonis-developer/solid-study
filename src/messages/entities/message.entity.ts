import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

export enum TypeActionEnum {
  NONE = 'NONE',
  COMMISSION = 'COMMISSION',
  LUCKY_SHAKING = 'LUCKY_SHAKING',
  JOIN_NETWORK = 'JOIN_NETWORK',
  CREATE_CAMPAIGN = 'CREATE_CAMPAIGN',
  SEND_REF_LINK = 'SEND_REF_LINK',
  JOIN_WALLET = 'JOIN_WALLET',
  FIRST_SHARE = 'FIRST_SHARE',
}

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'message_id' })
  messageId: string;

  @Column({ default: false, type: 'boolean', name: 'is_read' })
  isRead: boolean;

  @Column({ name: 'banner_uri', nullable: true, type: 'text' })
  bannerUri: string;

  @Column({ name: 'commission', array: true, nullable: true })
  commission: string;

  @Column({ name: 'commission_from_ids', type: 'jsonb', nullable: true })
  commissionFromIds: Record<string, any>[];

  @Column({ name: 'user_ids', array: true, nullable: true })
  userIds: string;

  @Column({ name: 'target_user_id', type: 'bigint', nullable: true })
  targetUserId: number;

  @Column({ name: 'ref_user_id', type: 'bigint', nullable: true })
  refUserId: number;

  @Column({ type: 'bigint', nullable: true })
  amount: number;

  @Column({ name: 'content', type: 'text', nullable: true })
  content: string;

  @Column({
    name: 'type_action',
    enum: TypeActionEnum,
    default: TypeActionEnum.NONE,
  })
  typeAction: string;
}
