import { ReservationRequest } from './reservation-request';

export interface RescheduleRequest extends ReservationRequest {
  appointmentId: string;
}
