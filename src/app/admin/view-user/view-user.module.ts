import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewUserRoutingModule } from './view-user-routing.module';
import { ViewUserComponent } from './view-user.component';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    ViewUserComponent
  ],
  imports: [
    CommonModule,
    ViewUserRoutingModule,
    MaterialModule
  ]
})
export class ViewUserModule { }
