import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

let now = new Date().toLocaleString('es-AR', {
  timeZone: 'America/Argentina/Buenos_Aires',
});
@Injectable()
export class loggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    console.log(`at ${now} ${req.method} was executed on ${req.url}`);
    next();
  }
}

export function loggerGlobal(req: Request, _res: Response, next: NextFunction) {
  console.log(`at ${now} ${req.method} was executed on ${req.url}`);
  next();
}
