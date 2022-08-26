import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateCheckboxOrderStatusComponent } from './update-checkbox-order-status.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../shared/shared.module';



@NgModule({
  declarations: [
    UpdateCheckboxOrderStatusComponent
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class UpdateCheckboxOrderStatusModule { }
