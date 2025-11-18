// src/moteur/moteur.service.ts
import { Injectable } from '@nestjs/common';
import { MoteurRepository } from './moteur-repository';

@Injectable()
export class MoteurService {
  constructor(private readonly moteurRepository: MoteurRepository) {}

  startEngine(): void {
    this.moteurRepository.start();
  }

  getEngineStatus(): string {
    return this.moteurRepository.getStatus();
  }
}
