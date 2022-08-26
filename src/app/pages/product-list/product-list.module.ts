import { GridCardModule } from './../../shared/lazy-component/grid-card/grid-card.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListRoutingModule } from './product-list-routing.module';
import { ProductListComponent } from './product-list.component';
import {SharedModule} from '../../shared/shared.module';
import {ProductCardOneModule} from '../../shared/lazy-component/product-card-one/product-card-one.module';
import {MaterialModule} from '../../material/material.module';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {BreadcrumbModule} from '../../shared/lazy-component/breadcrumb/breadcrumb.module';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [ProductListComponent],
    imports: [
        CommonModule,
        ProductListRoutingModule,
        SharedModule,
        ProductCardOneModule,
        MaterialModule,
        FormsModule,
        NgxPaginationModule,
        BreadcrumbModule,
        MatSliderModule,
        GridCardModule
    ]
})
export class ProductListModule { }
