import { Body, Controller, Post } from '@nestjs/common';
import { isDate, parseISO } from 'date-fns';
import { ErrorResult, Result } from 'src/models/result';
import { VaccinationAppointment } from 'src/models/vaccination-appointment';
import { VaccinationAppointmentService } from 'src/services/vaccination-appointment.service';
import { ReservationRequest } from './reservation-request';

@Controller('vaccination')
export class VaccinationController {
  constructor(private service: VaccinationAppointmentService) {}

  @Post()
  async makeAppointment(
    @Body() request: ReservationRequest,
  ): Promise<Result<VaccinationAppointment>> {
    const { icNumber, centerId, time, fullName } = request;
    const appointmentTime = !!time ? parseISO(time) : undefined;

    if (
      !icNumber ||
      !centerId ||
      !fullName ||
      !appointmentTime ||
      !isDate(appointmentTime)
    ) {
      return new ErrorResult('invalid-model');
    }

    return await this.service.makeAppointment(
      centerId,
      appointmentTime,
      icNumber,
      fullName,
    );
  }
}
