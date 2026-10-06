import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStateService } from '../../services/order-state.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-receipt-preview',
  templateUrl: './receipt-preview.component.html',
  styleUrls: ['./receipt-preview.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ReceiptPreviewComponent implements OnInit {
  order$ = this.orderState.currentOrder$;
  settings$ = this.settingsService.settings$;

  constructor(private orderState: OrderStateService, private settingsService: SettingsService) {}

  ngOnInit() {}

  print() {
    window.print();
  }
}
