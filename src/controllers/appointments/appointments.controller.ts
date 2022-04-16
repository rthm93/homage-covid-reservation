import {
  BadRequestException,
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { VaccinationAppointmentStore } from 'src/stores/vaccination-appointment.store';

@Controller('appointments')
export class AppointmentsController {
  constructor(private store: VaccinationAppointmentStore) {}

  @Get()
  async getAllVaccinationAppointments() {
    return await this.store.getVaccinataionAppointments();
  }

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
