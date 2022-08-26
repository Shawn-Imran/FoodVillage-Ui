import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CheckoutRoutingModule} from './checkout-routing.module';
import {CheckoutComponent} from './checkout.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmOrderDialogComponent} from './confirm-order-dialog/confirm-order-dialog.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AddNewAddressModule } from 'src/app/shared/dialog-view/add-new-address/add-new-address.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';


@NgModule({
  declarations: [
    CheckoutComponent,
    ConfirmOrderDialogComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule,
    AddNewAddressModule
  ]
})
export class CheckoutModule { }
