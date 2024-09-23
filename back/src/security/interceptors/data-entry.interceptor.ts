import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class DataEntryInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const {
      body,
      headers,
      params,
      query,
      user,
      ip,
      method,
      url,
      originalUrl,
      hostname,
      rawHeaders,
      rawRequest,
      rawResponse,
    } = request;

    console.log(
      'DATA ENTRY INTERCEPTOR',
      'body',
      body,
      'header',
      headers,
      'params',
      params,
      'query',
      query,
      'user',
      user,
      'ip',
      ip,
      'method',
      method,
      'url',
      url,
      'originalUrl',
      originalUrl,
      'hostname',
      hostname,
      'rawHeaders',
      rawHeaders,
      'rawRequest',
      rawRequest,
      'rawResponse',
      rawResponse,
    );
    return next.handle();
  }
}
