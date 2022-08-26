import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './shared/footer/footer.component';
import { PipesModule } from './shared/pipes/pipes.module';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from './services/admin.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ErrorHandleInterceptor } from './error-handler/error-handle.interceptor';
import { CustomOverlayContainer } from './core/utils/custom-overlay-container';
import { AuthUserInterceptor } from './auth-interceptor/auth-user.interceptor';
import { AuthAdminInterceptor } from './auth-interceptor/auth-admin.interceptor';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    SharedModule,
    PipesModule

  ],
  providers: [
    CookieService,
    AdminService,
    {provide: OverlayContainer, useClass: CustomOverlayContainer},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandleInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthUserInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthAdminInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
