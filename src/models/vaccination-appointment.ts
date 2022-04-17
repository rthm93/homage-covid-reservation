import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { VaccinationSlot, VaccinationSlotModel } from './vaccination-slot';

export interface VaccinationAppointment {
  slot: VaccinationSlot;
  icNumber: string;
  fullName: string;
  appointmentId: string;
}

@Table({
  tableName: 'vaccinationappointment',
})
export class VaccinationAppointmentModel
  extends Model
  implements VaccinationAppointment
{
  @BelongsTo(() => VaccinationSlotModel, 'slotid')
  slot: VaccinationSlot;

  @Column({
    field: 'icnumber',
  })
  icNumber: string;

  @Column({
    field: 'fullname',
  })
  fullName: string;

  @Column({
    field: 'appointmentid',
    primaryKey: true,
  })
  appointmentId: string;
}
