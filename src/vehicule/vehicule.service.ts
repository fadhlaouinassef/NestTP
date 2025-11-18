import { Injectable } from '@nestjs/common';
import { VehiculeRepository } from './vehicule-repository';
import { MoteurService } from '../moteur/moteur.service';
import { GenerateurService } from '../generateur/generateur.service';
import { PhareService } from '../phare/phare.service';
import { AudioService } from '../audio/audio.service';

@Injectable()
export class VehiculeService {
  constructor(
    private readonly vehiculeRepository: VehiculeRepository,
    private readonly moteurService: MoteurService,
    private readonly generateurService: GenerateurService,
    private readonly phareService: PhareService,
    private readonly audioService: AudioService,
  ) {}

  operate(): object {
    console.log('Démarrage du véhicule...');
    
    this.moteurService.startEngine();
    const engineStatus = this.moteurService.getEngineStatus();
    
    this.generateurService.generate();
    const power = this.generateurService.getCurrentPower();
    
    this.phareService.turnOnLights();
    const lightsStatus = this.phareService.getLightsStatus();
    
    this.audioService.playMusic();
    const musicStatus = this.audioService.getMusicStatus();
    
    const operationStatus = this.vehiculeRepository.operate();
    
    return {
      operation: operationStatus,
      moteur: engineStatus,
      generateur: power,
      phares: lightsStatus ? 'allumés' : 'éteints',
      audio: musicStatus ? 'en cours de lecture' : 'arrêté',
    };
  }

  getStatus(): object {
    return {
      moteur: this.moteurService.getEngineStatus(),
      generateur: this.generateurService.getCurrentPower(),
      phares: this.phareService.getLightsStatus() ? 'allumés' : 'éteints',
      audio: this.audioService.getMusicStatus() ? 'en cours de lecture' : 'arrêté',
    };
  }
}
