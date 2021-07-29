import { Module } from '@nestjs/common';
import { UraController } from './controllers/ura.controller';
import { UraService } from './services/ura.service';

@Module({
  controllers: [UraController],
  providers: [UraService]
})
export class UraModule {}
