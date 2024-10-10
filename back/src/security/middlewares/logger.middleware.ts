import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JsonWebTokenService } from 'src/auth/jsonWebToken/jsonWebToken.service';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class UserBannedRestriction implements NestMiddleware {
  constructor(
    private readonly userRepo: UsersRepository,
    private readonly jwtService: JsonWebTokenService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];
    
    try {
      const decodedToken = await this.jwtService.verifyJwt(token);

      const user = await this.userRepo.findOneBy({ id: decodedToken.id });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (user.status === 'banned') {
        return res.status(441).json({ message: 'Your account has been banned' });
      }

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}