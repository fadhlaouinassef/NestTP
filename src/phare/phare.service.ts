import { Injectable } from '@nestjs/common';
import { PhareRepository } from './phare-repository';
import { GenerateurService } from '../generateur/generateur.service';

@Injectable()
export class PhareService {
  constructor(
    private readonly phareRepository: PhareRepository,
    private readonly generateurService: GenerateurService,
  ) {}

  turnOnLights(): void {
    const power = this.generateurService.getCurrentPower();
    if (power > 0) {
      this.phareRepository.turnOn();
    } else {
      console.log('Pas assez d\'énergie pour allumer les phares');
    }
  }

  turnOffLights(): void {
    this.phareRepository.turnOff();
  }

  getLightsStatus(): boolean {
    return this.phareRepository.getStatus();
  }
}
