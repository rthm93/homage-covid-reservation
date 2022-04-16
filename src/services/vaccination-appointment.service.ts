import { Injectable, Scope } from '@nestjs/common';
import { VaccinationCenterStore } from 'src/stores/vaccination-center-store';
import { VaccinationSlotCacheService } from './vaccination-slot-cache.service';

@Injectable({
  scope: Scope.REQUEST,
})
export class VaccinationAppointmentService {
  constructor(
    private cache: VaccinationSlotCacheService,
    private store: VaccinationCenterStore,
  ) {}
}
