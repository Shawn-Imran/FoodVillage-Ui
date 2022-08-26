import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopCardOneComponent } from './shop-card-one.component';
import {FlexLayoutModule} from '@angular/flex-layout';



@NgModule({
    declarations: [
        ShopCardOneComponent
    ],
    exports: [
        ShopCardOneComponent
    ],
  imports: [
    CommonModule,
    FlexLayoutModule
  ]
})
export class ShopCardOneModule { }
