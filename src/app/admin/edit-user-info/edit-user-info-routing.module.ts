import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserInfoComponent } from './edit-user-info.component';

const routes: Routes = [
  {path: '', component: EditUserInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditUserInfoRoutingModule { }
