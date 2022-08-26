import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SslInit} from '../interfaces/ssl-init';
import {SslInitResponse} from '../interfaces/ssl-init-response';

const API_PAYMENT_SSL = environment.apiBaseLink + '/api/payment-ssl/';

@Injectable({
  providedIn: 'root'
})
export class PaymentSslService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * SSL PAYMENT
   */
  initSSLPayment(data: SslInit) {
    return this.httpClient.post<{ data: SslInitResponse, message: string }>(API_PAYMENT_SSL + 'init', data);
  }

  validateSSLPayment(data: { val_id: string }) {
    return this.httpClient.post<{ message: string }>(API_PAYMENT_SSL + 'validate', data);
  }


  transactionQueryBySessionId(data: { sessionkey: string }) {
    return this.httpClient.post<{ message: string }>(API_PAYMENT_SSL + 'transaction-query-by-session-id', data);
  }

  transactionQueryByTransactionId(data: { tran_id: string }) {
    return this.httpClient.post<{ message: string }>(API_PAYMENT_SSL + 'transaction-query-by-transaction-id', data);
  }

  // ipnSSLPayment() {
  //   return this.httpClient.post<{ message: string }>(API_PAYMENT_SSL + 'ipn', {});
  // }

  /*
  router.post('/init', controller.init);
  router.post('/validate', controller.validate);
  router.get('/transaction-query-by-session-id', controller.transactionQueryBySessionId);
  router.post('/transaction-query-by-transaction-id', controller.transactionQueryByTransactionId);
  router.post('/ipn', controller.ipn);
*/

}
