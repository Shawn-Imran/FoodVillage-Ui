import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Cart} from '../../../../interfaces/cart';
import {ProductService} from '../../../../services/product.service';
import {UtilsService} from '../../../../services/utils.service';
import {UserDataService} from '../../../../services/user-data.service';
import {UserService} from '../../../../services/user.service';
import {ReloadService} from '../../../../services/reload.service';
import {ActivatedRoute} from '@angular/router';
import {CarouselCtrService} from '../../../../services/carousel-ctr.service';
import {UiService} from '../../../../services/ui.service';
import {Product} from '../../../../interfaces/product';
import {CartService} from '../../../../services/cart.service';
import {ReviewControlService} from '../../../../services/review-control.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-quick-view-dialog',
  templateUrl: './quick-view-dialog.component.html',
  styleUrls: ['./quick-view-dialog.component.scss']
})
export class QuickViewDialogComponent implements OnInit {

  // All Product
  product: Product = null;
  productSlug: string = null;
  // Image Zoom & View Area
  @ViewChild('zoomViewer', {static: true}) zoomViewer;
  image: any;
  zoomImage: any;

  // Quantity
  selectedQty = 1;

  // CARTS
  carts: Cart[] = [];
  existsInCart = false;

  // Image Loader
  isImgLoaded = false;
  isSmImgLoad = false;

  // View Container
  viewPolicy = 'delivery';


  constructor(
    private productService: ProductService,
    private utilsService: UtilsService,
    private userDataService: UserDataService,
    private userService: UserService,
    private reloadService: ReloadService,
    private activatedRoute: ActivatedRoute,
    public carouselCtrService: CarouselCtrService,
    public uiService: UiService,
    private cartService: CartService,
    private reviewControlService: ReviewControlService,
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<QuickViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {

    if (this.data && this.data.viewProduct) {
      this.productSlug = this.data.viewProduct.productSlug;
      this.getSingleProductBySlug();
    }

    this.reloadService.refreshCart$.subscribe(() => {
      this.getCartsItems();
    });

  }


  /**
   * HTTP REQ HANDLE
   */

  private getSingleProductBySlug() {
    this.spinner.show();
    this.productService.getSingleProductBySlug(this.productSlug)
      .subscribe(res => {
        this.product = res.data;
        if (this.product) {
          this.setDefaultImage();
          this.getCartsItems();
        }
        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }


  addItemToCartDB(data: Cart) {
    this.userDataService.addItemToUserCart(data)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshCart$();
      }, error => {
        console.log(error);
      });
  }

  /**
   * IMAGE ZOOM & VIEW AREA
   */
  public onMouseMove(e) {
    if (window.innerWidth >= 1099) {
      const image = e.currentTarget;
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;
      const x = offsetX / image.offsetWidth * 100;
      const y = offsetY / image.offsetHeight * 100;
      const zoom = this.zoomViewer.nativeElement.children[0];
      if (zoom) {
        zoom.style.backgroundPosition = x + '% ' + y + '%';
        zoom.style.display = 'block';
        zoom.style.height = image.height + 'px';
        zoom.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event) {
    this.zoomViewer.nativeElement.children[0].style.display = 'none';
  }

  public selectImage(image: any) {
    this.image = image;
    this.zoomImage = image;
  }

  private setDefaultImage() {
    // this.image = this.product.images !== null ? this.product.images[0].big : '/assets/images/junk/Nokia 3310.jpg';
    this.image = this.product.images && this.product.images.length > 0 ? this.product.images[0] : '/assets/images/placeholder/test.png';
    // this.zoomImage = this.product.images[0].big;
    this.zoomImage = this.image;
  }


  /**
   * QUANTITY CONTROL
   */

  incrementQty() {
    this.selectedQty += 1;
  }

  decrementQty() {
    if (this.selectedQty === 1) {
      this.uiService.warn('Minimum Quantity is selected');
      return;
    }
    this.selectedQty -= 1;
  }

  /**
   * CART FUNCTIONALITY
   */

  addToCart() {
    const data: Cart = {
      product: this.product?._id,
      selectedQty: this.selectedQty,
    };


    if (this.userService.getUserStatus()) {
      this.addItemToCartDB(data);
    } else {
      this.cartService.addCartItemToLocalStorage(data);
      this.reloadService.needRefreshCart$();
    }
  }

  // GET CARTS DATA
  private getCartsItems() {
    if (this.userService.getUserStatus()) {
      this.getCartItemList();
    } else {
      this.getCarsItemFromLocal();
    }

  }

  private getCartItemList() {
    this.cartService.getCartItemList()
      .subscribe(res => {
        this.carts = res.data;
        // @ts-ignore
        const existsOnCart = this.carts.find(item => item.product._id === this.product._id);
        if (existsOnCart) {
          this.existsInCart = true;
          this.selectedQty = existsOnCart.selectedQty;
        }
      }, error => {
        console.log(error);
      });
  }

  private getCarsItemFromLocal() {
    const items = this.cartService.getCartItemFromLocalStorage();

    if (items && items.length > 0) {
      const ids: string[] = items.map(m => m.product as string);
      this.productService.getSpecificProductsById(ids, 'productName productSlug  price discountType discountAmount  quantity images')
        .subscribe(res => {
          const products = res.data;
          if (products && products.length > 0) {
            this.carts = items.map(t1 => ({...t1, ...{product: products.find(t2 => t2._id === t1.product)}}));
            // @ts-ignore
            const existsOnCart = this.carts.find(item => item.product._id === this.product._id);
            if (existsOnCart) {
              this.existsInCart = true;
              this.selectedQty = existsOnCart.selectedQty;
            }
          }
        });
    } else {
      this.carts = [];
    }
  }


}

