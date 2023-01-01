import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { TaskFilter } from 'src/app/core/models/filters';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AfterViewInit {
  @Input() defaultFilter: TaskFilter = new TaskFilter();
  @Output() filterChange: EventEmitter<TaskFilter> = new EventEmitter();

  @ViewChild('searchString', { static: true, read: ElementRef }) inputChange: ElementRef<HTMLInputElement>;
  @ViewChild('completed', { static: true, read: ElementRef }) selectChange: ElementRef<HTMLInputElement>;

  constructor(
  ) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    fromEvent(this.inputChange.nativeElement, 'keyup').pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap($event => this.filterChange.emit({ ...this.defaultFilter, searchString: $event.target['value'] || "" }))
    ).subscribe()

    fromEvent(this.selectChange.nativeElement, 'change').pipe(
      tap($event => this.filterChange.emit({ ...this.defaultFilter, completed: JSON.parse($event.target['value']) }))
    ).subscribe()
  }

}
