import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdvertController } from './advert.controller';
import { AdvertSchema } from './advert.model';
import { AdvertService } from './advert.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Advert', schema: AdvertSchema }]),
    ],
    controllers: [AdvertController],
    providers: [AdvertService]
})
export class AdvertModule {}
