import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { UsersRepository } from 'src/users/users.repository';
  import { status } from 'src/common/enum/status.enum';
  import { JWTPayload } from 'src/auth/jsonWebToken/jsonWebToken.service';
  import { UserRole } from 'src/common/enum/userRole.enum';
  
  interface DecodedToken {
    id: string;
    creatorId: string;
    role: UserRole;
  }
  
  @Injectable()
  export class BannedUserGuard implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      private readonly userRepo: UsersRepository,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const authHeader = request.headers.authorization;
  
      if (!authHeader) {
        throw new ForbiddenException('No token provided');
      }
  
      const token = authHeader.split(' ')[1];
  
      let decodedToken: DecodedToken;
      try {
        decodedToken = this.jwtService.verify(token) as DecodedToken;
      } catch (err) {
        throw new ForbiddenException('Invalid or expired token');
      }
  
      const user = await this.userRepo.findOneBy({ id: decodedToken.id });
      console.log('CARDONE => BannedUserGuard, canActivate, user', user);
  
      if (user && user.status === status.BANNED) {
        throw new HttpException(
          {
            statusCode: 441,
            message: 'Your account is suspended',
          },
          HttpStatus.FORBIDDEN,
        );
      }
  
      return true;
    }
  }