import { Controller, Get } from '@nestjs/common';
import { MessageFactory } from 'src/messages/services/message-factory.service';
import { UraFactory } from 'src/ura/services/ura-factory.service';
import { SessionOverview } from '../interfaces/session-overview.interface';
import { CreateSessionService } from '../services/create-session.service';
import { SessionStatus } from '../services/session-status.service';

@Controller('bot')
export class BotController{

  constructor(
    private createSession: CreateSessionService,
    private messageFactory: MessageFactory,
    private sessionStatus: SessionStatus,
  ) { }

  @Get('')
  async initBot(): Promise<string> {
    await this.createSession.startSession();

    return JSON.stringify({
      message: 'Bot has been called!'
    });
  }

  @Get('/overview')
  async getOverview(): Promise<SessionOverview> {
    const overview = await this.sessionStatus.getOverview(this.createSession.session);
    
    return overview;
  }
}
