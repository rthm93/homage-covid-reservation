import { Injectable, Scope } from '@nestjs/common';
import {
  ErrorResult,
  Result,
  SuccessResult,
  UnknownErrorResult,
} from 'src/models/result';
import { VaccinationAppointment } from 'src/models/vaccination-appointment';
import { VaccinationAppointmentStore } from 'src/stores/vaccination-appointment.store';
import { VaccinationSlotCacheService } from './vaccination-slot-cache.service';

@Injectable({
  scope: Scope.REQUEST,
})
export class VaccinationAppointmentService {
  constructor(
    private cache: VaccinationSlotCacheService,
    private store: VaccinationAppointmentStore,
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

    const existingAppointment = await this.store.getVaccinataionAppointmentByIc(
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
      const appointment = await this.store.createVaccinationAppointment(
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

  async updateAppointment(
    appointmentId: number,
    centerId: string,
    newTime: Date,
    icNumber: string,
    fullName: string,
  ): Promise<Result<VaccinationAppointment>> {
    const existingAppointment =
      await this.store.getVaccinationAppointmentByAppointmentId(appointmentId);

    if (!existingAppointment) {
      return new ErrorResult('invalid-model');
    }

    const slot = await this.store.getVaccinationSlot(centerId, newTime);

    if (!slot) {
      return new ErrorResult('invalid-time-slot');
    }

    const sequence = await this.cache.bookSlot(slot.slotId);

    if (sequence > slot.slotsAvailable) {
      return new ErrorResult('time-slot-fully-booked');
    }

    try {
      const appointment = await this.store.updateVaccinationAppointment(
        existingAppointment.appointmentId,
        icNumber,
        slot.slotId,
        fullName,
      );

      // Release existing slot reservation.
      this.cache.releaseSlot(existingAppointment.slot.slotId);

      return !!appointment
        ? new SuccessResult<VaccinationAppointment>(appointment)
        : new UnknownErrorResult<VaccinationAppointment>();
    } catch (error) {
      this.cache.releaseSlot(slot.slotId);

      // TODO: log error.

      return new UnknownErrorResult<VaccinationAppointment>();
    }
  }

  async cancelAppointment(appointmentId: number): Promise<Result<void>> {
    const existingAppointment =
      await this.store.getVaccinationAppointmentByAppointmentId(appointmentId);

    if (!existingAppointment) {
      return new ErrorResult('invalid-model');
    }

    try {
      await this.store.deleteVaccinationAppointment(appointmentId);
      this.cache.releaseSlot(existingAppointment.slot.slotId);
    } catch (error) {
      // TODO: log error.

      return new UnknownErrorResult<void>();
    }

    return new SuccessResult(undefined);
  }
}
