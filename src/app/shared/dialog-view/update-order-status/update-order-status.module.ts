import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UpdateOrderStatusComponent} from './update-order-status.component';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {MaterialModule} from '../../../material/material.module';
// import {NgxSpinnerModule} from 'ngx-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-spinner';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [
    UpdateOrderStatusComponent,
  ],
  imports: [
    CommonModule,
    ExtendedModule,
    FlexModule,
    MaterialModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    SharedModule
  ]
})
export class UpdateOrderStatusModule { }
