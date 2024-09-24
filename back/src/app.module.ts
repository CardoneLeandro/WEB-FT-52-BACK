import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PostsModule } from './posts/posts.module';
import { EventsModule } from './events/events.module';
import { UserInformationModule } from './user-information/user-information.module';
import { CommentsModule } from './comments/comments.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentCredentialsModule } from './payment-credentials/payment-credentials.module';
import { DonationsModule } from './donations/donations.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeormConfig from 'config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederModule } from './seeder/seeder.module';
import { DataEntryInterceptor } from './security/interceptors/data-entry.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UsersModule,
    ProductsModule,
    PostsModule,
    EventsModule,
    UserInformationModule,
    CommentsModule,
    OrdersModule,
    OrderDetailsModule,
    PaymentsModule,
    PaymentCredentialsModule,
    DonationsModule,
    AuthModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/*
customs providers

{
    provide: APP_INTERCEPTOR,
    useClass: DataEntryInterceptor,
  }
{
    provide: APP_INTERCEPTOR,
    useClass: DataExitInterceptor,
  }

*/
