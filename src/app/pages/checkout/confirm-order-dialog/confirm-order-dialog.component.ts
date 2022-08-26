import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Cart } from 'src/app/interfaces/cart';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-confirm-order-dialog',
  templateUrl: './confirm-order-dialog.component.html',
  styleUrls: ['./confirm-order-dialog.component.scss']
})
export class ConfirmOrderDialogComponent implements OnInit {

  carts: Cart[] = [];
  order: Order = null;
  selectedPaymentType: string = null;

  constructor(
    public dialogRef: MatDialogRef<ConfirmOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.carts = this.data.carts;
      this.order = this.data.order;
      this.selectedPaymentType = this.data.selectedPaymentType;
    }
  }

  isConfirmOrder(isConfirm: boolean) {
    this.dialogRef.close({isConfirm});
  }

}
