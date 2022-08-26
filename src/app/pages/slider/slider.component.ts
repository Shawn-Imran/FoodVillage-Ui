import { Component, OnInit } from '@angular/core';

import SwiperCore, { Pagination, Autoplay, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([Pagination, Autoplay, Navigation]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
