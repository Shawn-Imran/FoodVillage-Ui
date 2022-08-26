import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SliderModule } from '../slider/slider.module';
import { ProductsModule } from '../products/products.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SliderModule,
    ProductsModule
  ]
})
export class HomeModule { }
