import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowCloseResult, WindowService } from '@progress/kendo-angular-dialog';
import { concatMap, tap } from 'rxjs/operators';
import { BaseFilterComponent } from 'src/app/base-components/base-filter.component';
import { PageType } from 'src/app/core/models/configs';
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
export class TaskListComponent extends BaseFilterComponent implements OnInit {
  dataSource: TaskList[] = [];

  @Input() configs: TaskListConfigs = new TaskListConfigs();
  constructor(
    private backEndService: BackendService,
    private router: Router,
    private windowSharedService: WindowSharedService,
    private completeStatusPipe: CompleteStatusPipe
  ) {
    super()
  }


  ngOnInit() {
    this.initPage()
  }

  /**
   * To init or reinit the values of this page
   */
  initPage() {
    this.get()
  }

  get() {
    this.backEndService.taskList$().pipe(
      tap(res => {
        this.dataSource = res
      })
    ).subscribe()
  }

  add() {
    this.windowSharedService.openTaskDetail$({
      type: PageType.ADD,
      id: null
    }).pipe(
      tap(res => {
        if (res instanceof WindowCloseResult) return
        let result: Task = res;
      })
    )
  }

  edit(task: TaskList) {
    this.router.navigate(["edit", task.id])
  }

  complete(task: TaskList) {
    this.backEndService.completeTask$(task.id, true).pipe(
      tap(res => {
        console.log(`Task: ${res.description} (#${res.id}) status marked as ${this.completeStatusPipe.transform(res.completed)}`)
      })
    )
  }


}
