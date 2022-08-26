import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {UserService} from '../services/user.service';
import {StorageService} from '../services/storage.service';
import {SecretKeyTypeEnum} from '../enum/secret-key-type.enum';

@Injectable()
export class AuthUserInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
    private storageService: StorageService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.userService.getUserToken();
    // const encryptToken = this.storageService.encryptStringWithCrypto(authToken, SecretKeyTypeEnum.USER_TOKEN);

    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(authRequest);
  }
}
