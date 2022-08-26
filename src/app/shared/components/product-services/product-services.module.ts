import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductServicesComponent } from './product-services.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ProductServicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    ProductServicesComponent
  ]
})
export class ProductServicesModule { }
