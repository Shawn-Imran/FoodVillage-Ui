import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderModule } from '../core/header/header.module';
import { MaterialModule } from '../material/material.module';




@NgModule({
  declarations: [
    AdminComponent,

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HeaderModule,
    MaterialModule
  ]
})
export class AdminModule { }
