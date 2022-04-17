import { Column, Model, Table } from 'sequelize-typescript';

export interface VaccinationCenter {
  centerId: string;
  location: string;
}

@Table({
  tableName: 'vaccinationcenters',
  createdAt: false,
  updatedAt: false,
})
export class VaccinationCenterModel extends Model implements VaccinationCenter {
  @Column({
    field: 'centerid',
    primaryKey: true,
  })
  centerId: string;

  @Column({
    field: 'location',
  })
  location: string;
}
