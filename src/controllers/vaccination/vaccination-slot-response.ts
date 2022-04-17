import { ApiProperty } from '@nestjs/swagger';
import { VaccinationSlot } from 'src/models/vaccination-slot';
import { VaccinationCenterResponse } from '../vaccination-centers/vaccination-center-response';

export class VaccinationSlotResponse implements VaccinationSlot {
  @ApiProperty({
    description: 'Vaccination slot id.',
  })
  slotId: string;

  @ApiProperty({
    description: 'Details of vaccination center.',
  })
  vaccinationCenter: VaccinationCenterResponse;

  @ApiProperty({
    description: 'Start time of vaccination slot.',
  })
  start: Date;

  @ApiProperty({
    description: 'End time of vaccination slot.',
  })
  end: Date;

  @ApiProperty({
    description: 'Number of slots available for vaccination center.',
  })
  slotsAvailable: number;
}
