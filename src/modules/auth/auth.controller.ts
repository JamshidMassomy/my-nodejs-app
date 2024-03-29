import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { IToken } from 'src/types/token';
import { AppAuthGuard } from 'src/common/gaurd/app.gaurd';
import { Public } from 'src/common/constants/public.constant';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<IToken> {
    return await this.authService.login(loginDto);
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AppAuthGuard)
  @ApiBearerAuth()
  async fetchMe(@Request() request) {
    return await this.authService.me(request);
  }
}
