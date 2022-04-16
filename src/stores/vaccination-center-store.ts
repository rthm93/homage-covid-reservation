import { Injectable, Scope } from '@nestjs/common';
import { VaccinationAppointment } from 'src/models/vaccination-appointment';
import { VaccinationSlot } from 'src/models/vaccination-slot';

@Injectable({ scope: Scope.REQUEST })
export class VaccinationCenterStore {
  getVaccinationSlot(centerId: string, time: Date): Promise<VaccinationSlot> {
    return Promise.resolve({
      slotId: 1,
      start: new Date(2022, 4, 16),
      end: new Date(2022, 4, 17),
      slotsAvailable: 10,
      vaccinationCenter: {
        centerId: 'BUKIT-TIMAH-CC',
        location: 'Bukit Timah CC',
      },
    }); // TODO: connect to mysql to get slot info.
  }

  getVaccinationReservationByIc(
    icNumber: string,
  ): Promise<VaccinationAppointment> {
    return Promise.resolve(null); // TODO: connect to mysql to get appointment.
  }

  makeVaccinationAppointment(
    icNumber: string,
    slotId: number,
    fullName: string,
  ): Promise<VaccinationAppointment> {
    return Promise.resolve({
      slot: {
        slotId: slotId,
        start: new Date(2022, 4, 16),
        end: new Date(2022, 4, 17),
        slotsAvailable: 10,
        vaccinationCenter: {
          centerId: 'BUKIT-TIMAH-CC',
          location: 'Bukit Timah CC',
        },
      },
      icNumber,
      fullName,
    }); // TODO: connect to mysql to get appointment.
  }
}
