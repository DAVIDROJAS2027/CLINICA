import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SettingsService, AppSettings } from '../../services/settings.service';
import { ApiService } from '../../services/api.service';
import { OrderStateService } from '../../services/order-state.service';
import { Order } from '../../interfaces/order.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  settings$ = this.settingsService.settings$;

  // --- Configuración ---
  showSettings = false;
  draft: AppSettings = { ...this.settingsService.value };
  testStatus: 'idle' | 'testing' | 'ok' | 'fail' = 'idle';

  // --- Historial ---
  showHistory = false;
  orders: Order[] = [];
  loadingOrders = false;
  historyError = '';
  search = '';

  private subs = new Subscription();

  constructor(
    private settingsService: SettingsService,
    private api: ApiService,
    private orderState: OrderStateService
  ) {}

  ngOnInit() {
    this.refreshOrders();
    this.subs.add(this.orderState.orderSaved$.subscribe(() => this.refreshOrders()));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // ================= CONFIGURACIÓN =================
  openSettings() {
    this.draft = { ...this.settingsService.value };
    this.testStatus = 'idle';
    this.showSettings = true;
  }

  closeSettings() {
    this.showSettings = false;
  }

  saveSettings() {
    if (!this.draft.nombreOptica?.trim() || !this.draft.doctorNombre?.trim()) {
      alert('El nombre de la óptica y del doctor son obligatorios.');
      return;
    }
    if (!/^https?:\/\/.+/i.test(this.draft.apiUrl || '')) {
      alert('La URL del servidor debe empezar por http:// o https://');
      return;
    }
    this.settingsService.save(this.draft);
    this.showSettings = false;
    this.refreshOrders();
    alert('Configuración guardada correctamente.');
  }

  restoreDefaults() {
    if (!confirm('¿Restaurar la configuración de fábrica?')) return;
    this.settingsService.reset();
    this.draft = { ...this.settingsService.value };
    this.testStatus = 'idle';
  }

  testConnection() {
    this.testStatus = 'testing';
    this.api.ping(this.draft.apiUrl).subscribe({
      next: () => (this.testStatus = 'ok'),
      error: () => (this.testStatus = 'fail'),
    });
  }

  // ================= HISTORIAL =================
  openHistory() {
    this.showHistory = true;
    this.refreshOrders();
  }

  closeHistory() {
    this.showHistory = false;
  }

  refreshOrders() {
    this.loadingOrders = true;
    this.historyError = '';
    this.api.getOrders().subscribe({
      next: (orders) => {
        this.orders = [...(orders || [])].sort(
          (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
        this.loadingOrders = false;
      },
      error: (err) => {
        this.loadingOrders = false;
        this.historyError = 'No se pudo conectar con el servidor (' + (err.status || 'sin respuesta') + '). Revise la URL en Configuración.';
      },
    });
  }

  get filteredOrders(): Order[] {
    const q = this.search.trim().toLowerCase();
    if (!q) return this.orders;
    return this.orders.filter((o) => {
      const p: any = o.patient || {};
      return (
        (o.orderNumber || '').toLowerCase().includes(q) ||
        (p.nombreCompleto || '').toLowerCase().includes(q) ||
        (p.documento || '').toLowerCase().includes(q)
      );
    });
  }

  patientName(o: Order): string {
    return typeof o.patient === 'object' && o.patient ? o.patient.nombreCompleto || 'Sin nombre' : 'Sin nombre';
  }

  patientDoc(o: Order): string {
    return typeof o.patient === 'object' && o.patient ? o.patient.documento || '' : '';
  }

  viewOrder(o: Order) {
    this.orderState.loadOrder(o);
    this.showHistory = false;
  }

  printSaved(o: Order) {
    this.orderState.loadOrder(o);
    this.showHistory = false;
    setTimeout(() => window.print(), 300);
  }

  deleteOrder(o: Order) {
    if (!o.id) return;
    if (!confirm(`¿Eliminar la orden ${o.orderNumber}? Esta acción no se puede deshacer.`)) return;
    this.api.deleteOrder(o.id).subscribe({
      next: () => this.refreshOrders(),
      error: (err) => alert('Error eliminando la orden: ' + err.message),
    });
  }
}
