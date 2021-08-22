import { ChatId } from "@open-wa/wa-automate";
import { MessageData } from "../entities/messages.entity";

export interface IMessageRepository {
  getLastMessage(contact: ChatId): Promise<MessageData>;
  saveMessage(messageData: MessageData): Promise<MessageData>;
  updateUraMessageToWaiting(contactID: ChatId, departament: string): Promise<void>;
}