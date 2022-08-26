import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardAdminComponent } from './product-card-admin.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    ProductCardAdminComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ],
  exports: [
    ProductCardAdminComponent
  ]
})
export class ProductCardAdminModule { }
