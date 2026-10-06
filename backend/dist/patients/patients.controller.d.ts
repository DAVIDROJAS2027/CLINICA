import { PatientsService } from './patients.service.js';
export declare class PatientsController {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    create(createPatientDto: any): Promise<import("./entities/patient.entity.js").Patient[]>;
    findAll(documento?: string): Promise<import("./entities/patient.entity.js").Patient[]> | Promise<import("./entities/patient.entity.js").Patient | null>;
    findOne(id: string): Promise<import("./entities/patient.entity.js").Patient | null>;
    update(id: string, updatePatientDto: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
