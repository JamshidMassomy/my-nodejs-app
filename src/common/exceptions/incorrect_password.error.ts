import { HttpException, HttpStatus } from '@nestjs/common';
import { UNAUTHORIZED_ERROR } from 'src/common/constants/error.constant';

export class IncorrectPasswordException extends HttpException {
  constructor(message?: string, code?: number) {
    super(
      {
        message: message || UNAUTHORIZED_ERROR,
        code: code || HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
