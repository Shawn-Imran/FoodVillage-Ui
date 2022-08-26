import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../../services/storage.service';
import {DATABASE_KEY} from '../../../core/utils/global-variable';
import {ReloadService} from '../../../services/reload.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {

  hideCookie = true;
  cookieAccept = false;

  constructor(
    private storageService: StorageService,
    private reloadService: ReloadService,
  ) {
  }

  ngOnInit(): void {
    this.reloadService.refreshCookie$.subscribe(() => {
      this.getCookie();
    });
    this.getCookie();
  }

  /**
   * COOKIE
   */

  private getCookie() {
    const token = this.storageService.getDataFromCookieStorage(DATABASE_KEY.userCookieTerm);
    if (token) {
      this.cookieAccept = true;
      this.hideCookie = true;
    } else {
      setTimeout(() => {
        this.cookieAccept = true;
        this.hideCookie = false;
      }, 5000);
    }
  }


  onAccept() {
    this.storageService.storeDataToCookieStorage(DATABASE_KEY.userCookieTerm, true, {
      expires: 365,
      secure: true
    });
    this.reloadService.needRefreshCookie$();
  }

}
