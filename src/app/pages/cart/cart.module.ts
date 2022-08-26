import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { ProductCartViewOneModule } from 'src/app/shared/lazy-component/product-cart-view-one/product-cart-view-one.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';


const routes: Routes = [
  {path: '', component: CartComponent}
];


@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MaterialModule,
    ProductCartViewOneModule,
    PipesModule,
    FormsModule
  ]
})
export class CartModule { }
