import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './roles/roles.guard';
import { StripeModule } from './stripe/stripe.module';
import { UsersModule } from './users/users.module';
import { AutovisualModule } from './autovisual/autovisual.module';
import { AdvertModule } from './advert/advert.module';
import { MailsModule } from './mails/mails.module';

@Module({
  imports: 
    [
      MongooseModule.forRoot('mongodb+srv://admin:admin@autorate.ql0fd.mongodb.net/Autorate?retryWrites=true&w=majority'),
      AuthModule,
      UsersModule,
      StripeModule,
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      AutovisualModule,
      AdvertModule,
      MailsModule,
    ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
