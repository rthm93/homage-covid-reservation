import { Injectable } from '@nestjs/common';

/**
 * Vaccination slot cache, used to manage concurrent requests.
 * This service should be a singleton instance.
 * Should changed to use Redis Server or other distributed cache if API have multiple instances.
 */
@Injectable()
export class VaccinationSlotCacheService {
  readonly BOOKINGS: { [slotId: string]: number } = {};

  /**
   * Add a reservation into vaccination slot.
   * @param slotId Reservation slot id.
   * @returns The current sequence.
   */
  bookSlot(slotId: string): Promise<number> {
    this.BOOKINGS[slotId] = !this.BOOKINGS[slotId]
      ? 1
      : this.BOOKINGS[slotId] + 1;
    return Promise.resolve(this.BOOKINGS[slotId]);
  }

  /**
   * Release a reservation in case of change of vaccination slot.
   * @param slotId Reservation slot id.
   * @returns Completed promise.
   */
  releaseSlot(slotId: string): Promise<void> {
    this.BOOKINGS[slotId] =
      !this.BOOKINGS[slotId] || this.BOOKINGS[slotId] < 0
        ? 0
        : this.BOOKINGS[slotId] - 1;
    return Promise.resolve();
  }
}
