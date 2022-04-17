import { ApiProperty } from '@nestjs/swagger';

export class ReservationRequest {
  @ApiProperty({
    description: 'Id of vaccination center.',
  })
  centerId: string;

  @ApiProperty({
    description: 'Time of vaccination appointment.',
  })
  time: string;

  @ApiProperty({
    description: 'IC Number.',
  })
  icNumber: string;

  @ApiProperty({
    description: 'Full name as per IC.',
  })
  fullName: string;
}
