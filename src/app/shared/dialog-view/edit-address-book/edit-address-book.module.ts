import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditAddressBookComponent} from './edit-address-book.component';
import {SharedModule} from '../../shared.module';
import {MaterialModule} from '../../../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    EditAddressBookComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    EditAddressBookComponent
  ]
})
export class EditAddressBookModule {
}
