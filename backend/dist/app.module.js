var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PatientsModule } from './patients/patients.module.js';
import { OrdersModule } from './orders/orders.module.js';
export const { ObserveModule, ObserveInstrument } = createObserveModule();
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({ isGlobal: true }),
            TypeOrmModule.forRootAsync({
                imports: [ConfigModule],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DB_HOST') || 'localhost',
                    port: configService.get('DB_PORT') || 5432,
                    username: configService.get('DB_USER') || 'postgres',
                    password: configService.get('DB_PASSWORD') || 'postgres',
                    database: configService.get('DB_NAME') || 'clinica_db',
                    autoLoadEntities: true,
                    synchronize: true,
                }),
                inject: [ConfigService],
            }),
            ObserveModule.forRoot({
                appKey: 'YOUR_APP_KEY',
                appSecret: 'YOUR_APP_SECRET',
                serviceId: 'backend',
            }),
            PatientsModule,
            OrdersModule,
        ],
        controllers: [AppController],
        providers: [AppService],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map