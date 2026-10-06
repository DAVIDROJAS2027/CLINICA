var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
let Patient = class Patient {
    id;
    documento;
    nombreCompleto;
    telefono;
    edad;
    orders;
    createdAt;
    updatedAt;
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Patient.prototype, "id", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], Patient.prototype, "documento", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], Patient.prototype, "nombreCompleto", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "telefono", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], Patient.prototype, "edad", void 0);
__decorate([
    OneToMany('Order', 'patient'),
    __metadata("design:type", Object)
], Patient.prototype, "orders", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Patient.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Patient.prototype, "updatedAt", void 0);
Patient = __decorate([
    Entity('patients')
], Patient);
export { Patient };
//# sourceMappingURL=patient.entity.js.map