import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {OrderStatus} from '../../../enum/order-status';
import {Order} from '../../../interfaces/order';
import {Select} from '../../../interfaces/select';
import {UiService} from '../../../services/ui.service';
import {OrderService} from '../../../services/order.service';
import {UtilsService} from '../../../services/utils.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ReloadService} from '../../../services/reload.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UpdateOrderStatusComponent} from '../update-order-status/update-order-status.component';

@Component({
  selector: 'app-update-checkbox-order-status',
  templateUrl: './update-checkbox-order-status.component.html',
  styleUrls: ['./update-checkbox-order-status.component.scss']
})
export class UpdateCheckboxOrderStatusComponent implements OnInit {

  // Form Template Ref
  @ViewChild('templateForm') templateForm: NgForm;

  dataForm?: FormGroup;
  private sub: Subscription;

  public orderEnum = OrderStatus;

  autoSlug = true;
  isLoading = false;

  // Store Data from param
  order: Order = null;

  today = new Date();

  orderStatus: Select[] = [
    {value: OrderStatus.PENDING, viewValue: 'Pending'},
    {value: OrderStatus.CONFIRM, viewValue: 'Confirm'},
    {value: OrderStatus.PROCESSING, viewValue: 'Processing'},
    {value: OrderStatus.SHIPPING, viewValue: 'Shipping'},
    {value: OrderStatus.DELIVERED, viewValue: 'Delivered'},
    {value: OrderStatus.CANCEL, viewValue: 'Cancel'},
    {value: OrderStatus.REFUND, viewValue: 'Refund'},
  ];

  constructor(
    private fb: FormBuilder,
    private uiService: UiService,
    private orderService: OrderService,
    private utilsService: UtilsService,
    private spinner: NgxSpinnerService,
    private reloadService: ReloadService,
    public dialogRef: MatDialogRef<UpdateOrderStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    // console.log('clicked............');
    this.dataForm = this.fb.group({
      deliveryStatus: [null, Validators.required],
      nextPhaseDate: [null],
    });

    // console.log('%%%%%%%%%%%');
    // console.log(this.data);


  }

  onSubmit() {
    // console.log('update checkbox');
    if (this.dataForm.invalid) {
      this.uiService.warn('Please complete all the required fields');
      return;
    }


      const mData = {
        updateDate: new Date(),
        nextPhaseDate: this.dataForm.value.nextPhaseDate ? new Date(this.dataForm.value.nextPhaseDate) : null
      };

      if (this.data) {
        const orders: any[] = this.data;
        orders.forEach( m => {
          m.deliveryStatus = this.dataForm.value.deliveryStatus;
          m.deliveryDate = this.utilsService.getDateString(new Date());
          m.nextPhaseDate = mData.nextPhaseDate;
        });

        this.orderService.updateMultipleOrderById(orders)
          .subscribe(res => {
            // console.log('MMMMMMMMMMMMMMMMMM');
            // console.log(res.message);
            this.uiService.success(res.message);
            this.reloadService.needRefreshOrder$();
            this.spinner.hide();
            this.dialogRef.close();
          }, error => {
            console.log(error);
            this.spinner.hide();
          });



      }



  }


  /**
   * HTTP REQ HANDLE
   * GET ATTRIBUTES BY ID
   */

  private changeOrderStatus(data: any) {

    // console.log(data);
    this.spinner.show();
    this.orderService.changeOrderStatus(data)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.dialogRef.close();
        this.spinner.hide();
        this.reloadService.needRefreshOrder$();
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
  }

  get showDateField(): boolean {
    if (this.dataForm.value) {
      switch (this.dataForm.value.deliveryStatus) {

        case this.orderEnum.CANCEL: {
          this.dataForm.get('nextPhaseDate').clearValidators();
          this.dataForm.get('nextPhaseDate').updateValueAndValidity();
          this.dataForm.value.nextPhaseDate = null;
          return false;
        }
        case this.orderEnum.PROCESSING: {
          this.dataForm.get('nextPhaseDate').setValidators([Validators.required]);
          return true;
        }
        case this.orderEnum.CONFIRM: {
          this.dataForm.get('nextPhaseDate').setValidators([Validators.required]);
          return true;
        }
        case this.orderEnum.DELIVERED: {
          this.dataForm.get('nextPhaseDate').clearValidators();
          this.dataForm.get('nextPhaseDate').updateValueAndValidity();
          this.dataForm.value.nextPhaseDate = null;
          return false;
        }
        case this.orderEnum.REFUND: {
          this.dataForm.get('nextPhaseDate').clearValidators();
          this.dataForm.get('nextPhaseDate').updateValueAndValidity();
          this.dataForm.value.nextPhaseDate = null;
          return false;
        }
        case this.orderEnum.SHIPPING: {
          this.dataForm.get('nextPhaseDate').setValidators([Validators.required]);
          return true;
        }
        default: {
          this.dataForm.get('nextPhaseDate').clearValidators();
          this.dataForm.get('nextPhaseDate').updateValueAndValidity();
          this.dataForm.value.nextPhaseDate = null;
          return false;
        }
      }
    }
  }


  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
