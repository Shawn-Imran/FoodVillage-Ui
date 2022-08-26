import { NgxSpinnerModule } from 'ngx-spinner';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';



import {FlexLayoutModule} from '@angular/flex-layout';

import {NgxPaginationModule} from 'ngx-pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxDropzoneModule} from 'ngx-dropzone';
import { MaterialModule } from 'src/app/material/material.module';
import { ImageGalleryDialogComponent } from './image-gallery-dialog.component';
import { UploadImageComponent } from './upload-image/upload-image.component';



@NgModule({
  declarations: [
    ImageGalleryDialogComponent,
    UploadImageComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    NgxPaginationModule,
    FormsModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    NgxSpinnerModule

  ]
})
export class ImageGalleryDialogModule {
}
