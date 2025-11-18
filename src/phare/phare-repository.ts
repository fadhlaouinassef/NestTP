import { Injectable } from '@nestjs/common';

@Injectable()
export class PhareRepository {
  private isOn = false;

  turnOn(): void {
    this.isOn = true;
    console.log('Phares allumés');
  }

  turnOff(): void {
    this.isOn = false;
    console.log('Phares éteints');
  }

  getStatus(): boolean {
    return this.isOn;
  }
}
