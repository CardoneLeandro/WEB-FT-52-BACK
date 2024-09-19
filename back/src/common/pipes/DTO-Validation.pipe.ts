import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class DTOValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    return this.validate(value, metatype);
  }

  async validate(value: any, metatype: any) {
    console.log(
      'CARDONE =========> dtoValidationpipe, validate, Param(value)',
      value,
    );
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    if (value.confirmPassword && value.password) {
      if (value.confirmPassword !== value.password) {
        throw new BadRequestException('Passwords do not match');
      }
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const errorMessages = errors
        .map((err) => {
          return {
            property: err.property,
            errors: Object.values(err.constraints),
          };
        })
        .map(
          ({ property, errors }) =>
            `Property ${property}: ${errors.join(', ')}`,
        )
        .join('; ');

      throw new BadRequestException(`Validation failed: ${errorMessages}`);
    }

    console.log(
      'CARDONE =========> dtoValidationpipe, validate value SUCCESS',
      value,
    );
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
