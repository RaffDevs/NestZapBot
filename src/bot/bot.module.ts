import { Module } from '@nestjs/common';
import { BotController } from './controllers/bot.controller';
import { CreateSessionService } from './services/create-session.service';
import { MessageHandlerService } from './services/message-handler.service';


@Module({
  providers: [
    CreateSessionService, 
    MessageHandlerService
  ],
  controllers: [BotController]
})
export class BotModule {

}
