import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {path: '', component: AdminComponent,
  children: [


    {
      path:'',
      loadChildren: () =>import('./login/login.module').then(m => m.LoginModule)
    },

    {
      path:'dashboard',
      loadChildren: () =>import('./dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
      path:'admin-profile',
      loadChildren: () =>import('./admin-profile/admin-profile.module').then(m => m.AdminProfileModule)
    },
    {
      path:'products',
      loadChildren: () =>import('./products/products.module').then(m => m.ProductsModule)
    },
    {
      path:'products/add-product',
      loadChildren: () =>import('./add-product/add-product.module').then(m => m.AddProductModule)
    },
    {
      path:'products/edit-product',
      loadChildren: () =>import('./edit-product/edit-product.module').then(m => m.EditProductModule)
    },
    {
      path:'products/view-product',
      loadChildren: () =>import('./view-product/view-product.module').then(m => m.ViewProductModule)
    },
    {
      path:'users',
      loadChildren: () =>import('./users/users.module').then(m => m.UsersModule)
    },
    {
      path:'admin-profile/edit-info',
      loadChildren: () =>import('./edit-info/edit-info.module').then(m => m.EditInfoModule)
    },
    {
      path:'users/edit-user-info',
      loadChildren: () =>import('./edit-user-info/edit-user-info.module').then(m => m.EditUserInfoModule)
    },
    {
      path:'users/add-user',
      loadChildren: () =>import('./add-user/add-user.module').then(m => m.AddUserModule)
    },
    {
      path:'users/view-user',
      loadChildren: () =>import('./view-user/view-user.module').then(m => m.ViewUserModule)
    },
    {
      path:'image-gallery',
      loadChildren: () =>import('./image-gallery/image-gallery.module').then(m => m.ImageGalleryModule)
    },
    {
      path:'image-folder',
      loadChildren: () =>import('./image-folder/image-folder.module').then(m => m.ImageFolderModule)
    },
    // {
    //   path: 'orders',
    //   loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
    // },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
