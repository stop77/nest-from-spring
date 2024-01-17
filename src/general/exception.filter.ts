import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import {
  BaseException,
  PassportValidationException,
  PipeException,
} from './base.exception';
import { format, getNow } from './format.date';
import { ExceptionCodeEnum } from './exception.enum';
import { validateClass } from './validation';

class ExceptionPackage {
  success: boolean;
  errorCode: string | object;
  message: string;
  timestamp: string;
  path: string;
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    const resJson = new ExceptionPackage();
    resJson.success = false;
    resJson.timestamp = format(getNow());
    resJson.path = request.url;

    // ValidationPipe에서 발생한 에러를 처리하기 위한 분기문
    if (exception instanceof BaseException) {
      resJson.errorCode = exception.getResponse();
      resJson.message = exception.message;
    } else if (validateClass(exception.getResponse(), PipeException)) {
      let message = (exception.getResponse() as PipeException).message.join(
        ', ',
      );
      resJson.errorCode = ExceptionCodeEnum.ValidationPipe;
      resJson.message = message;
    } else if (
      validateClass(exception.getResponse(), PassportValidationException)
    ) {
      resJson.errorCode = ExceptionCodeEnum.ValidationPipe;
      resJson.message = (
        exception.getResponse() as PassportValidationException
      ).message;
    } else {
      resJson.errorCode = ExceptionCodeEnum.UnCatched;
      resJson.message = exception.message;
    }

    return response.status(status).json(resJson);
  }
}
