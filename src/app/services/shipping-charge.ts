import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ShippingCharge} from '../interfaces/shippingcharge';

const API_SHIPPING_CHARGE = environment.apiBaseLink + '/api/shipping-charge';

@Injectable({
  providedIn: 'root'
})
export class ShippingChargeService {

  constructor(
    private httpClient: HttpClient
  ) { }


  setExtraPriceInfo(data: ShippingCharge){
   return  this.httpClient.post<{message: string}>(API_SHIPPING_CHARGE + '/set-extra-price-info', data);

  }

  getExtraPriceInfo(){
   return  this.httpClient.get<{data: ShippingCharge , message: string}>(API_SHIPPING_CHARGE + '/get-extra-price-info');
  }

  editExtraInfo(data: ShippingCharge){
  return  this.httpClient.put<{ messsage: string}>(API_SHIPPING_CHARGE + '/edit-extra-info', data);
  }





}


