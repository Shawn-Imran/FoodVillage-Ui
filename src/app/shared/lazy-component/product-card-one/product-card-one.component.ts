import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ReloadService} from '../../../services/reload.service';
import {Cart} from '../../../interfaces/cart';
import {UserService} from '../../../services/user.service';
import {CartService} from '../../../services/cart.service';
import {UiService} from '../../../services/ui.service';
import {Product} from '../../../interfaces/product';
import {UserDataService} from '../../../services/user-data.service';
import {ProductService} from '../../../services/products.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-product-card-one',
  templateUrl: './product-card-one.component.html',
  styleUrls: ['./product-card-one.component.scss']
})
export class ProductCardOneComponent implements OnInit {

  @Input() data: any = null;
  @Input() product?: Product;
  dataOb: any;
  productId = null;
  private toCompareProduct: Product;

  // compareList: Product[] = []
  compareList: string[] = [];
  compareListFromDB: Product[] = [];
  ids: any[] = [];

  // EMPTY CHECK
  isEmpty = true;
  message: boolean;


  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private cartService: CartService,
    private reloadService: ReloadService,
    private uiService: UiService,
    private userDataService: UserDataService,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * CLICK With Event
   */

   addToCart(event: MouseEvent) {
    // event.stopPropagation();

    const data: Cart = {
      product: this.product?._id,
      selectedQty: 1,
    };

      this.addItemToCartDB(data);

    this.router.navigate(['/cart'])
  }

  // addToCompareList(event: MouseEvent, product: Product) {
  //   event.stopPropagation();
  //   this.productId = product._id;
  //   // this.getSingleProductById();
  //   // this.message = this.checkProductCategoryOfCompareList();
  //   // if (this.message === false) {
  //     // @ts-ignore
  //     this.productService.addToCompare(this.productId, product.category._id);
  //     this.reloadService.needRefreshCompareList$();
  //   // }else{
  //   //   this.uiService.warn('PLease select same category Product');
  //   // }
  // }



  /**
   * HTTP REQ
   */
  private getSingleProductById() {
    this.productService.getSingleProductById(this.productId)
      .subscribe(res => {
        this.toCompareProduct = res.data;
        console.log('Compare product', this.toCompareProduct);
      }, error => {
        console.log(error);
      });
  }

  // private checkProductCategoryOfCompareList() {
  //   this.getCompareList();
  //   let message = false;
  //   for (const data of this.compareListFromDB) {
  //     if (this.toCompareProduct.categorySlug === data.categorySlug) {
  //       message = true;
  //     }
  //     if (this.toCompareProduct.categorySlug !== data.categorySlug) {
  //       message = false;
  //       break;
  //     }
  //   }
  //   return message;
  // }

  // getCompareList() {
  //   this.spinner.show();
  //   this.compareList = this.productService.getCompareList();
  //   if (this.compareList && this.compareList.length > 0) {
  //     this.getCompareListFromDB();
  //   } else {
  //     this.spinner.hide();
  //     this.isEmpty = true;
  //   }
  // }

  // getCompareListFromDB() {
  //   this.productService.getSpecificProductsById(this.compareList, 'productName attributes productSlug category price discountType discountAmount quantity images shortDescription')
  //     .subscribe( res => {
  //       this.spinner.hide();
  //       this.compareListFromDB = res.data;

  //       this.isEmpty = false;
  //       console.log('compare List From DB: ', this.compareListFromDB);
  //     }, error => {
  //       this.spinner.hide();
  //       this.isEmpty = true;
  //       console.log(error);
  //     });
  // }


  /**
   * HTTP REQ HANDLE
   */

  addItemToCartDB(data: Cart) {
    this.cartService.addItemToUserCart(data)
      .subscribe(res => {
        // console.log(res);
        this.uiService.success(res.message);
        this.reloadService.needRefreshCart$();
      }, error => {
        console.log(error);
      });
  }


  onNavigate(url?: string) {
    this.router.navigate(['/product-details/' + this.product.productSlug]);

  }

  /**
   * OPEN COMPONENT DIALOG
   */



  ifLoggedIn() {
    return this.userService.getUserStatus();
  }

  /**
   * HTTP REQ HANDLE AND ONCLICK CHECK AND CALL ADD TO WISHLIST
   */

  // addItemToWishlistDB(data: WishlistSchema) {
  //   this.userDataService.addSingleItemToWishlist(data)
  //     .subscribe(res => {
  //       const mgsData = {
  //         message: 'This product added to your wishlist. Check it out here.',
  //         btnName: 'View Items',
  //         routerLink: '/account/wishlist',
  //         timeOut: 2000
  //       };
  //       this.uiService.bottomSheetSuccess(mgsData);
  //     }, error => {
  //       console.log(error);
  //     });
  // }

  // addToWishlistItemAfterCheck() {
  //   this.userDataService.checkStatusInWishlistWithBookId(this.product._id)
  //     .subscribe(res => {
  //       // const count = res.data;
  //       const exists = res.exists;

  //       if (this.userService.getUserStatus()) {
  //         // if (count === 0) {
  //         if (!exists) {
  //           const data: WishlistSchema = {
  //             product: this.product?._id
  //           };
  //           this.addItemToWishlistDB(data);
  //         } else {
  //           // WARNING MESSAGE FOR REGISTERED USER THAT ITEM ALREADY EXISTS
  //           this.uiService.warn(res.message);
  //         }
  //       }
  //     }, error => {
  //       console.log(error);
  //     });
  // }

}
