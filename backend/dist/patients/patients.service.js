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
import { Patient } from './entities/patient.entity.js';
let PatientsService = class PatientsService {
    patientRepository;
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }
    create(createPatientDto) {
        const patient = this.patientRepository.create(createPatientDto);
        return this.patientRepository.save(patient);
    }
    findAll() {
        return this.patientRepository.find({ relations: { orders: true }, order: { createdAt: 'DESC' } });
    }
    findOne(id) {
        return this.patientRepository.findOne({ where: { id }, relations: { orders: true } });
    }
    findByDocument(documento) {
        return this.patientRepository.findOne({ where: { documento }, relations: { orders: true } });
    }
    update(id, updatePatientDto) {
        return this.patientRepository.update(id, updatePatientDto);
    }
    remove(id) {
        return this.patientRepository.delete(id);
    }
};
PatientsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Patient)),
    __metadata("design:paramtypes", [Repository])
], PatientsService);
export { PatientsService };
//# sourceMappingURL=patients.service.js.map