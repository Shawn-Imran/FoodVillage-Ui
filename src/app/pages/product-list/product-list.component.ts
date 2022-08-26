import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Pagination} from '../../interfaces/pagination';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  // SUBSCRIPTION
  querySubscribe: Subscription = null;
  paramSubscribe: Subscription = null;
  private subProductService : Subscription;
  private subProductServiceOne : Subscription;
  private subProductServiceTwo : Subscription;


  attributes: any[] = [];
  products: any[] = [];
  tags: any[] = [];

  // View Type
  viewType = 'grid';

  // Params
  // Price Range
  minPrice: number = null;
  maxPrice: number = null;
  rangeSet = false;
  priceRange: { min: number; max: number } = {min: 0, max: 0};
  minView = 0;
  maxView = 0;

  // Pagination
  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 12;

  query: any[] = [];
  query2: any[] = [];
  query3: any[] = [];
  // {
  //   pageSize: this.productsPerPage,
  //   currentPage: this.currentPage
  // }
  paginate: Pagination = null;
  select = 'productName images productSlug price discountType ratingReview discountAmount category brandSlug categorySlug brand sku subCategorySlug tags quantity campaignStartDate campaignEndDate campaignStartTime campaignEndTime';

  // MOBILE FILTER DIALOG
  @ViewChild('dialogFilter') dialogFilter: any;

  // Breadcrumb
  // breadcrumbs: Breadcrumb[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {


    // PARAM SUBSCRIBE
    this.paramSubscribe = this.activatedRoute.paramMap.subscribe(param => {


      // QUERY SUBSCRIBE
      this.querySubscribe = this.activatedRoute.queryParams.subscribe(param2 => {

        if (param2.page) {
          this.currentPage = param2.page;
        } else {
          this.currentPage = 1;
        }

      });


    });

    this.getAllProduct();
    // this.productFilterByQuery(this.query);
    // console.log(this.router.url);
  }

  /**
   * PRICE RANGE
   */




  /**
   * OPEN FILTER DIALOG
   */

  public openTemplateDialog(data?: any) {
    this.dialog.open(this.dialogFilter, {
      data,
      panelClass: ['theme-dialog', 'dialog-no-radius'],
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      autoFocus: false,
      disableClose: false,
    });
  }


  /**
   * HTTP REQ HANDLE
   */

   getAllProduct(){
    this.productService.getAllProducts()
        .subscribe(res => {
          this.products= res.data;
        })
  }

  // private getAllProduct() {
  //   const pagination: Pagination = {
  //     currentPage: String(this.currentPage),
  //     pageSize: String(this.productsPerPage)
  //   };
  //   this.subProductService = this.productService.prodictsList(pagination)
  //     .subscribe(res => {
  //       this.products = res.data;
  //       console.log(this.products)
  //       this.totalProducts = res.count;
  //       // const min = res.priceRange.minPrice;
  //       // const max = res.priceRange.maxPrice;

  //       // console.log(this.products);
  //     }, error => {
  //       console.log(error);
  //     });
  // }




  // private getBrandAttributes() {
  //   this.brandService.getBrandByBrandID(this.brandSlug)
  //     .subscribe(res => {
  //       this.attributes = res.data;
  //
  //       console.log(this.attributes);
  //       // console.log(this.attributes);
  //
  //     }, error => {
  //       console.log(error);
  //     });
  // }


  // private getAttributes() {
  //   this.attributeService.getAttributesByAttributeIds(this.subCategorySlug)
  //     .subscribe(res => {
  //       this.attributes = res.data;
  //     }, error => {
  //       console.log(error);
  //     });
  // }

  /**
   * ON FILTER CHANGE
   */





  /**
   * NGX PAGINATION CHANGED
   */

  // public onChangePage(event: number) {
  //   this.router.navigate([], {queryParams: {page: event}});
  //   // this.router.navigate([], {queryParams: {page: 1}});
  // }


  /**
   * Breadcrumb CUSTOM
   */


  /**
   * CHANGE VIEW TYPE
   */
  onChangeViewType(type: string) {
    this.viewType = type;
  }

  // ngOnDestroy(): void {
  //   if (this.paramSubscribe) {
  //     this.paramSubscribe.unsubscribe();
  //   }
  //   if (this.querySubscribe) {
  //     this.querySubscribe.unsubscribe();
  //   }
  //   if (this.subProductService) {
  //     this.subProductService.unsubscribe();
  //   }
  //   if (this.subProductServiceOne) {
  //     this.subProductServiceOne.unsubscribe();
  //   }
  //   if (this.subProductServiceTwo) {
  //     this.subProductServiceTwo.unsubscribe();
  //   }
  // }

}
