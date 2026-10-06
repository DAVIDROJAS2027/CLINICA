import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderStateService } from '../../services/order-state.service';

@Component({
  selector: 'app-receipt-preview',
  templateUrl: './receipt-preview.component.html',
  styleUrls: ['./receipt-preview.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ReceiptPreviewComponent implements OnInit {
  order$ = this.orderState.currentOrder$;

  constructor(private orderState: OrderStateService) {}

  ngOnInit() {}

  print() {
    window.print();
  }
}
