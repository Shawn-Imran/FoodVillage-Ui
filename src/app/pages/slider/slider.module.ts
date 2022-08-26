import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderRoutingModule } from './slider-routing.module';
import { SliderComponent } from './slider.component';
import { RouterModule } from '@angular/router';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { CarouselModule, WavesModule } from 'angular-bootstrap-md'
import { SwiperModule } from 'swiper/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SliderComponent
  ],
  imports: [
    CommonModule,
    SliderRoutingModule,
    RouterModule,
    FormsModule,
    // MDBBootstrapModule,
    // CarouselModule,
    // WavesModule,
    SwiperModule,
  ],
  exports: [
    SliderComponent
  ]
})
export class SliderModule { }
