import { Module } from '@nestjs/common';
import { PhareController } from './phare.controller';
import { PhareService } from './phare.service';
import { PhareRepository } from './phare-repository';
import { GenerateurModule } from '../generateur/generateur.module';

@Module({
  imports: [GenerateurModule],
  controllers: [PhareController],
  providers: [PhareService, PhareRepository],
  exports: [PhareService],
})
export class PhareModule {}
