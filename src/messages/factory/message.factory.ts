// src/messages/message.factory.ts
import { Injectable } from '@nestjs/common';
import { TypeActionEnum } from '../entities/message.entity';
import { JoinNetworkMessage } from '../type-actions/join-network.message';
import { MessageModel } from '../entities/message.model';
import { FirstShareMessage } from '../type-actions/first-share.message';
import { ITypeActionMessageExecute } from '../interface/type-action.interface';

@Injectable()
export class MessageFactory {
  constructor(
    private readonly joinNetwork: JoinNetworkMessage,
    private readonly firstShare: FirstShareMessage,
  ) {}

  create(type: string, payload: MessageModel): ITypeActionMessageExecute {
    switch (type) {
      case TypeActionEnum.JOIN_NETWORK:
        this.joinNetwork.createMsgModel(payload);
        return this.joinNetwork;
      case TypeActionEnum.FIRST_SHARE:
        this.firstShare.createMsgModel(payload);
        return this.firstShare;

      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  }
}
