import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {QuickViewDialogComponent} from './quick-view-dialog/quick-view-dialog.component';
import {ReloadService} from '../../../services/reload.service';
import {Cart} from '../../../interfaces/cart';
import {UserService} from '../../../services/user.service';
import {CartService} from '../../../services/cart.service';
import {UiService} from '../../../services/ui.service';
import {Product} from '../../../interfaces/product';
import {WishlistSchema} from '../../../interfaces/wishlist';
import {UserDataService} from '../../../services/user-data.service';
import {ProductService} from "../../../services/product.service";

@Component({
  selector: 'app-grid-card',
  templateUrl: './grid-card.component.html',
  styleUrls: ['./grid-card.component.scss']
})
export class GridCardComponent implements OnInit {

  @Input() data: any = null;
  @Input() product?: Product;
  dataOb: any;
  productId = null;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private cartService: CartService,
    private reloadService: ReloadService,
    private uiService: UiService,
    private userDataService: UserDataService,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    // console.log('product', this.product);
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


    if (this.userService.getUserStatus()) {
      this.addItemToCartDB(data);
    } else {
      this.cartService.addCartItemToLocalStorage(data);
      this.reloadService.needRefreshCart$();
    }
  }

  addToCompareList(event: MouseEvent, product: Product) {
    event.stopPropagation();
    this.productId = product._id;
    this.productService.addToCompare(this.productId);
    this.reloadService.needRefreshCompareList$();
  }


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
    this.router.navigate(['/product-details/' + this.product.name]);
  }

  /**
   * OPEN COMPONENT DIALOG
   */

  public openComponentDialog(data?: any) {
    this.dialog.open(QuickViewDialogComponent, {
      data,
      panelClass: ['theme-dialog', 'full-screen-modal'],
      autoFocus: false,
      disableClose: false
    });
  }

  ifLoggedIn() {
    return this.userService.getUserStatus();
  }

  /**
   * HTTP REQ HANDLE AND ONCLICK CHECK AND CALL ADD TO WISHLIST
   */

  addItemToWishlistDB(data: WishlistSchema) {
    this.userDataService.addSingleItemToWishlist(data)
      .subscribe(res => {
        const mgsData = {
          message: 'This product added to your wishlist. Check it out here.',
          btnName: 'View Items',
          routerLink: '/account/wishlist',
          timeOut: 2000
        };
        this.uiService.bottomSheetSuccess(mgsData);
      }, error => {
        console.log(error);
      });
  }

  addToWishlistItemAfterCheck() {
    this.userDataService.checkStatusInWishlistWithBookId(this.product._id)
      .subscribe(res => {
        // const count = res.data;
        const exists = res.exists;

        if (this.userService.getUserStatus()) {
          // if (count === 0) {
          if (!exists) {
            const data: WishlistSchema = {
              product: this.product?._id
            };
            this.addItemToWishlistDB(data);
          } else {
            // WARNING MESSAGE FOR REGISTERED USER THAT ITEM ALREADY EXISTS
            this.uiService.warn(res.message);
          }
        }
      }, error => {
        console.log(error);
      });
  }

}
