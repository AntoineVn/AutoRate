import { Module } from '@nestjs/common';
import { AutovisualService } from './autovisual.service';
import { AutovisualController } from './autovisual.controller';

@Module({
  imports: [],
  providers: [AutovisualService],
  controllers: [AutovisualController],
  exports: [AutovisualService]
})
export class AutovisualModule {}
