import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DATABASE_KEY } from '../core/utils/global-variable';
import { Admin } from '../interfaces/admin';
import { StorageService } from './storage.service';

const API_URL_ADMIN = environment.apiBaseLink + '/api/admin/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  private token: string;
  private isAdmin = false;
  private adminRole: string = null;
  private adminStatusListener = new Subject<boolean>();
  // Hold The Count Time..
  private tokenTimer: any;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private storageService: StorageService,
    ) { }



    // For Login User..
  adminLogin(data: any) {

    this.httpClient.put<{ success: boolean; message: string; token: string; expiredIn: number; role: string }>
    (API_URL_ADMIN + 'login', data)
      .subscribe(res => {
        if (res.success) {
          this.token = res.token;
          this.adminRole = res.role;
          if (res.token) {
            this.isAdmin = true;
            this.adminStatusListener.next(true);
            // For Token Expired Time..
            const expiredInDuration = res.expiredIn;
            this.setSessionTimer(expiredInDuration);
            // Save Login Time & Expiration Time & Token to Local Storage..
            const now = new Date();
            const expirationDate = new Date(now.getTime() + expiredInDuration * 1000);
            // Store to Local
            this.saveAdminData(res.token, expirationDate, res.role);

            // Snack bar..
            console.log('Login Successfull')
            // Navigate..
            this.router.navigate([environment.adminBaseUrl]);
          }
        } else {
          console.log('Something went wrong')
          this.adminStatusListener.next(false);
        }

      }, error => {
        this.adminStatusListener.next(false);
        // console.log(error);
      });
  }





  autoAdminLoggedIn() {
    const authInformation = this.getAdminData();
    if (!authInformation) {
      this.storageService.removeDataFromEncryptLocal(DATABASE_KEY.encryptAdminLogin);
      return;
    }
    const now = new Date();
    const expDate = new Date(authInformation.expiredDate);
    const expiresIn = expDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.adminStatusListener.next(true);
      this.isAdmin = true;
      this.adminRole = authInformation.role;
      this.setSessionTimer(expiresIn / 10000);
    }
  }



  adminLogOut() {
    this.token = null;
    this.isAdmin = false;
    this.adminStatusListener.next(false);
    // Clear Token from Storage..
    this.clearAdminData();
    // Clear The Token Time..
    clearTimeout(this.tokenTimer);
    // Navigate..
    this.router.navigate([environment.adminLoginUrl]);
  }



  private setSessionTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.adminLogOut();
    }, duration * 1000); // 1s = 1000ms
    // console.log('Setting Time: ' + duration);
  }



  protected saveAdminData(token: string, expiredDate: Date, role: string) {
    const data = {
      token,
      expiredDate,
      role
    };
    this.storageService.addDataToEncryptLocal(data, DATABASE_KEY.encryptAdminLogin);
  }


  protected getAdminData() {
    return this.storageService.getDataFromEncryptLocal(DATABASE_KEY.encryptAdminLogin);
  }


  protected clearAdminData() {
    this.storageService.removeDataFromEncryptLocal(DATABASE_KEY.encryptAdminLogin);
  }




  getAdminToken() {
    return this.token;
  }

  getAdminRole() {
    return this.adminRole;
  }

  // For Get Auth status listener to Other..
  getAdminStatusListener() {
    return this.adminStatusListener.asObservable();
  }

  getAdminStatus() {
    return this.isAdmin;
  }

  /**
   * Get Logged In Admin Data
   */

  getAdminShortData() {
    return this.httpClient.get<{ data: Admin }>(API_URL_ADMIN + 'get-logged-in-admin-info');
  }
    // adminLogin(data: any){
    //   console.log(data);
    //   return this.httpClient.post<{ message: string }>(API_USER + 'login', data);
    // }
}
