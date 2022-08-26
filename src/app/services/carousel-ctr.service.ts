import {Injectable} from '@angular/core';
// import Swiper core and required modules
import SwiperCore, { EffectFade,Autoplay,Pagination, Navigation } from "swiper";

// install Swiper modules
SwiperCore.use([EffectFade,Autoplay,Pagination, Navigation]);

@Injectable({
  providedIn: 'root'
})
export class CarouselCtrService {

  constructor() {
  }


  


}
