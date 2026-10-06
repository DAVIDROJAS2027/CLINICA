import type { Relation } from 'typeorm';
import type { Patient } from '../../patients/entities/patient.entity.js';
export declare class Order {
    id: string;
    orderNumber: string;
    patient: Relation<Patient>;
    formula: any;
    productos: any;
    precios: any;
    createdAt: Date;
    updatedAt: Date;
}
