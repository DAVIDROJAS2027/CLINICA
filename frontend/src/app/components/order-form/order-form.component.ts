import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderStateService } from '../../services/order-state.service';
import { ApiService } from '../../services/api.service';
import { Patient } from '../../interfaces/patient.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class OrderFormComponent implements OnInit {
  order$ = this.orderState.currentOrder$;

  constructor(
    private orderState: OrderStateService,
    private api: ApiService
  ) {}

  ngOnInit() {}

  onPatientChange(field: keyof Patient, value: any) {
    this.orderState.updatePatient({ [field]: value });
  }

  onFormulaChange(ojo: 'od' | 'oi', field: string, value: any) {
    const current = (this.orderState as any).orderStateSource.value.formula;
    this.orderState.updateFormula({
      [ojo]: { ...current[ojo], [field]: value }
    });
  }

  onFormulaGeneralChange(field: string, value: any) {
    this.orderState.updateFormula({ [field]: value });
  }

  onProductosChange(field: string, value: any) {
    this.orderState.updateProductos({ [field]: value });
  }

  onPreciosChange(field: string, value: any) {
    this.orderState.updatePrecios({ [field]: Number(value) || 0 });
  }

  onMetodoPagoChange(value: any) {
    this.orderState.updatePrecios({ metodoPago: value });
  }

  reset() {
    this.orderState.resetOrder();
  }

  saveOrder() {
    const orderData = (this.orderState as any).orderStateSource.value;
    
    // First ensure patient exists
    const patientData = orderData.patient;
    this.api.createPatient(patientData).subscribe({
      next: (patientResponse) => {
        const newOrder = {
          ...orderData,
          patient: patientResponse.id
        };
        this.api.createOrder(newOrder).subscribe({
          next: () => alert('Venta guardada con éxito!'),
          error: (err) => alert('Error guardando la orden: ' + err.message)
        });
      },
      error: (err) => {
        // If patient exists (unique document error), we could fetch the patient and use their ID, but for simplicity we show alert
        alert('Error con el paciente: ' + err.message + '. Asegúrate de que el documento no esté duplicado.');
      }
    });
  }
}
