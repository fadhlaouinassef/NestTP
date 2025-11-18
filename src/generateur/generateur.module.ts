import { Module } from '@nestjs/common';
import { GenerateurService } from './generateur.service';
import { GenerateurController } from './generateur.controller';
import { GenerateurRepository } from './generateur-repository';

@Module({
  providers: [GenerateurService, GenerateurRepository],
  controllers: [GenerateurController],
  exports: [GenerateurService],
})
export class GenerateurModule {}
