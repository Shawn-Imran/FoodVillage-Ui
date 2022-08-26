import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditInfoRoutingModule } from './edit-info-routing.module';
import { EditInfoComponent } from './edit-info.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditInfoComponent
  ],
  imports: [
    CommonModule,
    EditInfoRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditInfoModule { }
