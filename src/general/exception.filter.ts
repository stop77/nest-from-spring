import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseException, UnCatchedException } from './base.exception';
import { format, getNow } from './format.date';
import { ExceptionCodeEnum } from './exception.enum';

class PipeException {
  message: string[];
  error: string;
  statusCode: number;
}

function validateClass(instance: any, schema: { new (): any }): boolean {
  let target = new schema();

  for (let key in target) {
    if (instance[key] === null || instance[key] === undefined) return false;
    else {
      if (typeof instance[key] != typeof target[key]) return false;
    }
  }

  return true;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (validateClass(exception.getResponse(), PipeException)) {
      return response.status(status).json({
        success: false,
        errorCode: ExceptionCodeEnum.ValidationPipe,
        message: (exception.getResponse() as PipeException).message.join(),
        timestamp: format(getNow()),
        path: request.url,
      });
    } else {
      const res =
        exception instanceof BaseException
          ? exception
          : new UnCatchedException();

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
}
