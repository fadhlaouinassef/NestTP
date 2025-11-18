import { Injectable } from '@nestjs/common';

@Injectable()
export class MoteurRepository {
  private status = 'off';

  start(): void {
    this.status = 'running';
    console.log('Moteur démarré');
  }

  getStatus(): string {
    return this.status;
  }
}
