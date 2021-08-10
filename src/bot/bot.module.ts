import { Module } from '@nestjs/common';

import { BotController } from './controllers/bot.controller';
import { CreateSessionService } from './services/create-session.service';
import { SessionStatus } from './services/session-status.service';
import { MessagesModule } from 'src/messages/messages.module';


@Module({
  imports: [
    MessagesModule
  ],
  providers: [
    CreateSessionService, 
    SessionStatus
  ],
  controllers: [BotController]
})
export class BotModule {

}
