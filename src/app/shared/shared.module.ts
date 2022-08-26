import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { PipesModule } from './pipes/pipes.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import {LangTranslateModule} from '../core/lang-translate/lang-translate.module';
import { CartViewDialogComponent } from './components/cart-view-dialog/cart-view-dialog.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { BottomSheetViewComponent } from './components/ui/bottom-sheet-view/bottom-sheet-view.component';
import { MessageDialogComponent } from './components/ui/message-dialog/message-dialog.component';
import { SnackbarNotificationComponent } from './components/ui/snackbar-notification/snackbar-notification.component';
import { OutSideClickDirective } from './directives/out-side-click.directive';
import { ConfirmDialogComponent } from './components/ui/confirm-dialog/confirm-dialog.component';
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    PipesModule,
    NgxSpinnerModule,
    LangTranslateModule,

  ],
  exports: [
    FlexLayoutModule,
    SnackbarNotificationComponent,
    MessageDialogComponent,
    LangTranslateModule,
    NgxSpinnerModule,
    OutSideClickDirective,
    CartViewDialogComponent,
    BottomSheetViewComponent,
    CookieConsentComponent,

  ],
  declarations: [
    SnackbarNotificationComponent,
    MessageDialogComponent,
    ConfirmDialogComponent,
    OutSideClickDirective,
    CartViewDialogComponent,
    BottomSheetViewComponent,
    CookieConsentComponent,
    // PhoneForceComponent,
  ],
  providers: [],
  entryComponents: []
})
export class SharedModule { }
