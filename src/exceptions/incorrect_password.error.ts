import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectPassword extends HttpException {
  constructor() {
    super('Incorrect password', HttpStatus.UNAUTHORIZED);
  }
}
