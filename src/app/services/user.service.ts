import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DATABASE_KEY } from '../core/utils/global-variable';
import { User } from '../interfaces/user';
import { CartService } from './cart.service';
import { ProductService } from './products.service';
import { StorageService } from './storage.service';


const API_USER = environment.apiBaseLink + '/api/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private token: string;
  private isUser = false;
  private userStatusListener = new Subject<boolean>();
  // Hold The Count Time..
  private tokenTimer: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private cartService: CartService,
    private productService: ProductService,
    ) { }



    userRegistration(data: User, redirectForm?: string) {
      this.httpClient.post<{ success: boolean; message: string; token: string; expiredIn: number }>
      (API_USER + 'registration', data)
        .subscribe(res => {
          if (res.success) {
            this.token = res.token;
            // Make User Auth True..
            // this.spinner.hide();
            if (res.token) {
              this.onSuccessLogin(res.token, res.expiredIn, redirectForm, true);
            }


          } else {
            console.log(res.message);
            // this.uiService.wrong(res.message);
            this.isUser = false;
            this.userStatusListener.next(false);
          }
        }, () => {
          this.isUser = false;
          this.userStatusListener.next(false);
        });
    }



    private onSuccessLogin(token: string, expiredIn: number, redirectFrom?: string, fromRegistration?: boolean) {
      this.isUser = true;
      this.userStatusListener.next(true);

      // For Token Expired Time..
      const expiredInDuration = expiredIn;
      this.setSessionTimer(expiredInDuration);

      // Save Login Time & Expiration Time & Token to Local Storage..
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiredInDuration * 1000);
      this.saveUserData(token, expirationDate);

      // Snack bar..
      console.log('Welcome! Login Success.');
      // this.uiService.success('Welcome! Login Success.');
      // Spinner

      // SYNC CART ITEM
      // this.getCarsItemFromLocal();

      // Navigate with Auth..

      this.router.navigate(['']);
      // if (redirectFrom) {
      //   this.router.navigate([redirectFrom]);
      // } else {
      //   this.router.navigate([environment.userBaseUrl]);
      // }
    }
    // userRegistration(data: any){
    //   console.log(data);
    //   return this.httpClient.post<{ message: string }>(API_USER + 'registration', data);
    // }

    // userLogin(data: { username: string, password: string }, redirectFrom?: string) {

    //   this.httpClient.put<{ success: boolean; message: string; token: string; expiredIn: number }>
    //   (API_USER + 'login', data)

    // }

    userLogin(data: any){
      console.log(data);
      this.httpClient.post<{ success: boolean; message: string; token: string; expiredIn: number }>(API_USER + 'login', data)
      .subscribe(res => {
        if (res.success) {
          this.token = res.token;
          // Make User Auth True..
          if (res.token) {
            this.onSuccessLogin(res.token, res.expiredIn);
          }
        } else {
          console.log(res.message);
          // this.uiService.wrong(res.message);
          this.isUser = false;
          this.userStatusListener.next(false);
        }

      }, () => {
        this.isUser = false;
        this.userStatusListener.next(false);
      });
    }

    // userLogin(data: any){
    //   console.log(data);
    //   return this.httpClient.post<{ message: string }>(API_USER + 'login', data);
    // }

    getAllUsers(paginate: any){
      return this.httpClient.post<{ data:any, count:number, message: string }>(API_USER + 'get-all-users', {paginate});
    }



    private setSessionTimer(duration: number) {
      this.tokenTimer = setTimeout(() => {
      }, duration * 1000);
    }

    protected saveUserData(token: string, expiredDate: Date) {
      const data = {
        token,
        expiredDate
      };
      this.storageService.addDataToEncryptLocal(data, DATABASE_KEY.encryptUserLogin);

    }

    // private getCarsItemFromLocal() {
    //   const items = this.cartService.getCartItemFromLocalStorage();

    //   if (items && items.length > 0) {
    //     const ids: string[] = items.map(m => m.product as string);
    //     this.productService.getSpecificProductsById(ids, 'productName productSlug  price discountType discountAmount  quantity images')
    //       .subscribe(res => {
    //         const products = res.data;
    //         if (products && products.length > 0) {
    //           const cartsItems = items.map(t1 => ({...t1, ...{product: products.find(t2 => t2._id === t1.product)}}));
    //           this.openCartViewDialog(cartsItems);
    //         }
    //       });
    //   }
    // }


    // openCartViewDialog(data: Cart[]) {
    //   this.dialog.open(CartViewDialogComponent, {
    //     data,
    //     width: '100%',
    //     maxWidth: '1050px',
    //     disableClose: true
    //   });
    // }

    protected clearUserData() {
      this.storageService.removeDataFromEncryptLocal(DATABASE_KEY.encryptUserLogin);

    }
    getUserToken() {
      return this.token;
    }

    getUserStatusListener() {
      return this.userStatusListener.asObservable();
    }

    getUserStatus() {
      return this.isUser;
    }

    userLogOut() {
      this.token = null;
      this.isUser = false;
      this.userStatusListener.next(false);
      // Clear Token from Storage..
      this.clearUserData();
      // Clear The Token Time..
      clearTimeout(this.tokenTimer);
      // Navigate..
      this.router.navigate([environment.appBaseUrl]);
    }

    protected getUserData() {
      return this.storageService.getDataFromEncryptLocal(DATABASE_KEY.encryptUserLogin);

    }


    autoUserLoggedIn() {
      const authInformation = this.getUserData();
      if (!authInformation) {
        this.storageService.removeDataFromEncryptLocal(DATABASE_KEY.encryptUserLogin);
        return;
      }
      const now = new Date();
      const expDate = new Date(authInformation.expiredDate);
      const expiresIn = expDate.getTime() - now.getTime();

      if (expiresIn > 0) {
        this.token = authInformation.token;
        this.userStatusListener.next(true);
        this.isUser = true;
        this.setSessionTimer(expiresIn / 10000);
      }
    }
}
