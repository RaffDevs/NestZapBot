import { Body, Controller, forwardRef, Inject, Post } from '@nestjs/common';
import { MessageTypes } from '@open-wa/wa-automate';
import { InsertMessageDTO } from 'src/messages/dto/insert-message.dto';
import { CreateSessionService } from 'src/bot/services/create-session.service';
import { MessageContext } from './message.model';
import { MessagesRepository } from './repositories/messages.repository';

@Controller('messages')
export class MessagesController {

  constructor(
    @Inject(forwardRef(() => CreateSessionService))
    private sessionWhats: CreateSessionService,
    
    private messageRepository: MessagesRepository
  ) {}

  @Post('')
  async sendMessage(@Body() message: InsertMessageDTO): Promise<string> {
    const session = this.sessionWhats.session;
    const checkNumber = await session.checkNumberStatus(`${Number(message.contact)}@c.us`);

    message.isNew = true;
    message.isReceived = false;
    message.type = MessageTypes.TEXT;
    message.context = MessageContext.FINISHED;

    if (checkNumber.canReceiveMessage && checkNumber.numberExists) {
      const messageData = this.messageRepository.create(message);
      await this.messageRepository.saveMessage(messageData);

      return JSON.stringify({
        message: 'Your message has been saved!'
      });
    }

    // Implementar logs de erro!
    
    return JSON.stringify({
      message: 'An error ocurred while saving the message. Check the server logs.'
    });

  }
}
