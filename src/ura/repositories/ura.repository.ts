import { EntityRepository, Repository } from "typeorm";
import { Ura } from "../entities/ura.entity";
import { IUraRepostory } from "../interfaces/ura.repository.interface";
import { uraLevel } from "../models/ura.model";

@EntityRepository(Ura)
export class UraRepository extends Repository<Ura>
implements IUraRepostory {

  public async getMainUra(): Promise<Ura> {
    const ura = await this.findOne({
      where: {
        level: uraLevel.MAIN
      }
    });

    return ura;
  }
}