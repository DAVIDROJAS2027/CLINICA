import type { Relation } from 'typeorm';
import type { Order } from '../../orders/entities/order.entity.js';
export declare class Patient {
    id: string;
    documento: string;
    nombreCompleto: string;
    telefono: string;
    edad: string;
    orders: Relation<Order[]>;
    createdAt: Date;
    updatedAt: Date;
}
