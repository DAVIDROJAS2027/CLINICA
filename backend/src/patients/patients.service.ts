import { Injectable } from '@nestjs/common';
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

  findByDocument(documento: string) {
    return this.patientRepository.findOne({ where: { documento }, relations: { orders: true } });
  }

  update(id: string, updatePatientDto: any) {
    return this.patientRepository.update(id, updatePatientDto);
  }

  remove(id: string) {
    return this.patientRepository.delete(id);
  }
}
