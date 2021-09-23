import { EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm";
import { MessageData } from "../entities/messages.entity";
import { MessageDelivery } from "../services/message-delivery.service";
import { MessageFactory } from "../services/message-factory.service";

@EventSubscriber()
export class MessageDataSubscriber implements EntitySubscriberInterface<MessageData> {

  constructor(
    private messageDelivery: MessageDelivery,
  ) {}

  listenTo() {
    return MessageData;
  }

  async afterInsert(event: InsertEvent<MessageData>) {
    const data = event.entity;

    if (!data.isReceived) {
      await this.messageDelivery.resolveDeliveryMessage(data);
    } else {
      return;
    }
  }
}