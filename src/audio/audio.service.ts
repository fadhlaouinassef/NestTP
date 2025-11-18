import { Injectable } from '@nestjs/common';
import { AudioRepository } from './audio-repository';
import { GenerateurService } from '../generateur/generateur.service';

@Injectable()
export class AudioService {
  constructor(
    private readonly audioRepository: AudioRepository,
    private readonly generateurService: GenerateurService,
  ) {}

  playMusic(): void {
    const power = this.generateurService.getCurrentPower();
    if (power > 0) {
      this.audioRepository.playMusic();
    } else {
      console.log('Pas assez d\'énergie pour jouer de la musique');
    }
  }

  stopMusic(): void {
    this.audioRepository.stopMusic();
  }

  getMusicStatus(): boolean {
    return this.audioRepository.getStatus();
  }
}
