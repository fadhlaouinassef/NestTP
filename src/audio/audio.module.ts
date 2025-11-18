import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { AudioRepository } from './audio-repository';
import { GenerateurModule } from '../generateur/generateur.module';

@Module({
  imports: [GenerateurModule],
  controllers: [AudioController],
  providers: [AudioService, AudioRepository],
  exports: [AudioService],
})
export class AudioModule {}
