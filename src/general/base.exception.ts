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

export class InSuficientInputException extends BaseException {
  constructor(message?: string) {
    super(ExceptionCodeEnum.InSufficientInput, HttpStatus.BAD_REQUEST, message);
  }
}

export class TangledDBException extends BaseException {
  constructor(message?: string) {
    super(
      ExceptionCodeEnum.TangledDB,
      HttpStatus.INTERNAL_SERVER_ERROR,
      message,
    );
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

export class PassportValidationException {
  constructor() {
    this.message = '';
    this.error = '';
    this.statusCode = 0;
  }
  message: string;
  error: string;
  statusCode: number;
}
export class PipeException {
  constructor() {
    this.message = [];
    this.error = '';
    this.statusCode = 0;
  }

  message: string[];
  error: string;
  statusCode: number;
}
