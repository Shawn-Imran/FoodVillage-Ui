import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';

import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    MaterialModule,
  ]
})
export class UserProfileModule { }
