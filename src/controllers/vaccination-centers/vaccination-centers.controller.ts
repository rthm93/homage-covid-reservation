import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VaccinationCenter } from 'src/models/vaccination-center';
import { VaccinationAppointmentStore } from 'src/stores/vaccination-appointment.store';
import { VaccinationCenterResponse } from './vaccination-center-response';

/**
 * Vaccination centers controller.
 */
@Controller('vaccination-centers')
export class VaccinationCentersController {
  constructor(private store: VaccinationAppointmentStore) {}

  /**
   * Get all vaccination centers.
   * @returns All vaccination centers.
   */
  @Get()
  @ApiOperation({ description: 'Get all vaccination centers.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: VaccinationCenterResponse,
  })
  async getAllVaccinationCenters(): Promise<VaccinationCenter[]> {
    return await this.store.getAllVaccinationCenters();
  }
}
