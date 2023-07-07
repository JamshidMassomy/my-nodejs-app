import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomeException extends HttpException {
  constructor(message?: string, code?: number) {
    super(
      {
        message: message,
        code: code,
      },
      code,
    );
  }
}
