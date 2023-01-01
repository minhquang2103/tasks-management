import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowRef } from '@progress/kendo-angular-dialog';
import { concatMap, tap } from 'rxjs/operators';
import { PageType } from 'src/app/core/models/configs';
import { User } from 'src/app/core/models/user';
import { isNumber } from 'src/app/core/utilities/util';
import { Task } from '../../core/models/task';
import { TaskDetailConfigs } from './models';
import { cloneDeep } from 'lodash-es';
import { FormatRequestService } from 'src/app/core/services/format-request.service';
import { BaseDetailComponent } from 'src/app/base-components/base-detail.component';
import { BackendService } from 'src/app/core/services/backend.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
  providers: [
    WindowRef
  ]
})
export class TaskDetailsComponent extends BaseDetailComponent implements OnInit {
  assignee: User;
  users$ = this.backEndService.users$();

  dataSource: Task = new Task();
  @Input() configs: TaskDetailConfigs = new TaskDetailConfigs();
  constructor(
    private backEndService: BackendService,
    private activatedRoute: ActivatedRoute,
    private windowRef: WindowRef,
    private formatRequestService: FormatRequestService,
    private router: Router
  ) {
    super()
  }

  ngOnInit() {
    this.initPage();
  }

  initPage() {
    let id: string = this.activatedRoute.snapshot.params['id'] || null;
    if (id) {
      this.configs.type = PageType.EDIT;
      this.configs.id = +id;
      this.get(+id)
    }
    if (!id) {
      this.get(this.configs.id)
    }
  }

  get(id: number) {
    const get$ = () => {
      if (isNumber(id)) return this.backEndService.taskById$(id)
      return this.backEndService.newTask$({ description: this.backEndService.getRandomDescription() })
    }
    get$().pipe(
      concatMap(res => {
        this.dataSource = res;
        return this.backEndService.user$(res.assigneeId)
      }),
      tap(res => this.assignee = res)
    ).subscribe()
  }

  save(form: NgForm) {
    if (form.invalid) {
      console.log("Form is invalid");
      return
    }
    let body: Task = cloneDeep(this.dataSource);
    body = this.formatRequestService.formatRequest("PUT", body);

    this.backEndService.updateTask$(body.id, body).pipe(
      tap(res => {
        this.emit(res);
      })
    ).subscribe()
  }

  emit(value: Task) {
    this.back();
    if (this.windowRef) {
      // this.windowRef.close(value);
    }
  } 

  back() {
    this.router.navigate(["list"])
  }

}
