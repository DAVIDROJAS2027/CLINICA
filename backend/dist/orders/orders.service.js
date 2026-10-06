var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity.js';
let OrdersService = class OrdersService {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    create(createOrderDto) {
        const { id: _id, createdAt: _c, updatedAt: _u, patient, ...data } = createOrderDto || {};
        const order = this.orderRepository.create({
            ...data,
            patient: typeof patient === 'string' ? { id: patient } : patient?.id ? { id: patient.id } : undefined,
        });
        return this.orderRepository.save(order);
    }
    findAll() {
        return this.orderRepository.find({ relations: { patient: true }, order: { createdAt: 'DESC' } });
    }
    findOne(id) {
        return this.orderRepository.findOne({ where: { id }, relations: { patient: true } });
    }
    update(id, updateOrderDto) {
        return this.orderRepository.update(id, updateOrderDto);
    }
    remove(id) {
        return this.orderRepository.delete(id);
    }
};
OrdersService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Order)),
    __metadata("design:paramtypes", [Repository])
], OrdersService);
export { OrdersService };
//# sourceMappingURL=orders.service.js.map