import { StripeController } from './stripe.controller';
import { Module } from '@nestjs/common';


import { StripeService } from './stripe.service';
import { join } from 'path';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}
