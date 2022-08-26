import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddImageFolderComponent } from './add-image-folder/add-image-folder.component';
import { ImageFolderComponent } from './image-folder.component';

const routes: Routes = [
  {path:'', component: ImageFolderComponent},
  {path: 'add-image-folder', component: AddImageFolderComponent},
  {path: 'edit-image-folder/:id', component: AddImageFolderComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageFolderRoutingModule { }
