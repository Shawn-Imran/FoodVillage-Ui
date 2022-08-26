import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HeaderModule } from '../core/header/header.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FooterModule } from '../shared/footer/footer.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../shared/pipes/pipes.module';



@NgModule({
  declarations: [
    PagesComponent,
    UserProfileComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HeaderModule,
    FooterModule,
    SharedModule,
    PipesModule
    
  ]
})
export class PagesModule { }
