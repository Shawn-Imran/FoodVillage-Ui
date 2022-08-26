import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Setting} from '../interfaces/setting';

const API_SETTING = environment.apiBaseLink + '/api/setting';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    private httpClient: HttpClient
  ) { }


  setSettingInfo(data: Setting){
    return  this.httpClient.post<{message: string}>(API_SETTING + '/set-setting-info', data);

  }

  getSettingInfo(){
    return  this.httpClient.get<{data: Setting , message: string}>(API_SETTING + '/get-setting-info');
  }

  editSettingInfo(data: Setting){
    return  this.httpClient.put<{ messsage: string}>(API_SETTING + '/edit-setting-info', data);
  }





}


