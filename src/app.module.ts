import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { BotModule } from './bot/bot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UraModule } from './ura/ura.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ScheduleGroup } from './schedules/entities/schedule-group.entity';
import { Schedules } from './schedules/entities/schedules.entity';
import { Ura } from './ura/entities/ura.entity';
import { UraOptions } from './ura/entities/options-ura.entity';
import { MessageDataSubscriber } from './messages/subscriber/message.subscriber';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'raffdevs',
      password: 'yma2578k',
      database: 'zap_bot',
      synchronize: true,
      autoLoadEntities: true,
      subscribers: [
        MessageDataSubscriber
      ],
      entities: [
        Schedules,
        ScheduleGroup,
        Ura,
        UraOptions
      ]
    }),
    MessagesModule,
    SchedulesModule,
    BotModule,
    UraModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
