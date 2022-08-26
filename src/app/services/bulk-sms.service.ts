import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BulkSms} from '../interfaces/bulk-sms';
import {StorageService} from './storage.service';
import {SecretKeyTypeEnum} from '../enum/secret-key-type.enum';


const API_BULK_SMS = environment.apiBaseLink + '/api/bulk-sms/';

@Injectable({
  providedIn: 'root'
})
export class BulkSmsService {

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {
  }

  /**
   * iSMS SSLWIRELESS
   * POWERED BY SSLWIRELESS
   * URL: http://login.bulksmsbd.com/default.php
   */

  // Main
  sendSmsBySslAPi(data: BulkSms) {
    // Encrypt Data
    const encryptData = this.storageService.encryptWithCrypto(data, SecretKeyTypeEnum.API_TOKEN);
    // Return Promise
    return this.httpClient.post<{ success: boolean; message: string; xmlRes?: string }>
    (API_BULK_SMS + 'sent-user-single-sms', {data: encryptData});
  }

  /**
   * SENT MESSAGE With Subscribe
   */
  sendMessageWithSubscribe(phoneNo: string, message: string) {
    const messageBody: BulkSms = {
      sms: message,
      csmsid: phoneNo,
      msisdn: phoneNo
    };
    this.sendSmsBySslAPi(messageBody)
      .subscribe(res => {

      }, error => {
        console.log(error);
      });
  }


}
