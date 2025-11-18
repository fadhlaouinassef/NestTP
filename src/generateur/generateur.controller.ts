import { Controller, Get } from '@nestjs/common';
import { GenerateurService } from './generateur.service';

@Controller('generateur')
export class GenerateurController {
  constructor(private readonly generateurService: GenerateurService) {}

  @Get('generate')
  generate() {
    const energy = this.generateurService.generate();
    return { energy };
  }

  @Get('power')
  power() {
    const p = this.generateurService.getCurrentPower();
    return { power: p };
  }
}
