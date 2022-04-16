import { VaccinationSlot } from './vaccination-slot';

export interface VaccinationAppointment {
  slot: VaccinationSlot;
  icNumber: string;
  fullName: string;
}
