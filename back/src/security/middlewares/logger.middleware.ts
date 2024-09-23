import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NestMiddleware,
} from '@nestjs/common';
import { InterceptorsConsumer } from '@nestjs/core/interceptors';
import { Request, Response, NextFunction } from 'express';

let now = new Date().toLocaleString('es-AR', {
  timeZone: 'America/Argentina/Buenos_Aires',
});
let dataEntry = '';
@Injectable()
export class loggerMiddleware implements NestMiddleware {
  intercept(context: ExecutionContext, next: NextFunction) {
    const interceptRequest = context.switchToHttp().getRequest();
    dataEntry = JSON.stringify(interceptRequest.body);
    next();
  }

  use(req: Request, _res: Response, next: NextFunction) {
    console.log(
      `logger ==> ${req.method} on http://localhost:${process.env.APP_PORT}${req.url}`,
    );
    next();
  }
}

export function loggerGlobal(req: Request, _res: Response, next: NextFunction) {
  //console.log('====================>',dataEntry);
  console.log(
    `${req.method} on http://localhost:${process.env.APP_PORT}${req.url}`,
  );
  next();
}
