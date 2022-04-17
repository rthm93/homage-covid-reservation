import { Controller, Get } from '@nestjs/common';
import { VaccinationCenter } from 'src/models/vaccination-center';
import { VaccinationAppointmentStore } from 'src/stores/vaccination-appointment.store';

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
  async getAllVaccinationCenters(): Promise<VaccinationCenter[]> {
    return await this.store.getAllVaccinationCenters();
  }
}
