import { Repository } from 'typeorm';
import { Order } from './entities/order.entity.js';
export declare class OrdersService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<Order>);
    create(createOrderDto: any): Promise<Order[]>;
    findAll(): Promise<Order[]>;
    findOne(id: string): Promise<Order | null>;
    update(id: string, updateOrderDto: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
