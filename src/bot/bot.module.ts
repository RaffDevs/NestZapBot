import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotService } from './bot.service';

@Module({
  providers: [BotService],
  controllers: [BotController]
})
export class BotModule {

}
