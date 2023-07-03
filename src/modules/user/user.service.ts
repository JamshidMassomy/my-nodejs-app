import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dtos/user.dto';
import { encrypt } from 'src/util/password.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositpry: Repository<User>,
  ) {}

  async createUser(userDto: UserDto): Promise<User> {
    const user = new User();
    user.username = userDto.email;
    user.password = await encrypt(userDto.password);
    // user.password = await bcrypt.hash(userDto.password, 10);
    return this.userRepositpry.save(user);
  }

  async findbyUserName(username: string): Promise<User | undefined> {
    return await this.userRepositpry.findOne({ where: { username } });
  }

  async findMe(id: number): Promise<User | undefined> {
    return await this.userRepositpry.findOne({ where: { id } });
  }
}
