import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VaccinationSlotCacheService } from './services/vaccination-slot-cache.service';
import { VaccinationCenterStore } from './stores/vaccination-center-store';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, VaccinationSlotCacheService, VaccinationCenterStore],
})
export class AppModule {}
