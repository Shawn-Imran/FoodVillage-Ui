import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../interfaces/product';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../services/user.service';
import {CartService} from '../../../services/cart.service';
import {ReloadService} from '../../../services/reload.service';
import {UiService} from '../../../services/ui.service';
import {Cart} from '../../../interfaces/cart';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-product-card-admin',
  templateUrl: './product-card-admin.component.html',
  styleUrls: ['./product-card-admin.component.scss']
})
export class ProductCardAdminComponent implements OnInit {

  adminUrl = environment.adminBaseUrl;

  @Input() product?: Product;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private userService: UserService,
    private cartService: CartService,
    private reloadService: ReloadService,
    private uiService: UiService
  ) { }


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

    if (this.userService.getUserStatus()) {
      // console.log('User Logged in');
      this.addItemToCartDB(data);
    } else {
      // console.log('User NOT Logged in');
      this.cartService.addCartItemToLocalStorage(data);
      this.reloadService.needRefreshCart$();
    }
  }


  /**
   * HTTP REQ HANDLE
   */

  addItemToCartDB(data: Cart) {
    this.cartService.addItemToUserCart(data)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshCart$();
      }, error => {
        console.log(error);
      });
  }


  onNavigate(url?: string) {
    this.router.navigate(['/product-details/' + this.product.productSlug]);
  }


}
