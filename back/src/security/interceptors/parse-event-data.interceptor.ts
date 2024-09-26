import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// Reactive Extension for NestJS
//es utilizado por nestJs para manejar los datos asincronicos en las peticiones
@Injectable()
export class ParseEventDataInterceptor implements NestInterceptor {
  // se extrae el contexto de ejecucion de la solicitud HTTP
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // se extrae la peticion HTTP
    const request = context.switchToHttp().getRequest();
    // si la propiedad 'phone' existe se parcea a Number para que coincida con el DTO
    if (request.body && request.body.price) {
      // se modifica su valor
      request.body.price = Number(request.body.phone);
    }
    if (request.body && request.body.stock) {
      // se modifica su valor
      request.body.stock = Number(request.body.stock);
    }
    if (request.body && request.body.eventDate) {
      // se modifica su valor
      request.body.eventDate = new Date(request.body.eventDate);
    }
    // next.handle() indica que la solicitud HTTP continuará con su ejecución
    // pipe permite modificar la respuesta de la petición mediante operadores como map
    return next.handle().pipe(
      // map transforma la respuesta antes de devolverla
      map((data) => {
        // Se retorna la información modificada
        console.log(
          'CARDONE =========> parseEventDataInterceptor, data parseada',
          data,
        );
        return data;
      }),
    );
  }
}
