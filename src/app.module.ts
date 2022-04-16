import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { VaccinationSlotCacheService } from './services/vaccination-slot-cache.service';
import { VaccinationAppointmentStore } from './stores/vaccination-appointment.store';
import { VaccinationController } from './controllers/vaccination/vaccination.controller';
import { VaccinationAppointmentService } from './services/vaccination-appointment.service';
import { AppointmentsController } from './controllers/appointments/appointments.controller';

@Module({
  imports: [],
  controllers: [VaccinationController, AppointmentsController],
  providers: [
    AppService,
    VaccinationSlotCacheService,
    VaccinationAppointmentStore,
    VaccinationAppointmentService,
  ],
})
export class AppModule {}
