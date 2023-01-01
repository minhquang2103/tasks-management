import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteStatusPipe } from './complete-status.pipe';



@NgModule({
  declarations: [
    CompleteStatusPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompleteStatusPipe
  ]
})
export class CompleteStatusModule { }
