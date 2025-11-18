import { Injectable } from '@nestjs/common';

@Injectable()
export class VehiculeRepository {
  operate(): string {
    console.log('Véhicule en opération');
    return 'Véhicule opérationnel';
  }
}
