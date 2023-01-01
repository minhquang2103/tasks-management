import { Injectable } from '@angular/core';
import { WindowRef, WindowService } from '@progress/kendo-angular-dialog';
import { Observable } from 'rxjs';
import { TaskDetailConfigs } from 'src/app/pages/task-details/models';
import { TaskDetailsComponent } from 'src/app/pages/task-details/task-details.component';
import { WindowContainer } from '../utilities/util';

@Injectable({
  providedIn: 'root'
})
/**
 * These component should already be loaded into memory in order to be called dynamically
 */
export class WindowSharedService {

  constructor(
    private windowService: WindowService
  ) { 

  }

  openTaskDetail$(configs: TaskDetailConfigs, title: string = "New Task"): Observable<any> {
    const windowRef: WindowRef = this.windowService.open({
      title: title,
      content: TaskDetailsComponent,
      width: 700,
      appendTo: WindowContainer.container,
    });
    const component: TaskDetailsComponent = windowRef.content.instance;
    component.configs = configs;
    component.windowRef = windowRef;
    return windowRef.result
  }
}
