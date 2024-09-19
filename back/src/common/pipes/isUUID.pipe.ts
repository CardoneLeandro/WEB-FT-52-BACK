import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate as isUUID } from 'uuid';
@Injectable()
export class IsUUIDPipe implements PipeTransform {
  transform(value: any) {
    if (!isUUID(value)) {
      console.log('CARDONE =========> isUUIDPipe value', value);
      throw new BadRequestException(`Invalid UUID: ${value}`);
    }
    return value;
  }
}
