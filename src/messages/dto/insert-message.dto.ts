import { MessageTypes } from '@open-wa/wa-automate';
import { IsBoolean, IsNotEmpty, IsString, IsEnum, IsPhoneNumber} from 'class-validator'
import { MessageContext } from 'src/messages/message.model';

export class InsertMessageDTO {
  @IsNotEmpty()
  @IsPhoneNumber()
  public contact: string;

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  public message: string;

  @IsNotEmpty()
  @IsString()
  public agent: string;

  @IsNotEmpty()
  @IsString()
  public departament_target: string;

  @IsEnum(MessageContext)
  public context?: MessageContext

  @IsBoolean()
  public isReceived?: boolean;

  @IsBoolean()
  public isNew?: boolean;

  @IsEnum(MessageTypes)
  public type?: MessageTypes;
}