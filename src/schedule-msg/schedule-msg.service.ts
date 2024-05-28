import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import {
  MessageEntity,
  TypeActionEnum,
} from 'src/messages/entities/message.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ScheduleMsgService {
  private readonly logger = new Logger(ScheduleMsgService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(MessageEntity)
    private readonly msgRepo: Repository<MessageEntity>,
  ) {}

  private running = false;

  @Cron('*/15 * * * * *', {
    name: 'job_daily_message',
  })
  public async handleCron() {
    try {
      //   if (this.running) {
      //     this.logger.log('Job is running');
      //     return;
      //   }
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

      const newData = chunk.map((user: UserEntity) => {
        const now = new Date();
        now.setHours(8, 0, 0, 0);
        const msgData = new MessageEntity();
        msgData.amount = 0;
        msgData.bannerUri =
          'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-3.jpg';
        msgData.refUserId = user.id;
        msgData.commissionFromIds = [
          { d: 412873123 },
          { c: 9827321937 },
          { b: 12836127836 },
        ];

        msgData.content = 'XIN CHÀO CÁC BẠN Tôi là Assistant của Mèo nè';
        msgData.messageId = randomUUID();
        msgData.typeAction = TypeActionEnum.LUCKY_SHAKING;
        msgData.targetUserId = user.userId;
        msgData.createdAt = now;
        msgData.updatedAt = now;
        return msgData;
      });

      await this.msgRepo.save(newData);
    }

    this.logger.verbose(`Finish create msg daily for ${countUser.length} user`);
  }
}
