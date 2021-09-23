import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from 'src/messages/messages.module';
import { SchedulesModule } from 'src/schedules/schedules.module';
import { UraController } from './controllers/ura.controller';
import { UraOptionsRepository } from './repositories/ura-options.repository';
import { UraRepository } from './repositories/ura.repository';
import { UraFactory } from './services/ura-factory.service';
import { UraService } from './services/ura.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UraRepository,
      UraOptionsRepository
    ]),
    forwardRef(() => MessagesModule),
    SchedulesModule
  ],
  providers: [UraService, UraFactory],
  controllers: [UraController],
  exports: [UraFactory]
})
export class UraModule {}
