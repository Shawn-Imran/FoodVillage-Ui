import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AdminService} from '../services/admin.service';
import {StorageService} from '../services/storage.service';
import {SecretKeyTypeEnum} from '../enum/secret-key-type.enum';

@Injectable()
export class AuthAdminInterceptor implements HttpInterceptor {

  constructor(
    private adminService: AdminService,
    private storageService: StorageService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.adminService.getAdminToken();
    // const encryptToken = this.storageService.encryptStringWithCrypto(authToken, SecretKeyTypeEnum.ADMIN_TOKEN);
    const authRequest = req.clone({
      headers: req.headers.set('Administrator', 'Bearer ' + authToken)
    });
    return next.handle(authRequest);
  }
}
