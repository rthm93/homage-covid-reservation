import { Injectable } from '@nestjs/common';

@Injectable()
export class VaccinationSlotCacheService {
  readonly BOOKINGS: { [slotId: number]: number };

  getAvailableSlots(slotId: number): Promise<number> {
    return Promise.resolve(this.BOOKINGS[slotId]);
  }

  bookSlot(slotId: number): Promise<void> {
    this.BOOKINGS[slotId] = !this.BOOKINGS[slotId]
      ? 1
      : this.BOOKINGS[slotId] + 1;
    return Promise.resolve();
  }
}
