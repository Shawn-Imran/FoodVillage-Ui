import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ImageFolder } from 'src/app/interfaces/image-folder';
import { ImageFolderService } from 'src/app/services/image-folder.service';
import { ReloadService } from 'src/app/services/reload.service';

@Component({
  selector: 'app-image-folder',
  templateUrl: './image-folder.component.html',
  styleUrls: ['./image-folder.component.scss']
})
export class ImageFolderComponent implements OnInit {

  folders: ImageFolder[] = [];

  constructor(
    private dialog: MatDialog,
    private imageFolderService: ImageFolderService,
    private reloadService: ReloadService
  ) { }

  ngOnInit(): void {
    this.reloadService.refreshImageFolder$
      .subscribe(() => {
        this.getAllImageFolderList();
      });
    this.getAllImageFolderList();
  }


  /**
   * COMPONENT DIALOG VIEW
   */
  //  public openConfirmDialog(data?: string) {
  //   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //     maxWidth: '400px',
  //     data: {
  //       title: 'Confirm Delete',
  //       message: 'Are you sure you want delete this folder name?'
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(dialogResult => {
  //     if (dialogResult) {
  //       this.deleteImageFolderData(data);
  //     }
  //   });
  // }

  /**
   * HTTP REQ HANDLE
   */

  private getAllImageFolderList() {
    this.imageFolderService.getAllImageFolderList()
      .subscribe(res => {
        this.folders = res.data;
      }, err => {
        console.log(err);
      });
  }

  private deleteImageFolderData(id: string) {
    this.imageFolderService.deleteImageFolderData(id)
      .subscribe(res => {
        console.log(res.message);
        this.reloadService.needRefreshImageFolder$();
      }, error => {
        console.log(error);
      });
  }


}
