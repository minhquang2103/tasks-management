import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { KendoUiModule } from './shared-modules/kendo-ui/kendo-ui.module';
import { WindowSharedService } from './core/services/window-shared.service';
import { WindowRef } from '@progress/kendo-angular-dialog';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    KendoUiModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
