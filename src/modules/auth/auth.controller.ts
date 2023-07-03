import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.entity';
import { IToken } from 'src/types/token';
import { AuthGuard } from '@nestjs/passport';
import { AppAuthGuard } from 'src/gaurds/auth.gaurd';

// @ApiBearerAuth()
// @Roles(RoleEnum.admin)
// @UseGuards(AuthGuard('jwt'), RolesGuard)

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.UNAUTHORIZED)
  async login(@Body() loginDto: LoginDto): Promise<IToken> {
    return await this.authService.login(loginDto);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AppAuthGuard)
  @ApiBearerAuth()
  async fetchLoggedUser(@Query() user: User) {
    return await this.authService.me(user);
  }
}
