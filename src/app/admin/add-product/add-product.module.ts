import { AddProductComponent } from './add-product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductRoutingModule } from './add-product-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageGalleryDialogModule } from '../image-gallery-dialog/image-gallery-dialog.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatSelectFilterModule } from 'mat-select-filter';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxEditorModule } from 'ngx-editor';


@NgModule({
  declarations: [
    AddProductComponent
  ],
  imports: [
    CommonModule,
    AddProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    DigitOnlyModule,
    AngularEditorModule,
    ImageGalleryDialogModule,
    MatSelectFilterModule,
    NgxSpinnerModule,
    NgxEditorModule

  ]
})
export class AddProductModule { }
