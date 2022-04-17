import { ApiProperty } from '@nestjs/swagger';
import { VaccinationAppointment } from 'src/models/vaccination-appointment';
import { VaccinationSlotResponse } from './vaccination-slot-response';

export class VaccinationAppointmentResponse implements VaccinationAppointment {
  @ApiProperty({
    description: 'Details of vaccination slot.',
  })
  slot: VaccinationSlotResponse;

  @ApiProperty({
    description: 'IC Number.',
  })
  icNumber: string;

  @ApiProperty({
    description: 'Full name as per IC.',
  })
  fullName: string;

  @ApiProperty({
    description: 'Appointment id.',
  })
  appointmentId: string;
}
