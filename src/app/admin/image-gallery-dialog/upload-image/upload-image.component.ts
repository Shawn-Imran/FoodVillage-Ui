import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ImageFolder } from 'src/app/interfaces/image-folder';
import { ImageGallery } from 'src/app/interfaces/image-gallery';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { GalleryService } from 'src/app/services/gallery.service';
import { ReloadService } from 'src/app/services/reload.service';

import { UtilsService } from 'src/app/services/utils.service';




@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  // in app.component.ts
  files: File[] = [];
  folders: ImageFolder[] = [];
  selectedFolder: ImageFolder = null;


  constructor(
    private fileUploadService: FileUploadService,
    private galleryService: GalleryService,
    private utilsService: UtilsService,
    private reloadService: ReloadService,
    public dialogRef: MatDialogRef<UploadImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    if (this.data) {
      this.folders = this.data;
    }
  }

  /**
   * IMAGE DRUG & DROP
   */
  onSelect(event: { addedFiles: any; }) {
    this.files.push(...event.addedFiles);
    // console.log(this.files);
  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


  /**
   * ON IMAGE UPLOAD
   */
  onUploadImages() {
    if (!this.selectedFolder) {
      console.log('No Folder name found!');
      return;
    }
    if (!this.files || this.files.length <= 0) {
      console.log('No Image selected!');
      return;
    }
    this.fileUploadService.uploadMultiImageOriginal(this.files)
      .subscribe(res => {
        const downloadUrls = res.downloadUrls;
        const data: ImageGallery[] = downloadUrls.map(m => {
          return {
            url: m,
            name: this.utilsService.getPopString(m),
            folder: this.selectedFolder,
          } as ImageGallery;
        });

        this.addImagesToGallery(data);

      }, error => {
        console.log(error);
      });
  }

  /**
   * HTTP REQ HANDLE
   */

  private addImagesToGallery(data: ImageGallery[]) {
    this.galleryService.addNewGalleryMultiData(data)
      .subscribe(res => {
        this.reloadService.needRefreshGallery$();
        this.dialogRef.close();
        // console.log(res.message);
      }, error => {
        console.log(error);
      });
  }


}
