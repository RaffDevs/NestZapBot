import { Controller, Get } from '@nestjs/common';
import { Client } from '@open-wa/wa-automate';
import { MessageFactory } from 'src/messages/services/message-factory.service';
import { SessionOverview } from '../interfaces/session-overview.interface';
import { CreateSessionService } from '../services/create-session.service';
import { SessionStatus } from '../services/session-status.service';

@Controller('bot')
export class BotController{
  private sessionWhats: Client;

  constructor(
    private createSession: CreateSessionService,
    private messageFactory: MessageFactory,
    private sessionStatus: SessionStatus
  ) { }

  @Get('')
  async initBot(): Promise<string> {
    try {
      const session = await this.createSession.starSession();

      if (session) {
        session.onMessage(message => {
          this.messageFactory.buildMessage(session, message);
          this.sessionWhats = session;
        });
      }

      return JSON.stringify({
        status: 'success',
        message: 'OpenWA session has been created!'
      });

    } catch(error) {
      console.log('Erro to open OpenWA', error);
      
      return JSON.stringify({
        status:'error',
        message: 'Error to create session!'
      });
    }
  }

  @Get('/overview')
  async getOverview(): Promise<SessionOverview> {
    const overview = await this.sessionStatus.getOverview(this.sessionWhats);
    
    return overview;
  }
}
