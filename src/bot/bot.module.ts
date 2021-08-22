import { Module } from '@nestjs/common';
import { BotController } from './controllers/bot.controller';
import { SessionStatus } from './services/session-status.service';
import { MessagesModule } from 'src/messages/messages.module';
import { CreateSessionService } from './services/create-session.service';
import { UraModule } from 'src/ura/ura.module';


@Module({
  imports: [
    MessagesModule,
    UraModule
  ],
  providers: [
    CreateSessionService,
    SessionStatus,
  ], 
  controllers: [BotController],
})
export class BotModule {
  
}
