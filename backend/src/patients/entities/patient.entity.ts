import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm';
import type { Order } from '../../orders/entities/order.entity.js';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  documento: string;

  @Column()
  nombreCompleto: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  edad: string;

  @OneToMany('Order', 'patient')
  orders: Relation<Order[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
