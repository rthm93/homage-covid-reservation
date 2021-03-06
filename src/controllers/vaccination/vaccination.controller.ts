import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { isDate, parseISO } from 'date-fns';
import { VaccinationAppointment } from 'src/models/vaccination-appointment';
import { VaccinationAppointmentService } from 'src/services/vaccination-appointment.service';
import { VaccinationAppointmentStore } from 'src/stores/vaccination-appointment.store';
import { RescheduleRequest } from './reschedule-request';
import { ReservationRequest } from './reservation-request';
import { VaccinationAppointmentResponse } from './vaccination-appointment-response';

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
  @ApiOperation({ description: 'Create new vaccination appointment.' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: VaccinationAppointmentResponse,
  })
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
  @ApiOperation({ description: 'Reschedule the vaccination appointment.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: VaccinationAppointmentResponse,
  })
  async rescheduleAppointment(
    @Body() request: RescheduleRequest,
  ): Promise<VaccinationAppointment> {
    const { icNumber, centerId, time, fullName, appointmentId } = request;
    const appointmentTime = !!time ? parseISO(time) : undefined;

    if (
      !icNumber ||
      !centerId ||
      !fullName ||
      !appointmentId ||
      !appointmentTime ||
      !isDate(appointmentTime)
    ) {
      throw new BadRequestException('invalid-model');
    }

    const result = await this.service.updateAppointment(
      appointmentId,
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
  @ApiOperation({ description: 'Cancels the vaccination appointment.' })
  async deleteAppointment(@Param() params): Promise<void> {
    const { id } = params;

    if (!id) {
      throw new BadRequestException('invalid-model');
    }

    const result = await this.service.cancelAppointment(id);

    if (!result || !result.isSuccess) {
      throw new BadRequestException(result?.errorCode);
    }
  }

  /**
   * Get all vaccination appointments.
   * @returns All vaccination appointments.
   */
  @Get()
  @ApiOperation({ description: 'Get all vaccination appointments.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: VaccinationAppointmentResponse,
  })
  async getAllVaccinationAppointments() {
    return await this.store.getAllVaccinataionAppointments();
  }

  /**
   * Get vaccination appointment.
   * @param params Appointment id.
   * @returns Vaccination appointment.
   */
  @Get(':id')
  @ApiOperation({ description: 'Get vaccination appointment by id.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: VaccinationAppointmentResponse,
  })
  async getAllVaccinationAppointmentById(@Param() params) {
    const { id } = params;

    if (!id) {
      throw new BadRequestException('invalid-model');
    }

    const appointment =
      await this.store.getVaccinationAppointmentByAppointmentId(id);

    if (appointment) {
      return appointment;
    } else {
      throw new NotFoundException();
    }
  }
}
