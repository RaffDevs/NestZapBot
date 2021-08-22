import { EntityRepository, Repository } from "typeorm";
import { UraOptions } from "../entities/options-ura.entity";
import { IUraOptionsRepository } from "../interfaces/ura.repository.interface";

@EntityRepository(UraOptions)
export class UraOptionsRepository extends Repository<UraOptions>
implements IUraOptionsRepository {

  public async getUraOptions(uraId: number): Promise<UraOptions[]> {
    const options = await this.find({
      where: {
        ura_id: uraId
      }
    });

    return options;
  }
}