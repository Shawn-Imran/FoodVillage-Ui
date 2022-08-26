import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditInfoComponent } from './edit-info.component';

const routes: Routes = [
  {path: '', component: EditInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditInfoRoutingModule { }
