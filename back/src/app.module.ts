import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PostsModule } from './posts/posts.module';
import { EventsModule } from './events/events.module';
import { UserInformationModule } from './user-information/user-information.module';
import { ComentsModule } from './coments/coments.module';
import { OrdersModule } from './orders/orders.module';
import { OrderDetailsModule } from './order-details/order-details.module';
import { PaymentsModule } from './payments/payments.module';
import { PaymentCredentialsModule } from './payment-credentials/payment-credentials.module';
import { DonationsModule } from './donations/donations.module';
import { AuthModule } from './auth/auth.module';
import { InformationModule } from './information/information.module';

@Module({
  imports: [UsersModule, ProductsModule, PostsModule, EventsModule, UserInformationModule, ComentsModule, OrdersModule, OrderDetailsModule, PaymentsModule, PaymentCredentialsModule, DonationsModule, AuthModule, InformationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
