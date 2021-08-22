import { UraOptions } from "../entities/options-ura.entity";
import { Ura } from "../entities/ura.entity";

export interface IUraRepostory {
 getMainUra(): Promise<Ura>; 
}

export interface IUraOptionsRepository {
  getUraOptions(uraId: number): Promise<UraOptions[]>;
}