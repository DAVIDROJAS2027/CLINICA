import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header.component';
import { OrderFormComponent } from '../../components/order-form/order-form.component';
import { ReceiptPreviewComponent } from '../../components/receipt-preview/receipt-preview.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [IonHeader, IonContent, HeaderComponent, OrderFormComponent, ReceiptPreviewComponent],
})
export class HomeComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
