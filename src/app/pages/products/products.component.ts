import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from 'src/app/interfaces/cart';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/products.service';
import { ReloadService } from 'src/app/services/reload.service';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @Input() product?: Product;
  products: Product[];
  constructor(private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private userService: UserService,
    private cartService: CartService,
    private reloadService: ReloadService,
    private uiService: UiService,
    ) { }

  ngOnInit(): void {
    this.productsList();
  }

  productsList(){
    this.productService.getAllProducts()
        .subscribe(res => {
          this.products= res.data;
        })
  }

  buy(){
    this.router.navigate(['/order']);
  }

  addToCart(){
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
}
