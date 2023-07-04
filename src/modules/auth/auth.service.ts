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
  UNAUTHORIZED_ERROR,
  USER_NOT_FOUND,
} from 'src/common/constants/error.constant';
import { UnauthorizedException } from 'src/common/exceptions/unauthorized_exception';
import {
  JWT_EXPIRE_KEY,
  JWT_SECRET_KEY,
} from 'src/common/constants/public.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * @description Authenticatee with username and password
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
   * @description Fetch current loggedin user
   * @param payload Request
   * @returns User
   */
  async me(request: any): Promise<User | any> {
    if (request?.user) {
      const user = request.user;
      return { id: user.id, email: user.email };
    } else {
      throw new UnauthorizedException(
        UNAUTHORIZED_ERROR,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  /**
   * @description Generate jwt token
   * @param payload User
   * @returns IToken
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
          secret: this.configService.getOrThrow(JWT_SECRET_KEY, {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow(JWT_EXPIRE_KEY, {
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
