import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { isDate, parseISO } from 'date-fns';
import { VaccinationAppointment } from 'src/models/vaccination-appointment';
import { VaccinationAppointmentService } from 'src/services/vaccination-appointment.service';
import { VaccinationAppointmentStore } from 'src/stores/vaccination-appointment.store';
import { RescheduleRequest } from './reschedule-request';
import { ReservationRequest } from './reservation-request';

/**
 * Vaccination controller.
 */
@Controller('vaccinations')
export class VaccinationController {
  constructor(
    private service: VaccinationAppointmentService,
    private store: VaccinationAppointmentStore,
  ) {}

  /**
   * Make vaccination appointment.
   * @param request Request.
   * @returns Created vaccination appointment.
   */
  @Post()
  async makeAppointment(
    @Body() request: ReservationRequest,
  ): Promise<VaccinationAppointment> {
    const { icNumber, centerId, time, fullName } = request;
    const appointmentTime = !!time ? parseISO(time) : undefined;

    if (
      !icNumber ||
      !centerId ||
      !fullName ||
      !appointmentTime ||
      !isDate(appointmentTime)
    ) {
      throw new BadRequestException('invalid-model');
    }

    const result = await this.service.makeAppointment(
      centerId,
      appointmentTime,
      icNumber,
      fullName,
    );

    if (result && result.isSuccess) {
      return result.value;
    } else {
      throw new BadRequestException(result?.errorCode);
    }
  }

  /**
   * Reschedule vaccination appointment.
   * @param request Request.
   * @returns Updated vaccination appointment.
   */
  @Put()
  async rescheduleAppointment(
    @Body() request: RescheduleRequest,
  ): Promise<VaccinationAppointment> {
    const { icNumber, centerId, time, fullName, appointmentId } = request;
    const appointmentTime = !!time ? parseISO(time) : undefined;
    const parsedAppointmentId = parseInt(appointmentId || '', 10);

    if (
      !icNumber ||
      !centerId ||
      !fullName ||
      !parsedAppointmentId ||
      isNaN(parsedAppointmentId) ||
      !appointmentTime ||
      !isDate(appointmentTime)
    ) {
      throw new BadRequestException('invalid-model');
    }

    const result = await this.service.updateAppointment(
      parsedAppointmentId,
      centerId,
      appointmentTime,
      icNumber,
      fullName,
    );

    if (result && result.isSuccess) {
      return result.value;
    } else {
      throw new BadRequestException(result?.errorCode);
    }
  }

  /**
   * Cancels existing appointment.
   * @param params Appointment id.
   */
  @Delete(':id')
  async deleteAppointment(@Param() params): Promise<void> {
    const { id } = params;
    const appointmentId = parseInt(id || '', 10);

    if (!appointmentId || isNaN(appointmentId)) {
      throw new BadRequestException('invalid-model');
    }

    const result = await this.service.cancelAppointment(appointmentId);

    if (!result || !result.isSuccess) {
      throw new BadRequestException(result?.errorCode);
    }
  }

  /**
   * Get all vaccination appointments.
   * @returns All vaccination appointments.
   */
  @Get()
  async getAllVaccinationAppointments() {
    return await this.store.getAllVaccinataionAppointments();
  }

  /**
   * Get vaccination appointment.
   * @param params Appointment id.
   * @returns Vaccination appointment.
   */
  @Get(':id')
  async getAllVaccinationAppointmentById(@Param() params) {
    const { id } = params;
    const appointmentId = parseInt(id || '', 10);

    if (!appointmentId || isNaN(appointmentId)) {
      throw new BadRequestException('invalid-model');
    }

    const appointment =
      await this.store.getVaccinationAppointmentByAppointmentId(appointmentId);

    if (appointment) {
      return appointment;
    } else {
      throw new NotFoundException();
    }
  }
}
