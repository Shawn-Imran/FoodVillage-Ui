import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { DATABASE_KEY } from 'src/app/core/utils/global-variable';
import { CouponDiscountType } from 'src/app/enum/coupon-discount-type';
import { CouponType } from 'src/app/enum/coupon-type';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { ShippingCharge } from 'src/app/interfaces/shippingcharge';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/products.service';
import { ReloadService } from 'src/app/services/reload.service';
import { ShippingChargeService } from 'src/app/services/shipping-charge';
import { StorageService } from 'src/app/services/storage.service';
import { UiService } from 'src/app/services/ui.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserService } from 'src/app/services/user.service';
import { PricePipe } from 'src/app/shared/pipes/price.pipe';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [PricePipe]
})
export class CartComponent implements OnInit {

  carts: Cart[] = [];
  shippingChargeData: ShippingCharge = null;
  shippingCharge = 0;

  // Coupon
  couponText: string;
  finalDiscount = 0;


  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private reloadService: ReloadService,
    private userService: UserService,
    private uiService: UiService,
    private cartService: CartService,
    private productService: ProductService,
    private storageService: StorageService,
    private shippingService: ShippingChargeService,
    private pricePipe: PricePipe,
  ) {
  }

  ngOnInit(): void {
    this.reloadService.refreshCart$.subscribe(() => {
      this.getCartsItems();
    });
    this.getCartsItems();
    this.shippingCharge = 60;

  }

  // private getShippingCharge() {
  //   this.shippingService.getExtraPriceInfo()
  //     .subscribe(res => {
  //       this.shippingChargeData = res.data;
  //       if (this.shippingChargeData) {
  //         this.shippingCharge = this.shippingChargeData.deliveryInDhaka;
  //       }
  //       // this.inSideDhaka = res.data?.deliveryInDhaka;
  //       // this.outSideDhaka = res.data?.deliveryOutsideDhaka;
  //       // this.shippingCharge = res.data?.deliveryInDhaka;
  //     }, error => {
  //       console.log(error);
  //     });
  // }

  /**
   * HTTP REQ HANDLE
   * COUPON HANDLE
   */

  /**
   * HTTP REQ HANDLE
   */
  private getCartItemList() {
    this.cartService.getCartItemList()
      .subscribe(res => {
        this.carts = res.data;
        // window.scrollTo(0, 0);
      }, error => {
        console.log(error);
      });
  }

  private removeCartItem(cartId: string) {
    this.cartService.removeCartItem(cartId)
      .subscribe(() => {
        this.reloadService.needRefreshCart$();
      }, error => {
        console.log(error);
      });
  }

  private incrementCartQtyDB(cartId: string) {
    this.cartService.incrementCartQuantity(cartId)
      .subscribe(() => {
        this.reloadService.needRefreshCart$();
      }, error => {
        console.log(error);
      });
  }

  private decrementCartQtyDB(cartId: string) {
    this.cartService.decrementCartQuantity(cartId)
      .subscribe(() => {
        this.reloadService.needRefreshCart$();
      }, error => {
        console.log(error);
      });
  }



  /**
   * APPLY COUPON
   */


  /**
   * CART DATA
   */
  private getCartsItems() {

      this.getCartItemList();
   
  }

  // private getCarsItemFromLocal() {
  //   const items = this.cartService.getCartItemFromLocalStorage();

  //   if (items && items.length > 0) {
  //     const ids: string[] = items.map(m => m.product as string);
  //     console.log(ids);
  //     this.productService.getSpecificProductsById(ids, 'name  price size  quantity images')
  //       .subscribe(res => {
  //         const products = res.data;
  //         window.scrollTo(0, 0);
  //         if (products && products.length > 0) {
  //           this.carts = items.map(t1 => ({...t1, ...{product: products.find(t2 => t2._id === t1.product)}}));
  //           console.log(this.carts);
  //         }
  //       });
  //   } else {
  //     this.carts = [];
  //   }
  // }


  /**
   * CART FUNCTIONALITY
   */
  onDeleteCartItem(cartId: string, product: string) {
    if (this.userService.getUserStatus()) {
      this.removeCartItem(cartId);
    } else {
      this.cartService.deleteCartItemFromLocalStorage(product);
      this.reloadService.needRefreshCart$();
    }
  }


  /**
   * LOGICAL METHODS
   */

  incrementQty(cartId: string, index: number) {
    if (this.userService.getUserStatus()) {
      this.incrementCartQtyDB(cartId);
    } else {
      const data = this.cartService.getCartItemFromLocalStorage();
      if (data != null) {
        data[index].selectedQty = data[index].selectedQty + 1;
        localStorage.setItem(DATABASE_KEY.userCart, JSON.stringify(data));
        this.reloadService.needRefreshCart$();
      }
    }
  }

  decrementQty(cartId: string, index: number, sQty: number) {
    if (this.userService.getUserStatus()) {
      if (sQty === 1) {
        this.uiService.warn('Minimum quantity is 1');
        return;
      }
      this.decrementCartQtyDB(cartId);
    } else {
      const data = this.cartService.getCartItemFromLocalStorage();
      if (data[index].selectedQty === 1) {
        return;
      }
      if (data != null) {
        data[index].selectedQty = data[index].selectedQty - 1;
        localStorage.setItem(DATABASE_KEY.userCart, JSON.stringify(data));
        this.reloadService.needRefreshCart$();
      }
    }

  }


  /**
   * CALCULATION
   */


  // get couponCalculation(): number {
  //   const amount = this.couponData.couponAmount;
  //   if (this.couponData.couponType === 1) {
  //     if (this.couponData.couponDiscountType === 2) {
  //       this.finalDiscount = this.shippingCharge - amount;
  //       return this.finalDiscount;
  //     } else {
  //       return this.finalDiscount = amount;
  //     }
  //   } else {
  //     if (this.couponData.couponDiscountType === 1) {
  //       return this.finalDiscount = this.cartSubTotal * (amount / 100);
  //     } else if (this.couponData.couponDiscountType === 2) {
  //       return this.finalDiscount = this.shippingCharge * (amount / 100);
  //     } else {
  //       return this.finalDiscount = (this.cartSubTotal + this.shippingCharge) * (amount / 100);
  //     }
  //   }
  // }

  get cartSubTotal(): number {
    return this.carts.map(t => {
      return this.pricePipe.transform(t.product as Product, 'priceWithDiscount', t.selectedQty) as number;
    }).reduce((acc, value) => acc + value, 0);
  }

  // get totalCartAmount(): number {
  //   if (this.carts && this.carts.length > 0) {
  //     return this.carts.map((t: Cart) => {
  //       const product = t.product as Product;
  //       const totalCartAmount = product.price * t.selectedQty;
  //       return totalCartAmount;
  //     }).reduce((acc: any, value: any) => acc + value, 0);
  //   } else {
  //     return 0;
  //   }
  // }

  //
  // get totalAmount(): number {
  //   return this.carts.map(t => t.product.price * t.selectedQty).reduce((acc, value) => acc + value, 0);
  //   return 0;
  // }

  // get totalSave(): number {
  //   // const old = this.cartsItems.map(t => t.product.price * t.selectedQty).reduce((acc, value) => acc + value, 0);
  //   // return old - this.totalAmount;
  //   return 0;
  // }
  //


}
