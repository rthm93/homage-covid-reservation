import { VaccinationCenter } from './vaccination-center';

export interface VaccinationSlot {
  slotId: string;
  vaccinationCenter: VaccinationCenter;
  start: Date;
  end: Date;
  slotsAvailable: number;
}
