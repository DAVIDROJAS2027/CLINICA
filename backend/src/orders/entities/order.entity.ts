import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import type { Relation } from 'typeorm';
import type { Patient } from '../../patients/entities/patient.entity.js';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  orderNumber: string;

  @ManyToOne('Patient', 'orders', { eager: true, onDelete: 'CASCADE' })
  patient: Relation<Patient>;

  @Column('jsonb')
  formula: any;

  @Column('jsonb')
  productos: any;

  @Column('jsonb')
  precios: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
