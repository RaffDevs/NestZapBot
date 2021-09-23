import { forwardRef, Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesRepository } from './repositories/messages.repository';
import { MessageFactory } from './services/message-factory.service';
import { BotModule } from 'src/bot/bot.module';
import { MessageDataSubscriber } from './subscriber/message.subscriber';
import { MessageDelivery } from './services/message-delivery.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessagesRepository]),
    forwardRef(() => BotModule)
  ],
  providers: [
    MessageFactory,
    MessageDelivery,
    MessageDataSubscriber
  ],
  controllers: [MessagesController],
  exports: [MessageFactory]
})

export class MessagesModule { }
