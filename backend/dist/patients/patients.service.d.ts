import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity.js';
export declare class PatientsService {
    private readonly patientRepository;
    constructor(patientRepository: Repository<Patient>);
    create(createPatientDto: any): Promise<Patient[]>;
    findAll(): Promise<Patient[]>;
    findOne(id: string): Promise<Patient | null>;
    findByDocument(documento: string): Promise<Patient | null>;
    update(id: string, updatePatientDto: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
