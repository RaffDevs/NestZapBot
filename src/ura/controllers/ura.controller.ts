import { Controller, Post } from '@nestjs/common';
import { Ura } from '../entities/ura.entity';

@Controller('ura')
export class UraController {

  @Post('')
  async inserUra(): Promise<Ura> {
    return new Ura();
  }
}
