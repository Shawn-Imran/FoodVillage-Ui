import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSelect, MatSelectChange} from '@angular/material/select';
import {EMPTY, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
// import {UpdateOrderStatusComponent} from './update-order-status/update-order-status.component';
import {debounceTime, distinctUntilChanged, pluck, switchMap} from 'rxjs/operators';
import { DownloadJsonDialogComponent } from 'src/app/shared/dialog-view/download-json-dialog/download-json-dialog.component';
import {MatCheckbox, MatCheckboxChange} from '@angular/material/checkbox';
import { OrderStatus } from 'src/app/enum/order-status';
import { Order, OrderItem } from 'src/app/interfaces/order';
import { ProductCategory } from 'src/app/interfaces/product-category';
import { OrderService } from 'src/app/services/order.service';
import { ReloadService } from 'src/app/services/reload.service';
import { UiService } from 'src/app/services/ui.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/ui/confirm-dialog/confirm-dialog.component';
import { OrderStatusPipe } from 'src/app/shared/pipes/order-status.pipe';
import { UpdateCheckboxOrderStatusComponent } from './update-checkbox-order-status/update-checkbox-order-status.component';
import { UpdateOrderStatusComponent } from './update-order-status/update-order-status.component';
import { Pagination } from 'src/app/interfaces/pagination';

export interface OrderFilter {
  deliveryStatus?: number;
  checkoutDate?: any;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrderStatusPipe]
})
export class OrdersComponent implements OnInit, AfterViewInit, OnDestroy {


  private subAcRoute: Subscription;

  public orderEnum = OrderStatus;

  // Selected Data
  selectedIds: string[] = [];
  @ViewChild('matCheckbox') matCheckbox: MatCheckbox;

  // Store Data
  orders: Order[] = [];
  private holdPrevData: Order[] = [];

  private subForm: Subscription;

  // Pagination
  currentPage = 1;
  totalProducts = 0;
  productsPerPage = 15;
  totalProductsStore = 0;

  orderStatus: any[] = [
    {value: null, viewValue: 'None'},
    {value: OrderStatus.PENDING, viewValue: 'Pending'},
    {value: OrderStatus.CONFIRM, viewValue: 'Confirm'},
    {value: OrderStatus.PROCESSING, viewValue: 'Processing'},
    {value: OrderStatus.SHIPPING, viewValue: 'Shipping'},
    {value: OrderStatus.DELIVERED, viewValue: 'Delivered'},
    {value: OrderStatus.CANCEL, viewValue: 'Cancel'},
    {value: OrderStatus.REFUND, viewValue: 'Refund'},
  ];

  // Filter Date Range
  startDate?: string;
  endDate?: string;

  // Form Group
  dataFormRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  // Data Filtering
  isFiltering = false;

  // Max & Min Data
  today = new Date();
  // QUERY
  filterQuery: OrderFilter = null;

  // SEARCH AREA
  searchProducts: Order[] = [];
  isLoading = false;
  isSelect = false;
  searchQuery = null;
  @ViewChild('searchForm') searchForm: NgForm;
  @ViewChild('searchInput') searchInput: ElementRef;

  @ViewChild('matSelectFilter') matSelectFilter: MatSelect;

  // DOWNLOADABLE
  dataTypeFormat = 'excel';

  constructor(
    private dialog: MatDialog,
    private orderService: OrderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private uiService: UiService,
    private utilsService: UtilsService,
    private reloadService: ReloadService,
    private orderStatusPipe: OrderStatusPipe,
  ) {
  }

  ngOnInit(): void {
    this.reloadService.refreshOrder$
      .subscribe(() => {
        this.getAllOrdersByAdmin();
      });

    this.subAcRoute = this.activatedRoute.queryParams.subscribe(qParam => {
      if (qParam && qParam.page) {
        this.currentPage = qParam.page;
      } else {
        this.currentPage = 1;
      }
      if (!this.searchProducts.length) {
        this.getAllOrdersByAdmin();
      }
    });

  }

  ngAfterViewInit(): void {
    const formValue = this.searchForm.valueChanges;

    this.subForm = formValue.pipe(
      // map(t => t.searchTerm)
      // filter(() => this.searchForm.valid),
      pluck('searchTerm'),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(data => {
        this.searchQuery = data;
        if (this.searchQuery === '' || this.searchQuery === null ) {
          this.searchProducts = [];
          this.orders = this.holdPrevData;
          this.totalProducts = this.totalProductsStore;
          this.searchProducts = [];
          this.searchQuery = null;
          return EMPTY;
        }
        this.isLoading = true;
        const pagination: Pagination = {
          pageSize: this.productsPerPage.toString(),
          currentPage: this.currentPage.toString()
        };
        return this.orderService.getOrdersBySearch(data, pagination);
        // return this.orderService.getOrdersBySearch(data);
      })
    )
      .subscribe(res => {
        this.isLoading = false;
        this.searchProducts = res.data;
        this.orders = this.searchProducts;
        this.totalProducts = res.count;
        this.currentPage = 1;
        this.router.navigate([], {queryParams: {page: this.currentPage}});
      }, error => {
        this.isLoading = false;
      });
  }

  private getAllOrdersByAdmin() {
    this.spinner.show();

    const pagination: Pagination = {
      pageSize: this.productsPerPage.toString(),
      currentPage: this.currentPage.toString()
    };

    this.orderService.getAllOrdersByAdmin(pagination, null, this.filterQuery)
    // this.orderService.getAllOrdersByAdmin( null, this.filterQuery)
      .subscribe(res => {
        this.spinner.hide();
        // console.log(res.data);
        this.orders = res.data;

        if (this.orders && this.orders.length) {
          this.orders.forEach((m, i) => {
            const index = this.selectedIds.findIndex(f => f === m._id);
            this.orders[i].select = index !== -1;
          });
        }

        this.holdPrevData = res.data;
        this.totalProducts = res.count;
        this.totalProductsStore = res.count;

        this.checkSelectionData();

      }, error => {
        this.spinner.hide();
        console.log(error);
      });
  }



  /**
   * ON Select Check
   */

  onCheckChange(event: any, index: number, id: string) {
    if (event) {
      this.selectedIds.push(id);
    } else {
      const i = this.selectedIds.findIndex(f => f === id);
      this.selectedIds.splice(i, 1);
    }
  }

  onAllSelectChange(event: MatCheckboxChange) {
    const currentPageIds = this.orders.map(m => m._id);
    if (event.checked) {
      this.selectedIds = this.utilsService.mergeArrayString(this.selectedIds, currentPageIds);
      this.orders.forEach(m => {
        m.select = true;
      });
    } else {
      currentPageIds.forEach(m => {
        this.orders.find(f => f._id === m).select = false;
        const i = this.selectedIds.findIndex(f => f === m);
        this.selectedIds.splice(i, 1);
      });
    }
  }

  private checkSelectionData() {
    let isAllSelect = true;
    this.orders.forEach(m => {
      if (!m.select) {
        isAllSelect = false;
      }
    });

    this.matCheckbox.checked = isAllSelect;
  }


  /**
   * PAGINATION CHANGE
   */
  public onPageChanged(event: any) {
    this.router.navigate([], {queryParams: {page: event}});
  }

  /**
   * NG CLASS
   */
  getDeliveryStatusColor(order: Order) {
    switch (order.deliveryStatus) {

      case this.orderEnum.CANCEL: {
        return 'cancel';
      }
      case this.orderEnum.PROCESSING: {
        return 'processing';
      }
      case this.orderEnum.CONFIRM: {
        return 'confirm';
      }
      case this.orderEnum.DELIVERED: {
        return 'delivered';
      }
      case this.orderEnum.REFUND: {
        return 'refund';
      }
      case this.orderEnum.SHIPPING: {
        return 'shipping';
      }
      default: {
        return 'none';
      }
    }
  }

  /**
   * HTTP REQ
   */

  public deleteOrderByAdmin(id: string) {
    this.orderService.deleteOrderByAdmin(id)
      .subscribe(res => {
        // console.log(res);
      }, error => {
        console.log(error);
      });
  }

  private updateMultipleOrderById(data: any[]) {
    this.spinner.show();
    // console.log(data[0]._id);
    this.orderService.updateMultipleOrderById(data)
      .subscribe(res => {
        this.uiService.success(res.message);
        this.reloadService.needRefreshOrder$();
        this.spinner.hide();
      }, error => {
        console.log(error);
        this.spinner.hide();
      });
  }

  /**
   * OPEN COMPONENT DIALOG
   */

  public openUpdateOrderDialog(order?: Order) {
    const dialogRef = this.dialog.open(UpdateOrderStatusComponent, {
      data: order,
      panelClass: ['theme-dialog'],
      // width: '100%',
      // minHeight: '60%',
      autoFocus: false,
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {

      }
    });
  }


  /**
   * OPEN COMPONENT DIALOG
   */

  public openUpdateStatusOrderDialog() {

    this.orderService.getMultipleOrderByAdmin(this.selectedIds)
      .subscribe(res => {
        const allData = res.data as Order[];
        const mData = this.getMData(allData);
        const date = this.utilsService.getDateString(new Date())

        const dialogRef = this.dialog.open(UpdateCheckboxOrderStatusComponent, {
          data: mData,
          panelClass: ['theme-dialog'],
          // width: '100%',
          // minHeight: '60%',
          autoFocus: false,
          disableClose: false
        });

        dialogRef.afterClosed().subscribe(dialogResult => {
          if (dialogResult) {

          }
        });


        this.spinner.hide();
      }, error => {
        this.spinner.hide();
        console.log(error);
      });

  }


  /**
   * ON FILTER CHANGE
   */
  onFilterSelectChange(event: MatSelectChange) {
    if (event.value) {
      if (this.filterQuery && this.filterQuery.deliveryStatus) {
        this.filterQuery.deliveryStatus = event.value;
      } else if (this.filterQuery) {
        this.filterQuery = {...this.filterQuery, ...{deliveryStatus: event.value}};
      } else {
        this.filterQuery = {deliveryStatus: event.value};
      }
      // console.log('On Type Filter');
      // console.log(this.filterQuery);
      this.getAllOrdersByAdmin();
    } else {
      delete this.filterQuery.deliveryStatus;
      this.getAllOrdersByAdmin();

    }
  }

  public openConfirmDialog(data?: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want delete this category?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        // console.log('Data should be deleted');
        // TODO DELETE PROCESS HANDLE HERE
      }
    });
  }


  /**
   * FILTER DATA
   */

  onFilterData() {
    if (
      this.dataFormRange.controls.start.hasError('matStartDateInvalid') ||
      !this.dataFormRange.value.start
    ) {
      this.uiService.warn('Invalid start date');
      return;
    }

    if (
      this.dataFormRange.controls.end.hasError('matEndDateInvalid') ||
      !this.dataFormRange.value.end
    ) {
      this.uiService.warn('Invalid end date');
      return;
    }
    this.isFiltering = true;
    this.startDate = this.utilsService.getDateString(this.dataFormRange.value.start);
    this.endDate = this.utilsService.getDateString(this.dataFormRange.value.end);


    // this.getAllReports();

    if (this.isFiltering) {

      if (this.filterQuery && this.filterQuery.checkoutDate) {
        this.filterQuery.checkoutDate = {$gte: this.startDate, $lte: this.endDate};
      } else if (this.filterQuery) {
        this.filterQuery = {...this.filterQuery, ...{checkoutDate: {$gte: this.startDate, $lte: this.endDate}}};
      } else {
        this.filterQuery = {checkoutDate: {$gte: this.startDate, $lte: this.endDate}};
      }

      this.getAllOrdersByAdmin();

      // console.log('On date Filter');
      // console.log(this.filterQuery);

      // this.filterQuery = {checkoutDate: { $gte: this.startDate, $lte: this.endDate }}

      // const date = this.utilsService.getStartEndDate(new Date(), true);
      // this.startDate = date.firstDay as string;
      // this.endDate = this.utilsService.getDateString(new Date());
    }
    // console.log('Date Range', this.dataFormRange);
  }



  /**
   * CLEAR FILTERING
   */
  clearFiltering() {
    this.isFiltering = false;
    this.dataFormRange.reset();
    this.filterQuery = null;
    this.matSelectFilter.value = null;
    this.getAllOrdersByAdmin();
  }

  exportDataToFile() {
    if (this.dataTypeFormat === 'json') {
      this.exportAsJson();
    } else {
      this.exportToExcel();
    }
  }

  /**
   * EXPORTS TO EXCEL
   */
  private getProductInfoAsString(items: OrderItem[]) {
    const itemsStrArr = items.map(m => {
      if (m.product) {
        // @ts-ignore
        return `${m.product.productName} - ${this.utilsService.slugToNormal(m.product.categorySlug)} - ${this.utilsService.slugToNormal(m.product.subCategorySlug)} - ${this.utilsService.slugToNormal(m.product.brandSlug)} (QTY #${m.quantity})`;

      } else {
        return `N/A`;
      }
    });
    return itemsStrArr.join();
  }



  /**
   * get data from getMultipleOrderByAdmin
   */

  getMData(allData){
   return allData.map(m => {
      return {
        _id: m._id,
        orderId: m.orderId,
        checkoutDate: this.utilsService.getDateString(m.checkoutDate),
        // deliveryDate: m.deliveryDate ? this.utilsService.getDateString(m.deliveryDate) : 'N/A',
        deliveryStatus: this.orderStatusPipe.transform(m.deliveryStatus),
        subTotal: m.subTotal,
        discount: m.discount,
        shippingFee: m.shippingFee,
        totalAmount: m.totalAmount,
        totalAmountWithDiscount: m.totalAmountWithDiscount,
        paymentStatus: m.paymentStatus,
        paymentMethod: m.paymentStatus,
        name: m.name,
        phoneNo: m.phoneNo,
        email: m.email,
        alternativePhoneNo: m.alternativePhoneNo ? m.alternativePhoneNo : 'N/A',
        city: m.city ? m.city : 'N/A',
        area: m.area ? m.area : 'N/A',
        postCode: m.postCode ? m.postCode : 'N/A',
        shippingAddress: m.shippingAddress,
        couponId: m.couponId,
        couponValue: m.couponValue,
        orderNotes: m.orderNotes,
        nextPhaseDate: this.utilsService.getDateString(new Date()),
        products: this.getProductInfoAsString(m.orderedItems)
      };
    });
  }

  /**
   * export excell
   */

  exportToExcel() {
    this.spinner.show();

    if (this.selectedIds && this.selectedIds.length > 0 ){
      this.orderService.getMultipleOrderByAdmin(this.selectedIds)
        .subscribe(res => {
          const allData = res.data as Order[];
          const mData = this.getMData(allData);
          const date = this.utilsService.getDateString(new Date());
          // EXPORT XLSX

        

          this.spinner.hide();
        }, error => {
          this.spinner.hide();
          console.log(error);
        });

    }
    else{
    this.orderService.getAllOrdersByAdminNoPaginate()
      .subscribe(res => {
        const allData = res.data as Order[];
        const mData = this.getMData(this.orders);
        const date = this.utilsService.getDateString(new Date());

        console.log('Printing My filtered data', mData);
        // EXPORT XLSX

        this.spinner.hide();
      }, error => {
           this.spinner.hide();
           console.log(error);
         });
    }

      // }, error => {
      //   this.spinner.hide();
      //   console.log(error);
      // });
  }

  exportAsJson() {
    this.orderService.getAllOrdersByAdmin(null, null)
      .subscribe(res => {
        const allData = res.data as Order[];

        const blob = new Blob([JSON.stringify(allData, null, 2)], {type: 'application/json'});
        this.dialog.open(DownloadJsonDialogComponent, {
          maxWidth: '500px',
          data: {
            blobUrl: window.URL.createObjectURL(blob),
            backupType: 'orders'
          }
        });
      }, error => {
        console.log(error);
      });

  }

  public openConfirmUploadDialog(data: Order[]) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: {
        title: 'Import Data!',
        message: 'Warning! All the existing data will be replace'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.updateMultipleOrderById(data);
      }
    });
  }

  /**
   * IMPORT EXCEL DATA
   * FILE CHANGE EVENT
   */

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    if (this.dataTypeFormat === 'excel') {
      // console.log('i am if');
      reader.onload = (event) => {
        const data = reader.result;
        workBook = XLSX.read(data, {type: 'binary'});
        jsonData = workBook.SheetNames.reduce((initial, name) => {
          const sheet = workBook.Sheets[name];
          initial[name] = XLSX.utils.sheet_to_json(sheet);
          return initial;
        }, {});

        // Modify Attributes
        const allData = jsonData.Orders;
        // console.log('***********');
        // console.log(allData);
        const mData: Order[] = allData.map(m => {
          return {
            ...m,
            // ...{
            deliveryStatus: this.orderStatusPipe.reverse(m.deliveryStatus),
            checkoutDate: m.checkoutDate ? this.excelDateToJSDate(m.checkoutDate) : null,
            deliveryDate: m.deliveryDate ? this.excelDateToJSDate(m.deliveryDate) : null,
            nextPhaseDate: m.nextPhaseDate ? this.excelDateToJSDate(m.nextPhaseDate) : null,
            // }
          } as Order;
        });
        // console.log('###########');
        // console.log(mData);
        this.openConfirmUploadDialog(mData);
      };

      reader.readAsBinaryString(file);
    } else {
      // console.log('i am else');
      reader.readAsText(file, 'UTF-8');
      reader.onload = () => {
        const products = JSON.parse(reader.result.toString());
        const mProducts: Order[] = products.map(m => {
          const dataNameFieldString = m.productName.toString().trim();
          return {
            ...m,
            ...{productSlug: this.utilsService.transformToSlug(dataNameFieldString)}
          } as ProductCategory;
        });
        // this.insertManyProduct(mProducts);
        this.openConfirmUploadDialog(mProducts);
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
  }

  /**
   * EXCEL DATE TO NORMAL DATE
   */
  excelDateToJSDate(serial: any) {
    if (typeof serial === 'string') {
      return this.utilsService.getDateString(new Date(serial));
    } else {
      const utcDate = Math.floor(serial - 25569);
      const utcValue = utcDate * 86400;
      const dateInfo = new Date(utcValue * 1000);

      const fractionalDay = serial - Math.floor(serial) + 0.0000001;

      let totalSeconds = Math.floor(86400 * fractionalDay);

      const seconds = totalSeconds % 60;

      totalSeconds -= seconds;

      const hours = Math.floor(totalSeconds / (60 * 60));
      const minutes = Math.floor(totalSeconds / 60) % 60;

      const d = new Date(dateInfo.getFullYear(), dateInfo.getMonth(), dateInfo.getDate(), hours, minutes, seconds);
      return this.utilsService.getDateString(d);

    }
  }



  /**
   * ON DESTROY
   */
  ngOnDestroy() {

    if (this.subAcRoute) {
      this.subAcRoute.unsubscribe();
    }
  }
}
