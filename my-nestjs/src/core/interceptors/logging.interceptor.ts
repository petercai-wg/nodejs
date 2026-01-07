import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    console.log(`LoggingInterceptor pre-controller ... `);
    return next
      .handle()
      .pipe(tap(() => console.log(`LoggingInterceptor after controller... ${Date.now() - now}ms`)));
  }
}
