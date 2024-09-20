import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { DTOValidationPipe } from 'src/common/pipes/DTO-Validation.pipe';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class CreateUserMiddleware implements NestMiddleware {
  private readonly DTOvalidate = new DTOValidationPipe();

  async use(req: Request, _res: Response, next: NextFunction) {
    console.log('CARDONE =========>createUserMiddleware', req.body);
    const passwordMatch = req.body.password !== req.body.confirmPassword;
    console.log(
      'CARDONE =========> createUserMiddleware, passwordMatch',
      passwordMatch,
    );
    if (passwordMatch) {
      throw new BadRequestException('Passwords do not match');
    }

    try {
      console.log(
        'CARDONE =========> createUserMiddleware, try-catch, validate req.body with CreateUserDto',
      );
      await this.DTOvalidate.validate(req.body, CreateUserDto);
      console.log(
        'CARDONE =========> createUserMiddleware, try-catch, after validate',
      );
      next();
    } catch (error) {
      console.error(
        'CARDONE =========> createUserMiddleware, try-catch, error',
        error,
      );
      throw new BadRequestException('An error occurred during sign-up');
    }
  }
}
