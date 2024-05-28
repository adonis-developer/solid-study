import { Controller } from '@nestjs/common';
import { ScheduleMsgService } from './schedule-msg.service';

@Controller('schedule-msg')
export class ScheduleMsgController {
  constructor(private readonly scheduleMsgService: ScheduleMsgService) {}
}
