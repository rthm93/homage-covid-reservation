import { ApiProperty } from "@nestjs/swagger";
import { VaccinationCenter } from "src/models/vaccination-center";

export class VaccinationCenterResponse implements VaccinationCenter {
    @ApiProperty({
      description: 'Vaccination center id.',
    })
    centerId: string;
    
    @ApiProperty({
        description: 'Location of vaccination center.',
      })
    location: string;
  }