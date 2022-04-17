import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { VaccinationAppointment } from 'src/models/vaccination-appointment';
import {
  VaccinationCenter,
  VaccinationCenterModel,
} from 'src/models/vaccination-center';
import { VaccinationSlot } from 'src/models/vaccination-slot';

/**
 * Vaccination appointments data access layer.
 */
@Injectable({ scope: Scope.REQUEST })
export class VaccinationAppointmentStore {
  constructor(
    @InjectModel(VaccinationCenterModel)
    private vaccinationCenters: typeof VaccinationCenterModel,
  ) {}

  async getAllVaccinationCenters(): Promise<VaccinationCenter[]> {
    return await this.vaccinationCenters.findAll();
  }

  /**
   * Get vaccination slot.
   * @param centerId Vaccination center id.
   * @param time Appointment time.
   * @returns Vaccination slot or null if no available slot.
   */
  getVaccinationSlot(centerId: string, time: Date): Promise<VaccinationSlot> {
    return Promise.resolve({
      slotId: '1',
      start: new Date(2022, 4, 16),
      end: new Date(2022, 4, 17),
      slotsAvailable: 10,
      vaccinationCenter: {
        centerId: 'BUKIT-TIMAH-CC',
        location: 'Bukit Timah CC',
      },
    }); // TODO: connect to mysql to get slot info.
  }

  /**
   * Get all vaccination appointments.
   * @returns All Vaccination Appointments.
   */
  async getVaccinataionAppointments(): Promise<VaccinationAppointment[]> {
    return Promise.resolve([]); // TODO: connect to mysql to get appointment.
  }

  /**
   * Get vaccination appointment by IC.
   * @param icNumber IC Number.
   * @returns Vaccination Appointment or null if no appointment.
   */
  getVaccinataionAppointmentByIc(
    icNumber: string,
  ): Promise<VaccinationAppointment> {
    return Promise.resolve(null); // TODO: connect to mysql to get appointment.
  }

  /**
   * Get vaccination appointment by appointment id.
   * @param appointmentId Vaccination Appointment id.
   * @returns Vaccination Appointment or null if no appointment.
   */
  getVaccinationAppointmentByAppointmentId(
    appointmentId: number,
  ): Promise<VaccinationAppointment> {
    return Promise.resolve({
      slot: {
        slotId: '1',
        start: new Date(2022, 4, 16),
        end: new Date(2022, 4, 17),
        slotsAvailable: 10,
        vaccinationCenter: {
          centerId: 'BUKIT-TIMAH-CC',
          location: 'Bukit Timah CC',
        },
      },
      icNumber: '123456789',
      fullName: 'Wong Ah Miao',
      appointmentId: 1234525,
    }); // TODO: connect to mysql to get appointment.
  }

  /**
   * Create new vaccination appointment.
   * @param icNumber IC Number.
   * @param slotId Vaccination slot id.
   * @param fullName Full name.
   * @returns Created Vaccination Appointment.
   */
  createVaccinationAppointment(
    icNumber: string,
    slotId: string,
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
      appointmentId: 1234525,
    }); // TODO: connect to mysql to get appointment.
  }

  /**
   * Update vaccination appointment.
   * @param appointmentId Existing appointment id.
   * @param icNumber IC Number.
   * @param slotId Vaccination slot id.
   * @param fullName Full name.
   * @returns Updated Vaccination Appointment.
   */
  updateVaccinationAppointment(
    appointmentId: number,
    icNumber: string,
    slotId: string,
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
      appointmentId: 2315497,
    }); // TODO: connect to mysql to get appointment.
  }

  /**
   * Delete vaccination appointment.
   * @param appointmentId Existing appointment id.
   * @returns Nothing
   */
  deleteVaccinationAppointment(appointmentId: number): Promise<void> {
    return Promise.resolve();
  }
}
