import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order, FormulaOptometrica, ProductosOrden, PreciosOrden } from '../interfaces/order.interface';
import { Patient } from '../interfaces/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderStateService {
  private initialPatient: Patient = {
    documento: '',
    nombreCompleto: '',
    telefono: '',
    edad: '',
    createdAt: new Date().toISOString()
  };

  private initialFormula: FormulaOptometrica = {
    od: { esfera: '', cilindro: '', eje: '', adicion: '', dp: '' },
    oi: { esfera: '', cilindro: '', eje: '', adicion: '', dp: '' },
    dpTotal: '',
    uso: 'Visión Lejana / Permanente'
  };

  private initialProductos: ProductosOrden = {
    montura: '',
    lente: '',
    observaciones: ''
  };

  private initialPrecios: PreciosOrden = {
    valorMontura: 0,
    valorLentes: 0,
    valorOtros: 0,
    descuento: 0,
    totalVenta: 0,
    abono: 0,
    saldo: 0,
    metodoPago: 'Efectivo'
  };

  private initialState: Order = {
    orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    patient: this.initialPatient,
    formula: this.initialFormula,
    productos: this.initialProductos,
    precios: this.initialPrecios
  };

  private orderStateSource = new BehaviorSubject<Order>(this.initialState);
  currentOrder$ = this.orderStateSource.asObservable();

  constructor() { }

  updateOrder(newState: Partial<Order>) {
    const current = this.orderStateSource.value;
    this.orderStateSource.next({ ...current, ...newState });
  }

  updatePatient(patient: Partial<Patient>) {
    const current = this.orderStateSource.value;
    this.orderStateSource.next({
      ...current,
      patient: { ...(current.patient as Patient), ...patient }
    });
  }

  updateFormula(formula: Partial<FormulaOptometrica>) {
    const current = this.orderStateSource.value;
    this.orderStateSource.next({
      ...current,
      formula: { ...current.formula, ...formula }
    });
  }

  updateProductos(productos: Partial<ProductosOrden>) {
    const current = this.orderStateSource.value;
    this.orderStateSource.next({
      ...current,
      productos: { ...current.productos, ...productos }
    });
  }

  updatePrecios(precios: Partial<PreciosOrden>) {
    const current = this.orderStateSource.value;
    
    // Auto calculate totals
    const mergedPrecios = { ...current.precios, ...precios };
    const subtotal = (Number(mergedPrecios.valorMontura) || 0) + 
                     (Number(mergedPrecios.valorLentes) || 0) + 
                     (Number(mergedPrecios.valorOtros) || 0);
    const totalVenta = subtotal - (Number(mergedPrecios.descuento) || 0);
    const saldo = totalVenta - (Number(mergedPrecios.abono) || 0);

    mergedPrecios.totalVenta = totalVenta;
    mergedPrecios.saldo = saldo;

    this.orderStateSource.next({
      ...current,
      precios: mergedPrecios
    });
  }

  resetOrder() {
    this.orderStateSource.next({
      ...this.initialState,
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`
    });
  }
}
