import { Body, Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'src/common/constants/public.constant';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health-check')
  @Public()
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @Get('/echo')
  @Public()
  getEcho(@Req() req, @Res() res, @Body() body) {
    res.status(200).json(body);
  }
}
