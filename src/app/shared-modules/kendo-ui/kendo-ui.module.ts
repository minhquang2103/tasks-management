
import { NgModule } from '@angular/core';
import { DialogModule, WindowModule } from '@progress/kendo-angular-dialog';


const kendoUIModules = [
  DialogModule,
  WindowModule
];

@NgModule({
  imports: [kendoUIModules],
  exports: [kendoUIModules]
})
export class KendoUiModule {
  constructor() {
    console.log(this.constructor.name, "loaded.");
  }
}
