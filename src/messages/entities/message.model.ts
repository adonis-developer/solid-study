import { TypeActionEnum } from './message.entity';

export class MessageModel {
  id?: number;

  messageId: string;

  isRead: boolean;

  bannerUri: string;

  commission: string;

  commissionFromIds: Record<string, any>[];

  userIds: string;

  targetUserId: number;

  refUserId: number;

  amount: number;

  content: string;
  typeAction: TypeActionEnum;

  constructor(payload: MessageModel) {
    this.messageId = payload.messageId;
    this.isRead = payload.isRead;
    this.bannerUri = payload.bannerUri;
    this.commission = payload.commission;
    this.commissionFromIds = payload.commissionFromIds;
    this.userIds = payload.userIds;
    this.targetUserId = payload.targetUserId;
    this.refUserId = payload.refUserId;
    this.amount = payload.amount;
    this.content = payload.content;
    this.typeAction = payload.typeAction;
  }
}
