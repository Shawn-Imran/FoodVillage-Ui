import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {UploadImageComponent} from './upload-image/upload-image.component';
import {debounceTime, distinctUntilChanged, pluck, switchMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {ImageGallery} from '../../../interfaces/image-gallery';
import {GalleryService} from '../../../services/gallery.service';
import {ReloadService} from '../../../services/reload.service';
import {FileUploadService} from '../../../services/file-upload.service';
import {Pagination} from '../../../interfaces/pagination';
import {ImageFolderService} from '../../../services/image-folder.service';
import {ImageFolder} from '../../../interfaces/image-folder';
import {MatSelectChange} from '@angular/material/select';
import {NgxSpinnerService} from 'ngx-spinner';
import {UtilsService} from '../../../services/utils.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit, AfterViewInit {

  // Pagination
  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 24;
  totalProductsStore = 0;

  // SEARCH AREA
  searchProducts: any[] = [];
  overlay = false;
  isLoading = false;
  searchQuery = null;
  @ViewChild('searchForm') searchForm?: NgForm;
  @ViewChild('searchInput') searchInput?: ElementRef;

  // SELECTED IMAGE
  selectedImages: ImageGallery[] = [];
  selectPreview?: ImageGallery;


  private holdPrevData: any[] = [];
  images: ImageGallery[] = [];
  folders: ImageFolder[] = [];
  selectedFolder = null;

  // Query
  queryFolder: string = null;

  // Data Form
  dataForm?: FormGroup;

  // Redirect From
  redirectUrl?: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private galleryService: GalleryService,
    private reloadService: ReloadService,
    private fileUploadService: FileUploadService,
    private imageFolderService: ImageFolderService,
    public utilsService: UtilsService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {

    // GET PAGE FROM QUERY PARAM
    this.activatedRoute.queryParams.subscribe(qParam => {
      if (qParam && qParam.page) {
        this.currentPage = qParam.page;
      } else {
        this.currentPage = 1;
      }
      this.getAllGalleryList();
    });

    this.reloadService.refreshGallery$
      .subscribe(() => {
        this.getAllGalleryList();
      });

    // Get Gallery Data
    this.getAllImageFolderList();
    // this.getAllGalleryList();

    // Data Form for Edit Image Info
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      folder: [null, Validators.required],
    });

    // Image From state
    if (history.state.url) {
      this.redirectUrl = history.state.url;
    }

  }


  /**
   * SEARCH
   */
  ngAfterViewInit(): void {
    const formValue = this.searchForm?.valueChanges;

    formValue?.pipe(
      pluck('searchTerm'),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(data => {
        this.searchQuery = data;
        if (!this.searchQuery) {
          this.overlay = false;
          this.searchProducts = [];
          this.images = this.holdPrevData;
          this.totalProducts = this.totalProductsStore;
          this.searchQuery = null;
          return EMPTY;
        }
        this.isLoading = true;
        const pagination: Pagination = {
          pageSize: this.productsPerPage.toString(),
          currentPage: this.currentPage.toString()
        };
        return this.galleryService.getSearchImages(data, pagination);
      })
    )
      .subscribe(res => {
        this.isLoading = false;
        this.searchProducts = res.data;
        this.images = this.searchProducts;
        this.totalProducts = res.count;
        this.currentPage = 1;
        this.router.navigate([], {queryParams: {page: this.currentPage}});
      }, () => {
        this.isLoading = false;
      });
  }

  /**
   * PATCH IMAGE INFO
   */
  private setImageDataForm(data: any) {
    this.dataForm?.patchValue(data);
  }

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


  private getAllGalleryList() {
    this.spinner.show();
    const pagination: Pagination = {
      pageSize: this.productsPerPage.toString(),
      currentPage: this.currentPage.toString()
    };
    this.galleryService.getAllGalleryList(pagination, this.queryFolder ? this.queryFolder : null)
      .subscribe(res => {
        this.images = res.data;
        this.holdPrevData = res.data;
        this.totalProducts = res.count;
        this.totalProductsStore = res.count;
        this.spinner.hide();
        window.scrollTo(0, 0);
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }

  private editGalleryData(data: ImageGallery) {
    this.galleryService.editGalleryData(data)
      .subscribe(res => {
        this.reloadService.needRefreshGallery$();
      }, error => {
        console.log(error);
      });
  }


  /**
   * PAGINATION CHANGE
   */
  public onPageChanged(event: any) {
    this.router.navigate([], {queryParams: {page: event}});
  }

  /**
   * ON SELECT IMAGE
   */

  onSelectImage(image: any) {
    const index = this.selectedImages.findIndex(x => x._id === image._id);


    if (index === -1) {
      this.selectedImages.push(image);
      // Set Preview Image
      const i = this.selectedImages.length - 1;
      this.selectPreview = this.selectedImages[i];
      const folder = this.selectPreview.folder as ImageFolder;
      const dataFolder = this.folders.find(f => f._id === folder._id);
      this.setImageDataForm({name: this.selectPreview.name, folder: dataFolder});

      if (this.selectedImages.length === 1) {
      } else {
        this.setImageDataForm({});
      }

    } else {
      this.removeSelectImage(image);
    }

  }

  checkSelected(image: any) {
    const index = this.selectedImages.findIndex(x => x._id === image._id);
    return index === -1;

  }


  removeSelectImage(s: ImageGallery, event?: any) {
    if (event) {
      event.stopPropagation();
    }
    const index = this.selectedImages.findIndex(x => x._id === s._id);
    this.selectedImages.splice(index, 1);
    const i = this.selectedImages.length - 1;
    if (i >= 0) {
      this.selectPreview = this.selectedImages[i];
      const folder = this.selectPreview.folder as ImageFolder;
      const dataFolder = this.folders.find(f => f._id === folder._id);
      this.setImageDataForm({name: this.selectPreview.name, folder: dataFolder});
    } else {
      this.selectPreview = undefined;
    }
  }

  /**
   *  DIALOG
   */
  public openComponentDialog(data?: ImageFolder[]) {
    this.dialog.open(UploadImageComponent, {
      data,
      panelClass: ['theme-dialog', 'dialog-no-radius'],
      maxWidth: '800px',
      maxHeight: '580px',
      height: '100%',
      width: '100%',
      autoFocus: false,
      disableClose: false,
    });
  }

  /**
   * DELETE IMAGE PERMANENT
   */
  deleteImages() {
    const dbIds = this.selectedImages.map(m => m._id) as string[];
    const fileUrls = this.selectedImages.map(m => m.url) as string[];

    this.galleryService.deleteGalleryDataMulti(dbIds)
      .subscribe(res => {
        this.fileUploadService.removeFileMultiArray(fileUrls)
          .subscribe(res2 => {
            this.reloadService.needRefreshGallery$();
            this.selectedImages = [];
          });
      }, error => {
        console.log(error);
      });
  }


  onImageDataUpdate() {
    if (this.dataForm?.invalid) {
      return;
    }
    const folder = this.dataForm?.value.folder;
    const finalData = {...this.dataForm?.value, ...{folder: folder._id}, ...{_id: this.selectedImages[0]._id}};
    this.editGalleryData(finalData);

  }

  selectPreviewImage(s: ImageGallery) {
    this.selectPreview = s;
    this.setImageDataForm({name: this.selectPreview.name, folder: this.selectPreview.folder});
  }

  /**
   * DE SELECT IMAGE
   */
  deselectAll() {
    this.selectedImages = [];
    this.selectPreview = undefined;
    this.setImageDataForm({});
    this.searchQuery = null;
    this.searchProducts = [];
    this.searchForm?.resetForm();
    this.queryFolder = null;
    this.router.navigate([], {queryParams: {page: 1}});
  }

  onFilterSelectChange(event: MatSelectChange) {
    this.queryFolder = event.value;
    if (this.currentPage > 1) {
      this.router.navigate([], {queryParams: {page: 1}});
    } else {
      this.getAllGalleryList();
    }
  }


}
