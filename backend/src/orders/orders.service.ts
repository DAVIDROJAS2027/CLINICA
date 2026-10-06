import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderDto } from './dto/update-order.dto.js';
import { Order } from './entities/order.entity.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  create(createOrderDto: any) {
    const { id: _id, createdAt: _c, updatedAt: _u, patient, ...data } = createOrderDto || {};
    const order = this.orderRepository.create({
      ...data,
      patient: typeof patient === 'string' ? { id: patient } : patient?.id ? { id: patient.id } : undefined,
    } as any);
    return this.orderRepository.save(order);
  }

  findAll() {
    return this.orderRepository.find({ relations: { patient: true }, order: { createdAt: 'DESC' } });
  }

  findOne(id: string) {
    return this.orderRepository.findOne({ where: { id }, relations: { patient: true } });
  }

  update(id: string, updateOrderDto: any) {
    return this.orderRepository.update(id, updateOrderDto);
  }

  remove(id: string) {
    return this.orderRepository.delete(id);
  }
}
