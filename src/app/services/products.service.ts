import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Pagination } from '../interfaces/pagination';
import { Product } from '../interfaces/product';

const API_PRODUCT = environment.apiBaseLink + '/api/admin/products/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(
    private httpClient: HttpClient,
    private router: Router,
    ) { }


    getAllProducts( ){
      return this.httpClient.get<{success: boolean; data: Product[]; count: number}>(API_PRODUCT+ 'get-all-products')
    }


    deleteProductById(id: string) {
      return this.httpClient.delete<{ message: string }>(API_PRODUCT + 'delete-product-by-id/' + id);
    }



    addSingleProduct(data: any){
      console.log(data);
      return this.httpClient.post<{ message: string }>(API_PRODUCT + 'add-product', data);
    };

    editproduct(data: any){
      console.log(data);
      return this.httpClient.put<{ message: string }>(API_PRODUCT + 'edit-product-by-id', data);
    };

    getPprduct(id: string) {
      return this.httpClient.get<{ data: any, message: string }>(API_PRODUCT + '/get-product-by-product-id/' + id);
    };

    postProduct( data: any ){
      return this.httpClient.post<{success: boolean; data: Product[]; count: number}>(API_PRODUCT + '/add-product', data);
    };

    getSingleProductById(id: string) {
      return this.httpClient.get<{ data: any, message: string }>(API_PRODUCT + '/get-product-by-product-id/' + id);
    };

    editProductById(data: any) {
      return this.httpClient.put<{ message: string }>(API_PRODUCT + '/edit-product-by-id', data);
    }



    getSpecificProductsById(ids: string[], select?: string) {
      return this.httpClient.post<{ data: Product[] }>(API_PRODUCT + 'get-specific-products-by-ids', {ids, select});
    }

    prodictsList(paginate: Pagination) {
      return this.httpClient.post<{ data: Product[], count: number, message: string }>(API_PRODUCT + 'productsList', {paginate});
    }
}
