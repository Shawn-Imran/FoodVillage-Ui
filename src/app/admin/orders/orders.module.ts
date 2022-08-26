import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSpinnerModule} from 'ngx-spinner';
import { OrderDetailsComponent } from './order-details/order-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UpdateOrderStatusComponent} from './update-order-status/update-order-status.component';
import { MaterialModule } from 'src/app/material/material.module';
import { UpdateCheckboxOrderStatusModule } from 'src/app/shared/dialog-view/update-checkbox-order-status/update-checkbox-order-status.module';
import { UpdateOrderStatusModule } from 'src/app/shared/dialog-view/update-order-status/update-order-status.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderDetailsComponent,
    UpdateOrderStatusComponent
  ],
    imports: [
        CommonModule,
        OrdersRoutingModule,
        FlexModule,
        MaterialModule,
        NgxPaginationModule,
        NgxSpinnerModule,
        PipesModule,
        ReactiveFormsModule,
        FormsModule,
        ExtendedModule,
        SharedModule,
        UpdateCheckboxOrderStatusModule,
        UpdateOrderStatusModule
    ]
})
export class OrdersModule { }
