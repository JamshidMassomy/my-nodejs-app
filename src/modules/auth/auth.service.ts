import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { matchPassword } from 'src/util/password.helper';
import { IncorrectPassword } from 'src/exceptions/incorrect_password.error';
import { UserNotFoundError } from 'src/exceptions/user_not_found.error copy';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IToken } from 'src/types/token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginDto: LoginDto): Promise<IToken> {
    const user: User = await this.userService.findbyUserName(loginDto.username);

    if (!user) {
      throw new UserNotFoundError();
    }

    const isValidPassword = await matchPassword(
      user.password,
      loginDto.password,
    );

    if (!isValidPassword) {
      throw new IncorrectPassword();
    }

    return await this.getTokenData();
  }

  async me(user: User): Promise<User | string> {
    return 'hello';
    // return await this.userService.findMe(user.id);
  }

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
