import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  public dataForm?: FormGroup;
  id!: string;
  product: any;




  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService

  ) { }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      name: [null, Validators.required],
      size: [null, Validators.required],
      price: [null, Validators.required],

    });

    this.route.paramMap.subscribe((param) => {
      this.id = param.get('id');
      if (this.id) {
        this.productService.getPprduct(this.id)
        .subscribe(res => {
        console.log('data', res)
        this.product = res.data;
        this.setFormData();
      }, error => console.log(error));
      }
    });
  }

  private setFormData() {
    this.dataForm.patchValue(this.product);

  }


  onSubmit() {
    const finalData = {...this.dataForm.value, ...{_id: this.product._id}};
      this.editProduct(finalData);
  }

  private editProduct(data: any) {

    this.productService.editProductById(data)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/admin/products']);
      }, error => {
        console.log(error);
      });
  }


  // editProduct(){

  //   let product = {
  //     name: this.dataForm.value.name,
  //     size: this.dataForm.value.size,
  //     price: this.dataForm.value.price,

  //   };

  //   this.productService.addproduct(product).subscribe(
  //     res => {

  //       console.log(res);
  //       // localStorage.setItem('token', res.token);
  //       this.router.navigate(['/admin/products']);
  //   },err => {
  //       console.log(err);
  //   })


  // };


}
