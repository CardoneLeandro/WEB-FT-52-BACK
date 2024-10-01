import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class StringToNumberInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.body && request.body.phone) {
      request.body.phone = Number(request.body.phone);
    }
    if (request.body && request.body.price) {
      request.body.price = Number(request.body.price);
    }
    if (request.body && request.body.stock) {
      request.body.stock = Number(request.body.stock);
    }
    if (request.body && request.body.amount) {
      request.body.amount = Number(request.body.amount);
    }
    return next.handle().pipe();
  }
}
