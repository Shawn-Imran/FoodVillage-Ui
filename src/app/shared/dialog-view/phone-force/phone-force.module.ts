import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneForceComponent } from './phone-force.component';
import {SharedModule} from '../../shared.module';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [PhoneForceComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PhoneForceComponent
  ]
})
export class PhoneForceModule { }
