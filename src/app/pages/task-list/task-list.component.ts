import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowCloseResult } from '@progress/kendo-angular-dialog';
import { tap } from 'rxjs/operators';
import { PageType } from 'src/app/core/models/configs';
import { TaskFilter } from 'src/app/core/models/filters';
import { TaskList } from 'src/app/core/models/task';
import { CompleteStatusPipe } from 'src/app/core/pipes/complete-status/complete-status.pipe';
import { BackendService } from 'src/app/core/services/backend.service';
import { WindowSharedService } from 'src/app/core/services/window-shared.service';
import { TaskListConfigs } from './models';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  providers: [
    CompleteStatusPipe
  ]
})
export class TaskListComponent implements OnInit {
  dataSource$ = this.backEndService.taskList$();
  filter$ = this.backEndService.filters$();

  @Input() configs: TaskListConfigs = new TaskListConfigs();
  constructor(
    private backEndService: BackendService,
    private router: Router,
    private windowSharedService: WindowSharedService,
    private completeStatusPipe: CompleteStatusPipe
  ) {
  }


  ngOnInit() {
    this.initPage()
  }

  /**
   * To init or reinit the values of this page
   */
  initPage() {

  }

  add() {
    this.windowSharedService.openTaskDetail$({
      type: PageType.ADD,
      id: null
    }).pipe(
      tap(res => {
        if (res instanceof WindowCloseResult) return
        let result: Task = res;
        console.info(`New Task: `, result)
      })
    ).subscribe()
  }

  edit(task: TaskList) {
    this.router.navigate(["edit", task.id])
  }

  complete(task: TaskList, completed: boolean = true) {
    this.backEndService.completeTask$(task.id, completed).pipe(
      tap(res => {
        console.log(`Task: ${res.description} (#${res.id}) status marked as ${this.completeStatusPipe.transform(res.completed)}`)
      })
    )
  }

  assign(task: TaskList) {
    this.windowSharedService.openTaskDetail$(
      {
        type: PageType.EDIT,
        id: task.id
      },
      `Edit Task (#${task.id})`
    ).pipe(
      tap(res => {
        if (res instanceof WindowCloseResult) return
        let result: Task = res;
        console.info(`Edited Task: `, result)
      })
    ).subscribe()
  }

  filterChange($event: TaskFilter) {
    this.backEndService.setFilters($event)
  }
}
