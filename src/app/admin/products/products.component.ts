import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  products: Product[];
  currentPage: number = 1;
  // products = ELEMENT_DATA;
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private router: Router
    ) { }

    ngOnInit(): void {

      this.productsList();

    // this.reloadService.refreshProduct$
    //   .subscribe(() => {
    //     this.getAllProducts();
    //   });
    // // this.dataSource = this.products;
    // this.getAllProducts();
  }


  productsList(){
    this.productService.getAllProducts()
        .subscribe(res => {
          this.products= res.data;
        })
  }


  add_product(){
    this.router.navigate(['/admin/products/add-product']);
  }
  
  // edit_product(product){
  //   this.router.navigate(['/admin/products/edit-product', product._id]);
  // }
  // view_product(product){
  //   this.router.navigate(['view-product', product._id]);
  // }

  delete_product(productId: string){
    this.productService.deleteProductById(productId)
      .subscribe(res => {
        console.log(res.message);
        this.productsList();
      }, error => {
        console.log(error);
      });
  }

}
