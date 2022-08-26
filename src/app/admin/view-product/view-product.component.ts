import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  id!: string;
  product: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.viewPprduct();
      }
    });

  }


  viewPprduct(){
     this.productService.getPprduct(this.id)
      .subscribe(res => {
        console.log('data', res)
        this.product = res.data;
      }, error => console.log(error));
  }


  }



