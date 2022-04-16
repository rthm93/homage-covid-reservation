import { VaccinationCenter } from './vaccination-center';

export interface VaccinationSlot {
  slotId: number;
  vaccinationCenter: VaccinationCenter;
  start: Date;
  end: Date;
  slotsAvailable: number;
}
