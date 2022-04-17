import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppService } from './app.service';
import { VaccinationSlotCacheService } from './services/vaccination-slot-cache.service';
import { VaccinationAppointmentStore } from './stores/vaccination-appointment.store';
import { VaccinationController } from './controllers/vaccination/vaccination.controller';
import { VaccinationAppointmentService } from './services/vaccination-appointment.service';
import { Options } from 'sequelize';
import { VaccinationCenterModel } from './models/vaccination-center';
import { VaccinationCentersController } from './controllers/vaccination-centers/vaccination-centers.controller';
import * as config from './dbconfig.json';
import { VaccinationSlotModel } from './models/vaccination-slot';
import { VaccinationAppointmentModel } from './models/vaccination-appointment';

const SEQUELIZE_MODELS = [
  VaccinationCenterModel,
  VaccinationSlotModel,
  VaccinationAppointmentModel,
];

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...(config as Options),
      models: [...SEQUELIZE_MODELS],
    }),
    SequelizeModule.forFeature([...SEQUELIZE_MODELS]),
  ],
  controllers: [VaccinationController, VaccinationCentersController],
  providers: [
    AppService,
    VaccinationSlotCacheService,
    VaccinationAppointmentStore,
    VaccinationAppointmentService,
  ],
})
export class AppModule {}
