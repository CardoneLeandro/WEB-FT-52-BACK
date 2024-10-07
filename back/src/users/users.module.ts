import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserInformationService } from 'src/user-information/user-information.service';
import { UserInformationRepository } from 'src/user-information/user-information.repository';
import { MailerService } from 'src/mailer/mailer.service';
import { AuthService } from 'src/auth/auth.service';
import { JsonWebTokenService } from 'src/auth/jsonWebToken/jsonWebToken.service';
import { EventsRepository } from 'src/events/events.repository';
import { EventsService } from 'src/events/events.service';
import { JwtService } from '@nestjs/jwt';
import { EventAssistantsRepository } from 'src/events/event-assistants.repository';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [
    MailerService,
    UsersService,
    UsersRepository,
    UserInformationService,
    UserInformationRepository,
    AuthService,
    JsonWebTokenService,
    JwtService,
    EventsService,
    EventsRepository,
    EventAssistantsRepository,
    JsonWebTokenService,
    JwtStrategy,
  ],
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  exports: [UsersRepository, UsersService, AuthModule],
})
export class UsersModule {}
