import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateurRepository {
  private power = 0;

  generatePower(): number {
    this.power = 100;
    console.log('Générateur génère de l’énergie:', this.power);
    return this.power;
  }

  getPower(): number {
    return this.power;
  }
}
