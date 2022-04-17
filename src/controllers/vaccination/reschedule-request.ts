import { ApiProperty } from '@nestjs/swagger';
import { ReservationRequest } from './reservation-request';

export class RescheduleRequest extends ReservationRequest {
  @ApiProperty({
    description: 'Existing vaccination appointment id.',
  })
  appointmentId: string;
}
