import { Controller, Get } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';

@Controller('vehicule')
export class VehiculeController {
  constructor(private readonly vehiculeService: VehiculeService) {}

  @Get('operate')
  operate() {
    return this.vehiculeService.operate();
  }

  @Get('status')
  status() {
    return this.vehiculeService.getStatus();
  }
}
