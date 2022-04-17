import { BelongsTo, Column, HasOne, Model, Table } from 'sequelize-typescript';
import {
  VaccinationCenter,
  VaccinationCenterModel,
} from './vaccination-center';

export interface VaccinationSlot {
  slotId: string;
  vaccinationCenter: VaccinationCenter;
  start: Date;
  end: Date;
  slotsAvailable: number;
}

@Table({
  tableName: 'vaccinationslots',
  createdAt: false,
  updatedAt: false,
})
export class VaccinationSlotModel extends Model implements VaccinationSlot {
  @Column({
    field: 'slotid',
    primaryKey: true,
  })
  slotId: string;

  @BelongsTo(() => VaccinationCenterModel, 'centerid')
  vaccinationCenter: VaccinationCenter;

  @Column({
    field: 'start',
  })
  start: Date;

  @Column({
    field: 'end',
  })
  end: Date;

  @Column({
    field: 'slotsavailable',
  })
  slotsAvailable: number;
}
