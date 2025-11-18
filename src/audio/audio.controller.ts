import { Controller, Get } from '@nestjs/common';
import { AudioService } from './audio.service';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get('play')
  play() {
    this.audioService.playMusic();
    return { status: 'en cours de lecture' };
  }

  @Get('stop')
  stop() {
    this.audioService.stopMusic();
    return { status: 'arrêté' };
  }

  @Get('status')
  status() {
    const isPlaying = this.audioService.getMusicStatus();
    return { status: isPlaying ? 'en cours de lecture' : 'arrêté' };
  }
}
