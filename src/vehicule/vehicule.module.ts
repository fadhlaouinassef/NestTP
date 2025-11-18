import { Module } from '@nestjs/common';
import { VehiculeController } from './vehicule.controller';
import { VehiculeService } from './vehicule.service';
import { VehiculeRepository } from './vehicule-repository';
import { MoteurModule } from '../moteur/moteur.module';
import { GenerateurModule } from '../generateur/generateur.module';
import { PhareModule } from '../phare/phare.module';
import { AudioModule } from '../audio/audio.module';

@Module({
  imports: [MoteurModule, GenerateurModule, PhareModule, AudioModule],
  controllers: [VehiculeController],
  providers: [VehiculeService, VehiculeRepository],
})
export class VehiculeModule {}
