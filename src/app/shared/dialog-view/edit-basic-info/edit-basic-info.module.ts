import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditBasicInfoComponent } from './edit-basic-info.component';
import {SharedModule} from '../../shared.module';
import {MaterialModule} from '../../../material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    EditBasicInfoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EditBasicInfoComponent
  ]
})
export class EditBasicInfoModule { }
