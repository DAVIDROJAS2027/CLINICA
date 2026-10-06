import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppSettings {
  nombreOptica: string;
  nit: string;
  doctorNombre: string;
  doctorProfesion: string;
  doctorRegistro: string;
  direccion: string;
  telefono: string;
  garantia: string;
  apiUrl: string;
  indicativoWhatsapp: string;
}

const STORAGE_KEY = 'clinica_settings_v1';

export const DEFAULT_SETTINGS: AppSettings = {
  nombreOptica: 'Óptica Visión Clara',
  nit: '900.482.910-3 • Régimen Simplificado',
  doctorNombre: 'Dr. Leonardo Ramos',
  doctorProfesion: 'Optómetra ULS',
  doctorRegistro: '84920',
  direccion: 'Carrera 15 # 85-32, Consultorio 302',
  telefono: '(601) 745-8900',
  garantia:
    'Garantía de adaptación de 30 días calendario sobre fórmula. Toda orden debe estar cancelada al momento de entrega física de los lentes.',
  apiUrl: 'http://192.168.1.18:3000',
  indicativoWhatsapp: '57',
};

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private source = new BehaviorSubject<AppSettings>(this.load());
  settings$ = this.source.asObservable();

  get value(): AppSettings {
    return this.source.value;
  }

  save(settings: AppSettings) {
    const clean: AppSettings = {
      ...settings,
      apiUrl: (settings.apiUrl || DEFAULT_SETTINGS.apiUrl).trim().replace(/\/+$/, ''),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
    this.source.next(clean);
  }

  reset() {
    localStorage.removeItem(STORAGE_KEY);
    this.source.next({ ...DEFAULT_SETTINGS });
  }

  private load(): AppSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : { ...DEFAULT_SETTINGS };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  }
}
