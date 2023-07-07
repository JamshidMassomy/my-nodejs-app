import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { GLOBAL_EXCEPTION_MESSAGE } from '../constants/error.constant';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let message: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message =
        exception.getResponse()['message'] ||
        exception.getResponse()['error'] ||
        message;
    }

    response.status(status).json({
      statusCode: status,
      message: message || GLOBAL_EXCEPTION_MESSAGE,
    });
  }
}
