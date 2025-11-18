import { Injectable } from '@nestjs/common';
import { GenerateurRepository } from './generateur-repository';

@Injectable()
export class GenerateurService {
  constructor(private readonly generateurRepository: GenerateurRepository) {}

  generate(): number {
    return this.generateurRepository.generatePower();
  }

  getCurrentPower(): number {
    return this.generateurRepository.getPower();
  }
}
