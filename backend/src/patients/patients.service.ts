import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto.js';
import { UpdatePatientDto } from './dto/update-patient.dto.js';
import { Patient } from './entities/patient.entity.js';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  create(createPatientDto: any) {
    const patient = this.patientRepository.create(createPatientDto);
    return this.patientRepository.save(patient);
  }

  findAll() {
    return this.patientRepository.find({ relations: { orders: true }, order: { createdAt: 'DESC' } });
  }

  findOne(id: string) {
    return this.patientRepository.findOne({ where: { id }, relations: { orders: true } });
  }

  async findByDocument(documento: string) {
    const patient = await this.patientRepository.findOne({ where: { documento }, relations: { orders: true } });
    if (!patient) {
      throw new NotFoundException(`Paciente con documento ${documento} no encontrado`);
    }
    return patient;
  }

  async update(id: string, updatePatientDto: any) {
    // Solo columnas editables (evita errores al recibir relaciones/ids desde el frontend)
    const { id: _id, orders: _orders, createdAt: _c, updatedAt: _u, ...data } = updatePatientDto || {};
    await this.patientRepository.update(id, data);
    return this.patientRepository.findOne({ where: { id } });
  }

  remove(id: string) {
    return this.patientRepository.delete(id);
  }
}
