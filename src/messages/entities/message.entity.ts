import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum TypeActionEnum {
  NONE = 'NONE',
  MISSION = 'MISSION',
  COMMISSION = 'COMMISSION', // COMMISSION Transaction
  LUCKY_SHAKING = 'LUCKY_SHAKING',
  JOIN_NETWORK = 'JOIN_NETWORK',
  CREATE_CAMPAIGN = 'CREATE_CAMPAIGN',
  SEND_REF_LINK = 'SEND_REF_LINK',
  JOIN_WAIT_LIST = 'JOIN_WAITLIST',
  FIRST_SHARE = 'FIRST_SHARE',
  BUY_LUCKY_POWER = 'BUY_LUCKY_POWER',
  GAME_REWARD = 'GAME_REWARD',
}

export enum StatusMessageEnum {
  NONE = 'NONE',
  CLAIMED = 'CLAIMED',
}

export enum ActionMessageEnum {
  NONE = 'NONE',
  CLAIM = 'CLAIM',
  JOIN = 'JOIN',
  VIEW_MORE = 'VIEW_MORE',
  SHARE = 'SHARE',
}
export interface IContentType {
  vi: string;
  en: string;
}

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'campaign_id', nullable: true, type: 'int' })
  campaignId: number;

  @Column({ name: 'conversation_id', type: 'int' })
  conversationId: number;

  @Column({ name: 'sender_id', type: 'int', nullable: true })
  senderId: number;

  @Column({ default: false, type: 'boolean', name: 'is_read' })
  isRead: boolean;

  @Column({
    name: 'action',
    enum: ActionMessageEnum,
    default: ActionMessageEnum.NONE,
  })
  action: string;

  @Column({ name: 'mission_ids', array: true, type: 'int', nullable: true })
  missionIds: number[];

  /*user_ids look like commission -> also have value when user play event lucky shaking */
  @Column({ name: 'user_ids', array: true, type: 'int', nullable: true })
  userIds: number[];

  @Column({
    name: 'commission_ids',
    array: true,
    type: 'int',
    nullable: true,
  })
  commissionIds: number[];

  @Column({
    name: 'type_action',
    enum: TypeActionEnum,
    default: TypeActionEnum.NONE,
  })
  typeAction: string;

  @Column({
    name: 'shaker_ids',
    array: true,
    type: 'int',
    nullable: true,
  })
  shakerIds: number[];

  @Column({ name: 'ref_user_id', type: 'int', nullable: true })
  refUserId: number;

  @Column({ type: 'double precision', nullable: true })
  amount: number;

  @Column({ name: 'content', type: 'jsonb', nullable: true })
  content: IContentType;

  @Column({ name: 'title', type: 'text', nullable: true })
  title: string;

  @Column({
    enum: StatusMessageEnum,
    default: StatusMessageEnum.NONE,
  })
  status: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;

  @Column({ name: 'is_deleted', type: 'boolean', default: false })
  isDeleted: boolean;

  // @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  // @JoinColumn({ name: 'conversation_id' })
  // conversation: Conversation;
}
