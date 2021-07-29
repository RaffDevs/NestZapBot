import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { BotModule } from './bot/bot.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UraModule } from './ura/ura.module';
import { SchedulesModule } from './schedules/schedules.module';

@Module({
  imports: [
    MessagesModule, 
    BotModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'raffdevs',
      password: 'yma2578k',
      database: 'zap_bot',
      autoLoadEntities: true,
      synchronize: true
    }),
    UraModule,
    SchedulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
