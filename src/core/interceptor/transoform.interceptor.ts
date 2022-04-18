import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ResultEnum } from '/@/constants/system.constant';

@Injectable()
export class TransoformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          result: data,
          code: ResultEnum.SUCCESS,
          msg: '请求成功',
        };
      }),
    );
  }
}
