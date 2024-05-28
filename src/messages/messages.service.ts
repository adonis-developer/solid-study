import { Injectable } from '@nestjs/common';
import { MessageFactory } from './factory/message.factory';

@Injectable()
export class MessagesService {
  constructor(private messageFactory: MessageFactory) {}

  create(createMessageDto: any) {
    const messageTypeInstance = this.messageFactory.create(
      createMessageDto.typeAction,
      createMessageDto,
    );
    messageTypeInstance.execute();
    return 'This action adds a new message';
  }
}
