import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { WindowContainer } from './core/utilities/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('container', { static: true, read: ViewContainerRef }) container: ViewContainerRef;
  
  constructor() {

  }
  ngOnInit() {
    WindowContainer.container = this.container;
  }
}
