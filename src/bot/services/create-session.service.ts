import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Client, create, NotificationLanguage } from '@open-wa/wa-automate';
import { MessageContext } from 'src/messages/message.model';
import { MessageFactory } from 'src/messages/services/message-factory.service';
import { UraFactory } from 'src/ura/services/ura-factory.service';

@Injectable()
export class CreateSessionService {
  private sessionWhats: Client;

  constructor(
    @Inject(forwardRef(() => MessageFactory))
    private messageFactory: MessageFactory,

    private uraFactory: UraFactory
  ) { }

  public get session() {
    return this.sessionWhats;
  }

  public set setSession(session: Client) {
    this.sessionWhats = session;
  }

  public async startSession(): Promise<void> {

    await create({
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

    }).then(async session => {
      this.sessionWhats = session;

      session.onMessage(async message => {
        if (!message.isGroupMsg) {
          try {
            const msg = await this.messageFactory.buildMessage(session, message);

            await this.uraFactory.buildUra(
              session,
              message,
              msg
            );

            if (msg.context === MessageContext.NEW) {
              await this.uraFactory.checkTime();
              await this.uraFactory.initUra();

            } else if (msg.context === MessageContext.URA_ANSWER) {
              await this.uraFactory.matchUraOption();

            } else if (msg.context === MessageContext.RATING) {
              // Implementar avaliação
            }

            await this.messageFactory.saveMessage(msg);

          } catch (error) {
            console.log('[Error] An error ocorred while in processing message', error);
          }
        }

      });
    });
  };
}
