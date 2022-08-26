import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from '../auth-guard/user-auth.guard';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '', component:PagesComponent,
    children: [
      {
        path:'',
        loadChildren: () =>import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path:'login',
        loadChildren: () =>import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path:'registration',
        loadChildren: () =>import('./registration/registration.module').then(m => m.RegistrationModule)
      },
      {
        path:'user-profile',
        loadChildren: () =>import('./user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
      {
        path:'order',
        loadChildren: () =>import('./order/order.module').then(m => m.OrderModule)
      },

      {
        path:'cart',
        loadChildren: () =>import('./cart/cart.module').then(m => m.CartModule)
      },

      {
        path: 'checkout',
        loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
        data: {preload: true, delay: false}
      },

      {
        path: 'product-list',
        loadChildren: () => import('./product-list/product-list.module').then(m => m.ProductListModule),
        data: {preload: true, delay: false}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
