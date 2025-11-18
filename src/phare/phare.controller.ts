import { Controller, Get } from '@nestjs/common';
import { PhareService } from './phare.service';

@Controller('phare')
export class PhareController {
  constructor(private readonly phareService: PhareService) {}

  @Get('on')
  turnOn() {
    this.phareService.turnOnLights();
    return { status: 'allumés' };
  }

  @Get('off')
  turnOff() {
    this.phareService.turnOffLights();
    return { status: 'éteints' };
  }

  @Get('status')
  status() {
    const isOn = this.phareService.getLightsStatus();
    return { status: isOn ? 'allumés' : 'éteints' };
  }
}
