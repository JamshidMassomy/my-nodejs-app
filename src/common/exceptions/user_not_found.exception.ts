import { HttpException, HttpStatus } from '@nestjs/common';
import { NOT_FOUND } from 'src/common/constants/error.constant';

export class NotFoundException extends HttpException {
  constructor(message?: string, code?: number) {
    super(
      {
        message: message || NOT_FOUND,
        code: code || HttpStatus.NOT_FOUND,
        error: true,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
