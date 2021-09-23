import { IsString } from 'class-validator';

export class InsertScheduleGroupDTO {
  @IsString()
  name: string;
}