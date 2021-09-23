import { uraLevel } from "../models/ura.model";

export interface InsertUraDTO {
  name: string;
  greetings_message: string;
  out_hour_message: string;
  after_option_message: string;
  body_text: string;
  level: uraLevel;
  id_group_schedule: number;
}