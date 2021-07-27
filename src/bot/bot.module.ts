import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesRepository } from 'src/messages/repositories/messages.repository';
import { BotController } from './controllers/bot.controller';
import { CreateSessionService } from './services/create-session.service';
import { MessageFactory } from './services/message-factory.service';
import { MessageHandlerService } from './services/message-handler.service';


@Module({
  imports: [TypeOrmModule.forFeature([MessagesRepository])],
  providers: [
    MessageFactory,
    MessageHandlerService,
    CreateSessionService, 
  ],
  controllers: [BotController]
})
export class BotModule {

}
