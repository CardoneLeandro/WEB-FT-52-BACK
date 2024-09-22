import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from 'src/users/users.repository';
import { UsersService } from 'src/users/users.service';
import { UserInformationService } from 'src/user-information/user-information.service';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JsonWebTokenService } from './jsonWebToken/jsonWebToken.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import jwtConfig from 'config/jwt.config';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UserInformationService,
    UsersRepository,
    UserInformationRepository,
    JsonWebTokenService,
  ],
  imports: [
    ConfigModule.forRoot({
      load: [jwtConfig], // here we load the jwt config
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
