import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
import { BotController } from './controllers/bot.controller';
import { CreateSessionService } from './services/create-session.service';
import { MessageFactory } from './services/message-factory.service';
import { MessageHandlerService } from './services/message-handler.service';


@Module({
  imports: [MessagesModule],
  providers: [
    CreateSessionService, 
    MessageHandlerService,
    MessageFactory,
  ],
  controllers: [BotController]
})
export class BotModule {

}
