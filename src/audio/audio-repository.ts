import { Injectable } from '@nestjs/common';

@Injectable()
export class AudioRepository {
  private isPlaying = false;

  playMusic(): void {
    this.isPlaying = true;
    console.log('Musique en cours de lecture');
  }

  stopMusic(): void {
    this.isPlaying = false;
    console.log('Musique arrêtée');
  }

  getStatus(): boolean {
    return this.isPlaying;
  }
}
