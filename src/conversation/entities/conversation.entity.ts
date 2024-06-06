import { Column, Entity, Index } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

@Index('conversations_receiver_idx', ['receiver'])
@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'assistant_id', default: 1 })
  assistantId: number;

  @Column({ name: 'receiver', type: 'int' })
  receiver: number;

  @Column({ name: 'sender', type: 'int', nullable: true })
  sender: number;
}
