import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize } from 'sequelize';
import {
  VaccinationAppointment,
  VaccinationAppointmentModel,
} from 'src/models/vaccination-appointment';
import {
  VaccinationCenter,
  VaccinationCenterModel,
} from 'src/models/vaccination-center';
import {
  VaccinationSlot,
  VaccinationSlotModel,
} from 'src/models/vaccination-slot';

/**
 * Vaccination appointments data access layer.
 */
@Injectable({ scope: Scope.REQUEST })
export class VaccinationAppointmentStore {
  constructor(
    @InjectModel(VaccinationCenterModel)
    private vaccinationCenters: typeof VaccinationCenterModel,
    @InjectModel(VaccinationSlotModel)
    private vaccinationSlots: typeof VaccinationSlotModel,
    @InjectModel(VaccinationAppointmentModel)
    private vaccinationAppointments: typeof VaccinationAppointmentModel,
    private sequelize: Sequelize,
  ) {}

  /**
   * Get all vaccination centers.
   * @returns All vaccination centers.
   */
  async getAllVaccinationCenters(): Promise<VaccinationCenter[]> {
    return await this.vaccinationCenters.findAll();
  }

  /**
   * Get vaccination slot.
   * @param centerId Vaccination center id.
   * @param time Appointment time.
   * @returns Vaccination slot or null if no available slot.
   */
  async getVaccinationSlot(
    centerId: string,
    time: Date,
  ): Promise<VaccinationSlot> {
    const slot = await this.vaccinationSlots.findOne({
      include: VaccinationCenterModel,
      where: {
        [Op.and]: {
          centerId: {
            [Op.eq]: centerId,
          },
          start: {
            [Op.lte]: time,
          },
          end: {
            [Op.gte]: time,
          },
        },
      },
    });

    return slot;
  }

  /**
   * Get all vaccination appointments.
   * @returns All Vaccination Appointments.
   */
  async getAllVaccinataionAppointments(): Promise<VaccinationAppointment[]> {
    return await this.vaccinationAppointments.findAll({
      include: {
        model: VaccinationSlotModel,
        include: [VaccinationCenterModel],
      },
    });
  }

  /**
   * Get vaccination appointment by IC.
   * @param icNumber IC Number.
   * @returns Vaccination Appointment or null if no appointment.
   */
  async getVaccinataionAppointmentByIc(
    icNumber: string,
  ): Promise<VaccinationAppointment> {
    return await this.vaccinationAppointments.findOne({
      include: {
        model: VaccinationSlotModel,
        include: [VaccinationCenterModel],
      },
      where: {
        icNumber,
      },
    });
  }

  /**
   * Get vaccination appointment by appointment id.
   * @param appointmentId Vaccination Appointment id.
   * @returns Vaccination Appointment or null if no appointment.
   */
  async getVaccinationAppointmentByAppointmentId(
    appointmentId: number,
  ): Promise<VaccinationAppointment> {
    return await this.vaccinationAppointments.findOne({
      include: {
        model: VaccinationSlotModel,
        include: [VaccinationCenterModel],
      },
      where: {
        appointmentId,
      },
    });
  }

  /**
   * Create new vaccination appointment.
   * @param icNumber IC Number.
   * @param slotId Vaccination slot id.
   * @param fullName Full name.
   * @returns Created Vaccination Appointment.
   */
  async createVaccinationAppointment(
    icNumber: string,
    slotId: string,
    fullName: string,
  ): Promise<VaccinationAppointment> {
    try {
      const record = await this.sequelize.transaction(async (t) => {
        const transactionHost = { transaction: t };
        const now = new Date();

        const appointment = await this.vaccinationAppointments.create(
          { firstName: 'Abraham', lastName: 'Lincoln' },
          transactionHost,
        );

        return appointment;
      });

      return record;
    } catch (error) {
      console.error(error); // TODO: logging
      return undefined;
    }
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
