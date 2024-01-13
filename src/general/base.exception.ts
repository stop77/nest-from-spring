import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionCodeEnum } from './exception.enum';

export interface IBaseException {
  errorCode: string;
  timestamp: string;
  statusCode: number;
  path: string;
}

export class BaseException extends HttpException implements IBaseException {
  constructor(errorCode: string, statusCode: number, message?: string) {
    super(errorCode, statusCode);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.message = message;
  }

  errorCode: string;
  timestamp: string;
  statusCode: number;
  path: string;
}

export class UnCatchedException extends BaseException {
  constructor() {
    super(ExceptionCodeEnum.UnCatched, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class NotValidInputException extends BaseException {
  constructor(message?: string) {
    super(ExceptionCodeEnum.NotValidInput, HttpStatus.BAD_REQUEST, message);
  }
}

export class NotLoggedInException extends BaseException {
  constructor(message?: string) {
    super(ExceptionCodeEnum.NotLoggedIn, HttpStatus.UNAUTHORIZED, message);
  }
}

export class LoggedInException extends BaseException {
  constructor(message?: string) {
    super(ExceptionCodeEnum.LoggedIn, HttpStatus.BAD_REQUEST, message);
  }
}
