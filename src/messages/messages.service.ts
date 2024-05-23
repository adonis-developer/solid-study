import { Injectable } from '@nestjs/common';
import { MessageFactory } from './factory/message.factory';
import { MessageModel } from './entities/message.model';

@Injectable()
export class MessagesService {
  constructor(private messageFactory: MessageFactory) {}

  handleReceiverMessage(type: string, messageDto: MessageModel) {
    const messageTypeInstance = this.messageFactory.create(type, messageDto);
    messageTypeInstance.execute();
  }

  create(createMessageDto: any) {
    this.handleReceiverMessage(createMessageDto.typeAction, createMessageDto);
    return 'This action adds a new message';
  }
}
