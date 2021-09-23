import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsNumberString, IsString, ValidateNested } from 'class-validator';

export class InsertScheduleDTO {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => String)
  day_week: string[];

  @IsNotEmpty()
  @IsString()
  time_start: string;
  
  @IsNotEmpty()
  @IsString()
  time_end: string;

  @IsNotEmpty()
  @IsNumber()
  group_schedule: number;
}