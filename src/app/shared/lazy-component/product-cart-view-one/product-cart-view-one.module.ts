import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCartViewOneComponent } from './product-cart-view-one.component';
import {MaterialModule} from '../../../material/material.module';



@NgModule({
  declarations: [
    ProductCartViewOneComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ProductCartViewOneComponent
  ]
})
export class ProductCartViewOneModule { }
