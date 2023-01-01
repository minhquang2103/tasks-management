import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskDetailsComponent } from './task-details.component';
import { FormsModule } from '@angular/forms';
import { CompleteStatusModule } from 'src/app/core/pipes/complete-status/complete-status.module';



@NgModule({
  declarations: [
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CompleteStatusModule
  ],
  exports: [
    TaskDetailsComponent
  ]
})
export class TaskDetailsModule { }
