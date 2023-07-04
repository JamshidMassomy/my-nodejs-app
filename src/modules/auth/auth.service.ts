import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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

    return await this.getTokenData(user);
  }

  /**
   * @description Validate the token and return the user
   * @param payload string
   * @returns User
   */
  async me(request: any): Promise<User | any> {
    if (request?.user) {
      const user = request.user;
      return { id: user.id, email: user.email };
    } else {
      throw new UnauthorizedException('Unauthorized or user profile not found');
    }
  }

  /**
   * @description Validate the token and return the user
   * @param payload string
   * @returns User
   */
  async getTokenData(user: User): Promise<IToken> {
    const tokenExpiresIn = this.configService.getOrThrow('jwt.expires', {
      infer: true,
    });

    // const tokenExpires = Date.now() + ms(tokenExpiresIn);
    const tokenExpires = Date.now() + tokenExpiresIn;
    const [token] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: user.id,
          email: user.email,
        },
        {
          secret: this.configService.getOrThrow('jwt.secret', { infer: true }),
          expiresIn: this.configService.getOrThrow('jwt.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);
    return {
      token,
      tokenExpires,
    };
  }
  // validate passord
  // validate input strong password and username
  // validate
}
