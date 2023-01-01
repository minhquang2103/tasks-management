import { Injectable } from '@angular/core';
import { WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { TaskDetailConfigs } from 'src/app/pages/task-details/models';
import { TaskDetailsComponent } from 'src/app/pages/task-details/task-details.component';
import { WindowContainer } from '../utilities/util';

@Injectable({
  providedIn: 'root'
})
export class WindowSharedService {

  constructor(
    private windowService: WindowService
  ) { 

  }

  openTaskDetail$(configs: TaskDetailConfigs): Observable<any> {
    const windowRef: WindowRef = this.windowService.open({
      title: `Add New Task`,
      content: TaskDetailsComponent,
      appendTo: WindowContainer.container,
    });
    const component: TaskDetailsComponent = windowRef.content.instance;
    component.configs = configs;
    return windowRef.result
  }
}
