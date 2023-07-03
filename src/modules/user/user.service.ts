import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositpry: Repository<User>,
  ) {}

  async createUser(userDto: UserDto) {
    return await this.userRepositpry.save(userDto);
  }
}
