import { Patient } from './patient.interface';

export interface FormulaOptometrica {
  od?: {
    esfera?: string;
    cilindro?: string;
    eje?: string;
    adicion?: string;
    dp?: string;
  };
  oi?: {
    esfera?: string;
    cilindro?: string;
    eje?: string;
    adicion?: string;
    dp?: string;
  };
  dpTotal?: string;
  uso?: string;
}

export interface ProductosOrden {
  montura?: string;
  lente?: string;
  observaciones?: string;
}

export interface PreciosOrden {
  valorMontura?: number;
  valorLentes?: number;
  valorOtros?: number;
  descuento?: number;
  totalVenta?: number;
  abono?: number;
  saldo?: number;
  metodoPago?: string;
}

export interface Order {
  id?: string;
  orderNumber: string;
  patient: Patient | string;
  formula: FormulaOptometrica;
  productos: ProductosOrden;
  precios: PreciosOrden;
  createdAt?: string;
  updatedAt?: string;
}
