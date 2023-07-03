import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  // constructor(
  //   @InjectRepository(User)
  //   private readonly userRepository: Repository<User>,
  // ) {}

  async login(loginDto: LoginDto): Promise<LoginDto | any> {
    return 'Logging in' + loginDto;
  }

  async fetchLoggedInUser() {
    return 'I am loggedIn USer';
  }
  // async findById(id: any): Promise<User | null> {
  //   return this.userRepository.findOne(id);
  // }

  // validate passord
  // validate input strong password and username
  // validate
}
