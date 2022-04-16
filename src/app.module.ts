import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { VaccinationSlotCacheService } from './services/vaccination-slot-cache.service';
import { VaccinationCenterStore } from './stores/vaccination-center-store';
import { VaccinationController } from './controllers/vaccination/vaccination.controller';
import { VaccinationAppointmentService } from './services/vaccination-appointment.service';

@Module({
  imports: [],
  controllers: [VaccinationController],
  providers: [
    AppService,
    VaccinationSlotCacheService,
    VaccinationCenterStore,
    VaccinationAppointmentService,
  ],
})
export class AppModule {}
