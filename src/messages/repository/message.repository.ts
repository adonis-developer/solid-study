import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../entities/message.entity';

@Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(MessageEntity)
    private messageRepository: Repository<MessageEntity>,
  ) {}

  //   K để payload phu thuoc vao entity -> entity có thể thay đổi theo RDBMS
  async save(message: any): Promise<any> {
    return await this.messageRepository.save(message);
  }
}
