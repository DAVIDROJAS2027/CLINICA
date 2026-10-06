import { OrdersService } from './orders.service.js';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: any): Promise<import("./entities/order.entity.js").Order[]>;
    findAll(): Promise<import("./entities/order.entity.js").Order[]>;
    findOne(id: string): Promise<import("./entities/order.entity.js").Order | null>;
    update(id: string, updateOrderDto: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
