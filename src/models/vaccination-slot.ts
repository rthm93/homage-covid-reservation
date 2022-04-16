export interface VaccinationSlot {
  slotId: number;
  vaccinationCenter: VaccinationCenter;
  start: Date;
  end: Date;
  slotsAvailable: number;
}

export interface VaccinationCenter {
  centerId: string;
  location: string;
}
