import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { matchPassword } from 'src/common/util/password.helper';
import { IncorrectPasswordException } from 'src/common/exceptions/incorrect_password.error';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IToken } from 'src/types/token';
import { NotFoundException } from 'src/common/exceptions/user_not_found.exception';
import {
  INCORRECT_PASSWORD,
  USER_NOT_FOUND,
} from 'src/common/constants/error.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * @description authenticatee with user
   * @param payload loginDto
   * @returns token
   */
  async login(loginDto: LoginDto): Promise<IToken> {
    const user: User = await this.userService.findbyUserName(loginDto.username);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const isValidPassword = await matchPassword(
      user.password,
      loginDto.password,
    );

    if (!isValidPassword) {
      throw new IncorrectPasswordException(
        INCORRECT_PASSWORD,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return await this.getTokenData();
  }

  /**
   * @description Validate the token and return the user
   * @param payload string
   * @returns User
   */
  async me(user: User): Promise<User | string> {
    return 'hello';
    // return await this.userService.findMe(user.id);
  }

  /**
   * @description Validate the token and return the user
   * @param payload string
   * @returns User
   */
  async getTokenData(): Promise<IToken> {
    const tokenExpiresIn = this.configService.getOrThrow('jwt.expires', {
      infer: true,
    });

    // const tokenExpires = Date.now() + ms(tokenExpiresIn);
    const tokenExpires = Date.now() + tokenExpiresIn;
    const [token, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: 1,
          role: 'Admin',
          sessionId: '342',
        },
        {
          secret: this.configService.getOrThrow('jwt.secret', { infer: true }),
          expiresIn: 234234234,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: '324234',
        },
        {
          secret: this.configService.getOrThrow('jwt.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('jwt.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);
    console.log('token', token);
    return {
      token,
      refreshToken,
      tokenExpires,
    };
  }
  // validate passord
  // validate input strong password and username
  // validate
}
