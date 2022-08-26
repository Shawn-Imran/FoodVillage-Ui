import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditUserInfoRoutingModule } from './edit-user-info-routing.module';
import { EditUserInfoComponent } from './edit-user-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    EditUserInfoComponent
  ],
  imports: [
    CommonModule,
    EditUserInfoRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditUserInfoModule { }
