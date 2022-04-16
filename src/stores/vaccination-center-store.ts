import { Injectable, Scope } from '@nestjs/common';
import { VaccinationSlot } from 'src/models/vaccination-slot';

@Injectable({ scope: Scope.REQUEST })
export class VaccinationCenterStore {
  getVaccinationSlot(centerId: string, slotId: number): VaccinationSlot {
    return null; // TODO: connect to mysql to get slot info.
  }
}
