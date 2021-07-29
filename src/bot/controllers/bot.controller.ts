import { Controller, Get } from '@nestjs/common';
import { SessionOverview } from '../interfaces/session-overview.interface';
import { CreateSessionService } from '../services/create-session.service';
import { SessionStatus } from '../services/session-status.service';

@Controller('bot')
export class BotController{
  
  constructor(
    private createSession: CreateSessionService,
    private sessionStatus: SessionStatus
  ) { }

  @Get('')
  async initBot(): Promise<string> {
    return this.createSession.exec().then(success => {
      console.log('OpenWA has been initialized!');

      return JSON.stringify({
        status: "success",
        message: "OpenWA has been initialized"
      });

    }).catch(error => {
      console.log('Failed to initialized OpenWA', error);

      return JSON.stringify({
        status: "error",
        message: "Failed to initialized OpenWA"
      });

    });
  }

  @Get('/overview')
  async getOverview(): Promise<SessionOverview> {
    const overview = await this.sessionStatus.getOverview();
    
    return overview;
  }
}
