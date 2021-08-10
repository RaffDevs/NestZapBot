import { Injectable } from '@nestjs/common';
import { Client, create, NotificationLanguage } from '@open-wa/wa-automate';
// import { MessageFactory } from 'src/messages/services/message-factory.service';
// import { MessageHandlerService } from './message-handler.service';


@Injectable()
export class CreateSessionService {
  public sessionWhats: Client;

  constructor( ) {}

  public async starSession(): Promise<Client | undefined> {
    const session = await create({
      headless: true,

      sessionId: 'bot-whats',
    
      authTimeout: 60,
    
      blockCrashLogs: true,
    
      disableSpins: true,
    
      hostNotificationLang: NotificationLanguage.PTBR,
    
      logConsole: false,

      logFile: true,
    
      qrTimeout: 0,
      
      cacheEnabled: false,

      executablePath: '/usr/bin/google-chrome',

      popup: 5001,

      sessionDataPath: './tokens',

    });

    return session;
  }
}


// Separar o messageHandler e MessageFactory do module do BOT