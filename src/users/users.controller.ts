import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  @Post()
  create() {
    for (let i = 0; i < 10000; i++) {
      const user = new UserEntity();
      user.userId = i + 1;
      user.userName = `User Fake ${i + 1}`;
      this.userRepo.save(user);
    }
    return { ok: true };
  }
}
