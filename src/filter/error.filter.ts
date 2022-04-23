import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import logger from '../utils/logger';

/**
 * @class HttpExceptionFilter
 * @classdesc 拦截全局抛出异常，规范化输出
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    // ! TODO exception.getStatus() is not a function
    const exceptionStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    // 设置错误信息
    const message = exception.message
      ? exception.message
      : `${
          exceptionStatus >= HttpStatus.INTERNAL_SERVER_ERROR
            ? 'Service Error'
            : 'Client Error'
        }`;
    const errrorResponse = {
      data: {},
      message,
      code: -1,
    };
    logger.error(errrorResponse.message);

    // 设置返回状态码，请求头，发送错误信息
    response.status(exceptionStatus);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errrorResponse);
  }
}
