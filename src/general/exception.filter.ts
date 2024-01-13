import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseException, UnCatchedException } from './base.exception';
import { format, getNow } from './format.date';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const res =
      exception instanceof BaseException ? exception : new UnCatchedException();

    res.timestamp = format(getNow());
    res.path = request.url;

    return response.status(status).json({
      success: false,
      errorCode: res.getResponse(),
      message: res.message,
      timestamp: res.timestamp,
      path: res.path,
    });
  }
}
