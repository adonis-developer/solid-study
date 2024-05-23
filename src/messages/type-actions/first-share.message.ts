import { Injectable } from '@nestjs/common';
import { MessageModel } from '../entities/message.model';
import { ITypeActionMessageExecute } from '../interface/type-action.interface';
import { MessageRepository } from '../repository/message.repository';
import { TypeActionEnum } from '../entities/message.entity';

@Injectable()
export class FirstShareMessage implements ITypeActionMessageExecute {
  constructor(private messageRepository: MessageRepository) {}

  private msgModel: MessageModel;

  async execute() {
    await this.messageRepository.save(this.msgModel);
  }

  createMsgModel(payload: MessageModel) {
    const messageEntity = new MessageModel({
      ...payload,
      typeAction: TypeActionEnum.FIRST_SHARE,
    });
    this.msgModel = messageEntity;
  }
}
