import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddNewAddressComponent} from './add-new-address.component';
import {MaterialModule} from '../../../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {DigitOnlyModule} from "@uiowa/digit-only";



@NgModule({
  declarations: [
    AddNewAddressComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    DigitOnlyModule,
  ],
  exports: [
    AddNewAddressComponent
  ]
})
export class AddNewAddressModule { }
