import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderStateService } from '../../services/order-state.service';
import { ApiService } from '../../services/api.service';
import { SettingsService } from '../../services/settings.service';
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
    private api: ApiService,
    private settings: SettingsService
  ) {}

  ngOnInit() {}

  onPatientChange(field: keyof Patient, value: any) {
    this.orderState.updatePatient({ [field]: value });
  }

  searchPatient() {
    const documentStr = (this.orderState as any).orderStateSource.value.patient.documento;
    if (!documentStr) {
      alert('Por favor, ingrese un número de cédula primero.');
      return;
    }
    this.api.getPatientByDocument(documentStr).subscribe({
      next: (patient) => {
        if (patient) {
          this.orderState.updatePatient({
            nombreCompleto: patient.nombreCompleto,
            telefono: patient.telefono,
            edad: patient.edad
          });
          alert('Datos del paciente cargados correctamente.');
        } else {
          alert('No se encontró ningún paciente con esa cédula.');
        }
      },
      error: (err) => {
        if (err.status === 404) {
          alert('No se encontró ningún paciente con esa cédula.');
        } else {
          alert('Error al buscar paciente: ' + err.message);
        }
      }
    });
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
    const patientData = orderData.patient;

    if (!patientData.documento || !patientData.nombreCompleto) {
      alert('Por favor ingrese al menos cédula y nombre del paciente.');
      return;
    }

    // Primero verificamos si el paciente ya existe por cédula
    this.api.getPatientByDocument(patientData.documento).subscribe({
      next: (existingPatient) => {
        if (existingPatient && existingPatient.id) {
          // El paciente existe, actualizamos sus datos y creamos la orden
          this.api.updatePatient(existingPatient.id!, patientData).subscribe({
            next: (updatedPatient) => this.createOrderForPatient(updatedPatient.id!, orderData),
            error: (err) => alert('Error actualizando paciente: ' + err.message)
          });
        }
      },
      error: (err) => {
        // Si da 404 es que no existe, entonces lo creamos
        if (err.status === 404) {
          this.api.createPatient(patientData).subscribe({
            next: (newPatient) => this.createOrderForPatient(newPatient.id!, orderData),
            error: (createErr) => alert('Error creando paciente: ' + createErr.message)
          });
        } else {
          alert('Error buscando paciente: ' + err.message);
        }
      }
    });
  }

  private createOrderForPatient(patientId: string, orderData: any) {
    const newOrder = {
      ...orderData,
      patient: patientId
    };
    this.api.createOrder(newOrder).subscribe({
      next: () => {
        alert('¡Venta guardada con éxito en la base de datos!');
        this.orderState.notifyOrderSaved();
        this.reset();
      },
      error: (err) => alert('Error guardando la orden: ' + err.message)
    });
  }

  printOrder() {
    window.print();
  }

  sendWhatsApp() {
    const orderData = (this.orderState as any).orderStateSource.value;
    const phone = orderData.patient.telefono;
    if (!phone) {
      alert('Por favor ingrese el número de teléfono del paciente.');
      return;
    }
    const cfg = this.settings.value;
    const message = `Hola ${orderData.patient.nombreCompleto}, le escribimos de ${cfg.nombreOptica} para confirmar su orden ${orderData.orderNumber}. Saldo pendiente: $${orderData.precios.saldo}.`;
    const url = `https://api.whatsapp.com/send?phone=${cfg.indicativoWhatsapp}${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  fillDemo() {
    this.orderState.updatePatient({
      documento: '1234567890',
      nombreCompleto: 'Maria Camila Sanchez',
      telefono: '3001234567',
      edad: '32'
    });
    this.orderState.updateFormula({
      od: { esfera: '-1.00', cilindro: '-0.50', eje: '180', adicion: '', dp: '32' },
      oi: { esfera: '-1.25', cilindro: '-0.75', eje: '175', adicion: '', dp: '31' },
      dpTotal: '63',
      uso: 'Visión Lejana / Permanente'
    });
    this.orderState.updateProductos({
      montura: 'Acetato Carett',
      lente: 'Policarbonato AR',
      observaciones: 'Entregar el viernes en la mañana'
    });
    this.orderState.updatePrecios({
      valorMontura: 120000,
      valorLentes: 80000,
      valorOtros: 0,
      descuento: 20000,
      abono: 100000,
      metodoPago: 'Transferencia / Nequi / Daviplata'
    });
  }
}
