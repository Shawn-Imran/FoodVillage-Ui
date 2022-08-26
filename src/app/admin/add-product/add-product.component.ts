import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { HttpStatusCodeEnum } from 'src/app/enum/http-status-code.enum';
import { ImageGallery } from 'src/app/interfaces/image-gallery';
import { ProductAttribute } from 'src/app/interfaces/product-attribute';
import { ProductService } from 'src/app/services/products.service';
import { StorageService } from 'src/app/services/storage.service';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ImageGalleryDialogComponent } from '../image-gallery-dialog/image-gallery-dialog.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  private sub?: Subscription;
  private subRouteOne?: Subscription;
  private subDataOne?: Subscription;
  private subDataTwo?: Subscription;
  private subDataThree?: Subscription;
  private subDataFour?: Subscription;
  private subDataFive?: Subscription;

  public dataForm: FormGroup;
  chooseImage?: string[] = [];
  filterDataArray?: FormArray;
  autoSlug = true;

  @ViewChild('formTemplate') formTemplate: NgForm;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private utilsService: UtilsService,
    private uiService: UiService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private storageService: StorageService,
    ) { }


  ngOnInit(): void {
    this.initFormGroup();

  }


  private initFormGroup() {

    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      productSlug: [null, Validators.required],
      size: [null, Validators.required],
      price: [null, Validators.required],
      images: [null],
    });
    // this.filterDataArray = this.dataForm.get('filterData') as FormArray;
  }



  addProduct(){


    if (this.dataForm.invalid) {
      console.log('Please complete all the required field');
      return;
    }
    const rawData = this.dataForm.value;
    const images = this.chooseImage;
    const mData = {
      images
    };
    const finalData = {
      ...rawData,
      ...mData
    };

    // console.log(finalData);


      this.addSingleProduct(finalData);

    // let product = {
    //   name: this.dataForm.value.name,
    //   size: this.dataForm.value.size,
    //   price: this.dataForm.value.price,

    // };

    // this.productService.addproduct(product).subscribe(
    //   res => {

    //     console.log(res);
    //     // localStorage.setItem('token', res.token);
    //     this.router.navigate(['/admin/products']);
    // },err => {
    //     console.log(err);
    // })
    this.router.navigate(['/admin/products'])
  };

  private addSingleProduct(data: any) {
    this.productService.addSingleProduct(data)
      .subscribe(res => {
        this.spinner.hide();
        this.uiService.success(res.message);
        this.storageService.removeSessionData('PRODUCT_INPUT');
        // this.resetForm();
      }, error => {
        this.spinner.hide();
        if (error.error.statusCode === HttpStatusCodeEnum.EXISTS_OR_NOT_ACCEPT) {
          this.dataForm.controls.productSlug.setErrors({incorrect: true});
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
        console.log(error);
      });
  }



  public openComponentDialog() {
    const dialogRef = this.dialog.open(ImageGalleryDialogComponent, {
      panelClass: ['theme-dialog', 'full-screen-modal-lg'],
      width: '100%',
      minHeight: '100%',
      autoFocus: false,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        if (dialogResult.data && dialogResult.data.length > 0) {
          this.getPickedImages(dialogResult.data);
        }
      }
    });
  }


  /**
   * GET IMAGE DATA FROM STATE
   */
  private getPickedImages(images: ImageGallery[]) {
    if (this.chooseImage && this.chooseImage.length > 0) {
      const nImages = images.map(m => m.url);
      this.chooseImage = this.utilsService.mergeArrayString(nImages, this.chooseImage);
    } else {
      this.chooseImage = images.map(m => m.url);
    }
    this.dataForm.patchValue(
      {images: this.chooseImage}
    );
  }

}
