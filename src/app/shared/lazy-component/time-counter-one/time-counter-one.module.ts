import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeCounterOneComponent } from './time-counter-one.component';
import {PipesModule} from '../../pipes/pipes.module';



@NgModule({
  declarations: [
    TimeCounterOneComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [
    TimeCounterOneComponent
  ]
})
export class TimeCounterOneModule { }
