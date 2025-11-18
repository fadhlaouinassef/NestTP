// src/moteur/moteur.controller.ts
import { Controller, Get } from '@nestjs/common';
import { MoteurService } from './moteur.service';

@Controller('moteur')
export class MoteurController {
  constructor(private readonly moteurService: MoteurService) {}

  @Get('start')
  start() {
    this.moteurService.startEngine();
    return { status: 'démarré' };
  }

  @Get('status')
  status() {
    const s = this.moteurService.getEngineStatus();
    return { status: s };
  }
}
