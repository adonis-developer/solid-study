import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

@Entity('users')
export class User {
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

  /*user_ids look like commission -> also have value when user play event lucky shaking */
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
}
