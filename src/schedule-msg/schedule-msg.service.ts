import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { ConversationService } from 'src/conversation/conversation.service';
import {
  ActionMessageEnum,
  IContentType,
  MessageEntity,
} from 'src/messages/entities/message.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment';
export const CAMPAIGN_DAILY_MESSAGE = {
  DAILY_CHECK_IN: 'DAILY_CHECK_IN',
  DAILY_LUCKY_SHAKING: 'DAILY_LUCKY_SHAKING',
  DAILY_JOIN_WAIT_LIST: 'DAILY_JOIN_WAIT_LIST',
};
@Injectable()
export class ScheduleMsgService {
  private readonly logger = new Logger(ScheduleMsgService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(MessageEntity)
    private readonly msgRepo: Repository<MessageEntity>,
    private readonly conversationService: ConversationService,
  ) {}

  private running = false;

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'job_daily_message',
  })
  public async handleCron() {
    try {
      if (this.running) {
        this.logger.log('Job is running');
        return;
      }
      const startTime = new Date().getTime();

      this.running = true;
      await this._createMsgDailyForCampaign();

      const endTime = new Date().getTime();
      const time = (endTime - startTime) / 1000;

      this.logger.log(`Cronjob update day data done ${time}s`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async _createMsgDailyForCampaign() {
    const countUser = await this.userRepo.find();
    const chunkSize = 1000;
    const totalChunks = Math.ceil(countUser.length / chunkSize); // 39
    //38620
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize; //0 * 1000 = 0
      const end = Math.min((i + 1) * chunkSize, countUser.length); // 1000 <  3862 = > 1000

      const chunk = countUser.slice(start, end);

      // const newData = chunk.map(async (user: UserEntity) => {});

      const msgDatas = [];
      for (const user of chunk) {
        for (const dailyType in CAMPAIGN_DAILY_MESSAGE) {
          const conversation = await this.conversationService.create({
            assistantId: 1,
            sender: null,
            receiver: user.userId,
          });
          const now = new Date();
          now.setHours(8, 0, 0, 0);
          const msgData = new MessageEntity();
          if (
            CAMPAIGN_DAILY_MESSAGE[dailyType] ===
            CAMPAIGN_DAILY_MESSAGE.DAILY_CHECK_IN
          ) {
            msgData.content = this._choseContentMsg(
              CAMPAIGN_DAILY_MESSAGE.DAILY_CHECK_IN,
              user,
            );
            msgData.title = 'Daily Check-in';
            msgData.action = ActionMessageEnum.JOIN;
            msgData.campaignId = null; // TODO: update campaignId
          }
          if (
            CAMPAIGN_DAILY_MESSAGE[dailyType] ===
            CAMPAIGN_DAILY_MESSAGE.DAILY_LUCKY_SHAKING
          ) {
            msgData.content = this._choseContentMsg(
              CAMPAIGN_DAILY_MESSAGE.DAILY_LUCKY_SHAKING,
              user,
            );
            msgData.title = 'Lucky Shaking';
            msgData.action = ActionMessageEnum.JOIN;
            msgData.campaignId = null; // TODO: update campaignId
          }
          if (
            CAMPAIGN_DAILY_MESSAGE[dailyType] ===
            CAMPAIGN_DAILY_MESSAGE.DAILY_JOIN_WAIT_LIST
          ) {
            msgData.content = this._choseContentMsg(
              CAMPAIGN_DAILY_MESSAGE.DAILY_JOIN_WAIT_LIST,
              user,
            );
            msgData.title = 'Join Waitlist';
            msgData.action = ActionMessageEnum.SHARE;
          }

          msgData.typeAction = CAMPAIGN_DAILY_MESSAGE[dailyType];
          msgData.conversationId = conversation.id;
          msgData.createdAt = now;
          msgData.updatedAt = now;
          msgDatas.push(msgData);
        }
      }

      await this.msgRepo.save(msgDatas);
      this.logger.verbose(
        `Finish save chunk:${chunk.length} ## ${start} => ${end} | Total record: ${msgDatas.length} `,
      );
    }

    this.logger.verbose(`Finish create msg daily for ${countUser.length} user`);
  }

  _choseContentMsg(type: string, user: UserEntity) {
    let content: IContentType = { vi: '', en: '' };
    const isSaturday = moment().day() === 6;
    const isSunday = moment().day() === 0;
    if (type === CAMPAIGN_DAILY_MESSAGE.DAILY_CHECK_IN) {
      if (isSaturday || isSunday) {
        content = {
          en: `Good morning ${user.userName}! Today is weekend and wish you have a nice day with your beloved. Let’s join Daily Check-in on XLP Network App to mint FREE XR every day and get lucky lucky.`,
          vi: `Chào buổi sáng ${user.userName}! Hôm nay là cuối tuần và chúc các bạn có một ngày vui vẻ bên người mình yêu thương. Hãy cùng tham gia Daily Check-in trên Ứng dụng Mạng XLP để kiếm XR MIỄN PHÍ mỗi ngày và nhận may mắn.`,
        };
      }
      //TODO: handel for holiday
      if (false) {
        content = {
          en: `Good morning ${user.userName}! Vacation is comming and wish you have a nice day with your beloved. Let’s join Daily Check-in on XLP Network App to mint FREE XR every day and get lucky lucky.`,
          vi: `Chào buổi sáng ${user.userName}! Kỳ nghỉ đang đến gần và chúc bạn có một ngày vui vẻ bên người thân yêu. Hãy cùng tham gia Daily Check-in trên Ứng dụng Mạng XLP để kiếm XR MIỄN PHÍ mỗi ngày và nhận may mắn.`,
        };
      }
      content = {
        en: `Good morning ${user.userName}! New day is comming and wish you have a nice day with your beloved. Let’s join Daily Check-in on XLP Network App to mint FREE XR every day and get lucky lucky.`,
        vi: `Chào buổi sáng ${user.userName}! Ngày mới đang đến chúc các bạn có một ngày vui vẻ bên người thân yêu. Hãy cùng tham gia Daily Check-in trên Ứng dụng Mạng XLP để kiếm XR MIỄN PHÍ mỗi ngày và nhận may mắn.`,
      };
    }
    if (type === CAMPAIGN_DAILY_MESSAGE.DAILY_LUCKY_SHAKING) {
      if (isSaturday || isSunday) {
        content = {
          en: `Good morning ${user.userName}! Today is weekend and wish you have a nice day with your beloved. Let’s join Lucky Shaking on XLP Network App to mint FREE XR every day and get lucky lucky.`,
          vi: `Chào buổi sáng ${user.userName}! Hôm nay là cuối tuần và chúc các bạn có một ngày vui vẻ bên người mình yêu thương. Hãy cùng tham gia Lucky Shaking trên Ứng dụng Mạng XLP để đúc XR MIỄN PHÍ mỗi ngày và nhận may mắn nhé.`,
        };
      }
      //TODO: handel for holiday
      if (false) {
        content = {
          en: `Good morning ${user.userName}! Vacation is comming and wish you have a nice day with your beloved. Let’s join Lucky Shaking on XLP Network App to mint FREE XR every day and get lucky lucky.`,
          vi: `Chào buổi sáng ${user.userName}! Kỳ nghỉ đang đến gần và chúc bạn có một ngày vui vẻ bên người thân yêu. Hãy cùng tham gia Lucky Shakes trên Ứng dụng Mạng XLP để đúc XR MIỄN PHÍ mỗi ngày và nhận may mắn nhé.`,
        };
      }
      content = {
        en: `Good morning ${user.userName}! New day is comming and wish you have a nice day with your beloved. Let’s join Lucky Shaking on XLP Network App to mint FREE XR every day and get lucky lucky.`,
        vi: `Chào buổi sáng ${user.userName}! Ngày mới sắp đến chúc các bạn có một ngày vui vẻ bên người thân yêu. Hãy cùng tham gia Lucky Shaking trên Ứng dụng Mạng XLP để đúc XR MIỄN PHÍ mỗi ngày và nhận may mắn nhé.`,
      };
    }
    if (type === CAMPAIGN_DAILY_MESSAGE.DAILY_JOIN_WAIT_LIST) {
      content = {
        en: `Congrats ${user.userName}! It’s amazing that $people$ people are behind you and get more day by day. Let’s share to someone joining XLP Waitlist App to mint FREE XR every day and get lucky lucky.`,
        vi: `Xin chúc mừng ${user.userName}! Thật ngạc nhiên khi có  $people$ người ủng hộ bạn và nhận được nhiều hơn mỗi ngày. Hãy chia sẻ với ai đó đang tham gia Ứng dụng Danh sách chờ XLP để kiếm XR MIỄN PHÍ mỗi ngày và nhận may mắn.`,
      };
    }
    return content;
  }
}
