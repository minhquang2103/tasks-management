import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import { TaskListRoutingModule } from './task-list-routing.module';
import { TaskDetailsModule } from '../task-details/task-details.module';
import { FilterComponent } from './filter/filter.component';
import { CompleteStatusModule } from 'src/app/core/pipes/complete-status/complete-status.module';



@NgModule({
  declarations: [
    TaskListComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    TaskListRoutingModule,
    TaskDetailsModule,
    CompleteStatusModule
  ]
})
export class TaskListModule { }
