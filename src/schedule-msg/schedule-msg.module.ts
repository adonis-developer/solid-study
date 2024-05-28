import { Module } from '@nestjs/common';
import { ScheduleMsgService } from './schedule-msg.service';
import { ScheduleMsgController } from './schedule-msg.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { MessageEntity } from 'src/messages/entities/message.entity';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity, MessageEntity]),
  ],
  controllers: [ScheduleMsgController],
  providers: [ScheduleMsgService],
})
export class ScheduleMsgModule {}
