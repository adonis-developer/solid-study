import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConversationService {
  constructor(
    @InjectRepository(Conversation)
    private readonly repo: Repository<Conversation>,
  ) {}

  async create(createConversationDto: Omit<Conversation, 'id'>) {
    const isExist = await this.repo.findOne({
      where: {
        assistantId: 1,
        receiver: createConversationDto.receiver,
      },
    });
    if (isExist) return isExist;
    return this.repo.save(createConversationDto);
  }
}
