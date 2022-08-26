import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
// // For MDB Angular Free
// import { CarouselModule, WavesModule } from 'angular-bootstrap-md'


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    RouterModule,
    SwiperModule
    // MDBBootstrapModule,
    // CarouselModule,
    // WavesModule
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductsModule { }
