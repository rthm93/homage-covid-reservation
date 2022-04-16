import { Injectable, Scope } from '@nestjs/common';
import { isBefore } from 'date-fns';
import {
  ErrorResult,
  Result,
  SuccessResult,
  UnknownErrorResult,
} from 'src/models/result';
import { VaccinationAppointment } from 'src/models/vaccination-appointment';
import { VaccinationCenterStore } from 'src/stores/vaccination-center-store';
import { VaccinationSlotCacheService } from './vaccination-slot-cache.service';

@Injectable({
  scope: Scope.REQUEST,
})
export class VaccinationAppointmentService {
  constructor(
    private cache: VaccinationSlotCacheService,
    private store: VaccinationCenterStore,
  ) {}

  async makeAppointment(
    centerId: string,
    time: Date,
    icNumber: string,
    fullName: string,
  ): Promise<Result<VaccinationAppointment>> {
    const slot = await this.store.getVaccinationSlot(centerId, time);

    if (!slot) {
      return new ErrorResult('invalid-time-slot');
    }

    const existingAppointment = await this.store.getVaccinationReservationByIc(
      icNumber,
    );

    if (!!existingAppointment) {
      return new ErrorResult('user-has-existing-booking');
    }

    const sequence = await this.cache.bookSlot(slot.slotId);

    if (sequence > slot.slotsAvailable) {
      return new ErrorResult('time-slot-fully-booked');
    }

    try {
      const appointment = await this.store.makeVaccinationAppointment(
        icNumber,
        slot.slotId,
        fullName,
      );

      return !!appointment
        ? new SuccessResult<VaccinationAppointment>(appointment)
        : new UnknownErrorResult<VaccinationAppointment>();
    } catch (error) {
      this.cache.releaseSlot(slot.slotId);

      // TODO: log error.

      return new UnknownErrorResult<VaccinationAppointment>();
    }
  }
}
