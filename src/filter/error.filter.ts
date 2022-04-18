import { isDevEnv } from '/@/app.environment';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { isString } from 'lodash';
import {
  ExceptionInfo,
  HttpResponseError,
  ResponseStatus,
} from '/@/interfaces/response.interface';
import { UNDEFINED } from '/@/constants/value.constant';

/**
 * @class HttpExceptionFilter
 * @classdesc 拦截全局抛出异常，规范化输出
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse();
    const exceptionStatus =
      exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: ExceptionInfo =
      exception.getResponse() as ExceptionInfo;
    const errorMessage = isString(errorResponse)
      ? errorResponse
      : errorResponse.message;
    const errorInfo = isString(errorResponse) ? null : errorMessage.error;

    const data: HttpResponseError = {
      status: ResponseStatus.Error,
      message: errorMessage,
      error:
        errorInfo?.message ||
        (isString(errorInfo) ? errorInfo : JSON.stringify(errorInfo)),
      debug: isDevEnv ? errorInfo?.stack || exception.stack : UNDEFINED,
    };

    // 处理 404 情况
    if (exceptionStatus === HttpStatus.NOT_FOUND) {
      data.error = data.error || 'Not found';
      data.message =
        data.message || `Invalid API: ${request.method} > ${request.url}`;
    }

    return response.status(errorInfo?.status || exceptionStatus).jsonp(data);
  }
}
