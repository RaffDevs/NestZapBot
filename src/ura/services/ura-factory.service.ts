import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  Client, Message } from "@open-wa/wa-automate";
import { MessageData } from "src/messages/entities/messages.entity";
import { Schedules } from "src/schedules/entities/schedules.entity";
import { SchedulesService } from "src/schedules/services/schedules-factory.service";
import { UraOptions } from "../entities/options-ura.entity";
import { Ura } from "../entities/ura.entity";
import { UraOptionsRepository } from "../repositories/ura-options.repository";
import { UraRepository } from "../repositories/ura.repository";
import { MessageContext } from "src/messages/message.model";
import { MessageFactory } from "src/messages/services/message-factory.service";
import { applications } from '../models/ura.model';
import path from 'path';


@Injectable()
export class UraFactory {
  private sessionWhats: Client;
  private messageWhats: Message;
  private messageData: MessageData;
  private mainSchedule: Schedules[];
  private mainUra: Ura;
  private optionsUra: UraOptions[];

  constructor(
    @InjectRepository(UraRepository)
    private uraRepository: UraRepository,

    @InjectRepository(UraOptionsRepository)
    private uraOptionsRepository: UraOptionsRepository,

    private messageFactory: MessageFactory,
    private scheduleService: SchedulesService
  ) {}

  public async buildUra(session: Client, messageWhats: Message, messageData: MessageData): Promise<void> {
    this.mainUra = await this.uraRepository.getMainUra();
    this.optionsUra = await this.uraOptionsRepository.getUraOptions(this.mainUra.id);
    this.mainSchedule = await this.scheduleService.getMainSchedules(this.mainUra.id_group_schedule);
    this.sessionWhats = session;
    this.messageWhats = messageWhats;
    this.messageData = messageData;
  }

  public async checkTime(): Promise<void> {
    if (this.mainSchedule.length < 1) {
      
      if (this.mainUra.out_hour_media) {
        await this.sessionWhats.sendImage(
          this.messageWhats.from,
          path.resolve(`media/auto/${this.mainUra.out_hour_media}`),
          'fora_horario',
          this.mainUra.out_hour_message
        )
        .then(success => {
          console.log('out_hour_media has been sended!');
        })
        .catch(error => {
          console.log('An error ocurred while sending out_hour_media!', error);
        });

      } else {
        await this.sessionWhats.sendText(
          this.messageWhats.from,
          this.mainUra.out_hour_message
        );
      }
    }
  };

  public async initUra(): Promise<void> {
    if (this.mainUra.greetings_media) {

      await this.sessionWhats.sendImage(
        this.messageWhats.from,
        path.resolve(`media/auto/${this.mainUra.greetings_media}`),
        'greetins',
        this.mainUra.greetings_message
      )
      .then(success => {
        console.log('[Log] greetin_media has been sended!');
      })
      .catch(error => {
        console.log('[Error] An error ocurred while sending out_hour_media!', error);
      });

    } else {
      await this.sessionWhats.sendText(
        this.messageWhats.from,
        this.mainUra.greetings_message
      );
    }

    if (this.optionsUra.length > 0) {
      await this.sessionWhats.sendText(
        this.messageWhats.from,
        this.mainUra.body_text
      );

      this.messageData.context = MessageContext.URA;
    }
  };

  public async matchUraOption(): Promise<void> {
    console.log('[Log] Validating ura option!');

    const matchDepartamentOption = this.optionsUra.find(
      option => option.digit === this.messageWhats.body.trim() &&
      option.application === applications.DEPARTAMENT
    );

    const matchSubMenuOption = this.optionsUra.find(
      option => option.digit === this.messageWhats.body.trim() &&
      option.application === applications.MENU
    );

    if (matchDepartamentOption) {
      this.messageData.departament_target = matchDepartamentOption.action;
      this.messageData.context = MessageContext.WAITING;

      await this.messageFactory.updateUraMessage(
        this.messageWhats.from, 
        this.messageData.departament_target
      );

      await this.sessionWhats.sendText(
        this.messageWhats.from,
        this.mainUra.after_option_message
      );

    } else if (matchSubMenuOption) {
      // Sub menu to implement
    } else {
      console.log('[ ] Invalid option');
      this.messageData.context = MessageContext.INVALID;

      await this.sessionWhats.sendText(
        this.messageWhats.from,
        this.mainUra.unmatch_option_message
      );
    }
  }
}