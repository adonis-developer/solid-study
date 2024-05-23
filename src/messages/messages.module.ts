import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessageFactory } from './factory/message.factory';
import { JoinNetworkMessage } from './type-actions/join-network.message';
import { MessageRepository } from './repository/message.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './entities/message.entity';
import { FirstShareMessage } from './type-actions/first-share.message';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  controllers: [MessagesController],
  providers: [
    MessagesService,
    MessageFactory,
    JoinNetworkMessage,
    MessageRepository,
    FirstShareMessage,
  ],
})
export class MessagesModule {}
