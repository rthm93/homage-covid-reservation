import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Transaction } from 'sequelize';
import { format } from 'date-fns';
import { Sequelize } from 'sequelize-typescript';
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
            [Op.gt]: time,
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
    appointmentId: string,
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
    const record = await this.sequelize.transaction(async (transaction) => {
      return await this.createNewAppointment(icNumber, slotId, fullName, {
        transaction,
      });
    });

    return record;
  }

  /**
   * Update vaccination appointment.
   * @param appointmentId Existing appointment id.
   * @param icNumber IC Number.
   * @param slotId Vaccination slot id.
   * @param fullName Full name.
   * @returns Updated Vaccination Appointment.
   */
  async updateVaccinationAppointment(
    appointmentId: string,
    icNumber: string,
    slotId: string,
    fullName: string,
  ): Promise<VaccinationAppointment> {
    return await this.sequelize.transaction(async (transaction) => {
      const transactionHost = { transaction };
      const record = await this.createNewAppointment(
        icNumber,
        slotId,
        fullName,
        transactionHost,
      );
      await this.deleteAppointment(appointmentId, transactionHost);
      return record;
    });
  }

  /**
   * Delete vaccination appointment.
   * @param appointmentId Existing appointment id.
   * @returns Nothing
   */
  async deleteVaccinationAppointment(appointmentId: string): Promise<void> {
    await this.sequelize.transaction(async (transaction) =>
      this.deleteAppointment(appointmentId, { transaction }),
    );
  }

  /**
   * Actual logic to create new appointment.
   * @param icNumber IC Number.
   * @param slotId Vaccination slot id.
   * @param fullName Full name.
   * @param transactionHost Transaction host.
   * @returns Created Vaccination Appointment.
   */
  private async createNewAppointment(
    icNumber: string,
    slotId: string,
    fullName: string,
    transactionHost: { transaction: Transaction },
  ): Promise<VaccinationAppointment> {
    const slot = await this.vaccinationSlots.findOne({ where: { slotId } });
    const numberOfAppointments = await this.vaccinationAppointments.count({
      where: {
        slotId,
      },
    });

    if (!slot || numberOfAppointments >= slot.slotsAvailable) {
      throw new Error();
    }

    const appointmentId = this.getAppointmentId(slot.slotId);
    const appointment = await this.vaccinationAppointments.create(
      { slotid: slotId, icNumber, fullName, appointmentId },
      transactionHost,
    );

    return appointment;
  }

  /**
   * Actual logic to delete vaccination appointment.
   * @param appointmentId Existing appointment id.
   * @param transactionHost Transaction host.
   * @returns Nothing
   */
  private async deleteAppointment(
    appointmentId: string,
    transactionHost: { transaction: Transaction },
  ): Promise<void> {
    await this.vaccinationAppointments.destroy({
      ...transactionHost,
      where: {
        appointmentId,
      },
    });
  }

  /**
   * Generate appointment id.
   * @param slotId Slot id.
   * @returns Generate appointment id.
   */
  private getAppointmentId(slotId: string) {
    const now = new Date();
    const dateFormat = format(now, 'yyyyMMddHHmmssSSS');
    return `${slotId}-${dateFormat}`;
  }
}
