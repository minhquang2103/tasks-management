import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable, of, throwError } from "rxjs";
import { delay, map } from "rxjs/operators";
import { TaskFilter } from "../models/filters";
import { Task, TaskList } from "../models/task";
import { User } from "../models/user";


function randomDelay() {
  return Math.random() * 1000;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  lastId: number = 2;
  taskFilter: TaskFilter = new TaskFilter();
  storedTasks: Task[] = [
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 0,
      completed: false
    },
    {
      id: 1,
      description: "Move the desk to the new location",
      assigneeId: 1,
      completed: false
    },
    {
      id: 2,
      description: "Buy everyone an icecream",
      assigneeId: 2,
      completed: true
    }
  ];
  storedUsers: User[] = [
    { id: 0, name: "Mike" },
    { id: 1, name: "James" },
    { id: 2, name: "Viktor" }
  ];

  constructor() {

  }

  private storedTasks$ = new BehaviorSubject<Task[]>(this.storedTasks);
  tasks$(): Observable<Task[]> {
    return combineLatest([
      this.storedTasks$.asObservable(),
      this.filters$()
    ]).pipe(
      map(([tasks, filter]) => {
        let result: Task[] = tasks || [];
        result = this.filterTask(result, filter);
        return result
      }),
      delay(randomDelay())
    )
  }

  private filterTask(value: Task[], filter: TaskFilter): Task[] {
    return value.filter(task => {
      return (
        task.description.toUpperCase().indexOf(filter.searchString.toUpperCase()) > -1 && (filter.completed !== null ? filter.completed === task.completed : task)
      );
    });
  }

  private taskFilter$ = new BehaviorSubject<TaskFilter>(this.taskFilter);
  filters$(): Observable<TaskFilter> {
    return this.taskFilter$.asObservable().pipe(delay(randomDelay()))
  }

  setFilters(value: TaskFilter) {
    this.taskFilter$.next(value)
  }

  private findTaskById = (id: number) =>
    this.storedTasks.find(task => task.id === +id);

  private findUserById = (id: number) => this.storedUsers.find(user => user.id === +id);

  getRandomDescription(): string {
    const rand: string[] = [
      "Clean the board every morning at 8AM.",
      "Shut the machine when you're back home.",
      "Turn-off the AC before leaving.",
    ];
    return rand[Math.floor(Math.random() * rand.length)];
  }

  taskById$(id: number): Observable<Task> {
    return of(this.findTaskById(id)).pipe(delay(randomDelay()));
  }

  users$(): Observable<User[]> {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  user$(id: number): Observable<User> {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  newTask$(newTask: Task): Observable<Task> {
    this.storedTasks = this.storedTasks.concat(newTask);
    this.storedTasks$.next(this.storedTasks);
    return of(newTask).pipe(delay(randomDelay()));
  }

  getNewTask$(payload: { description: string }) {
    return of({
      id: ++this.lastId,
      description: payload.description,
      assigneeId: null,
      completed: false
    })
  }

  assignTask$(taskId: number, userId: number): Observable<Task> {
    return this.updateTask$(taskId, { assigneeId: userId });
  }

  completeTask$(taskId: number, completed: boolean): Observable<Task> {
    return this.updateTask$(taskId, { completed });
  }

  updateTask$(taskId: number, updates: Partial<Omit<Task, "id">>): Observable<Task> {
    const foundTask = this.findTaskById(taskId);

    if (!foundTask) {
      return throwError(new Error("task not found"));
    }

    const updatedTask = { ...foundTask, ...updates };

    this.storedTasks = this.storedTasks.map(t =>
      t.id === taskId ? updatedTask : t
    );
    this.storedTasks$.next(this.storedTasks);
    return of(updatedTask).pipe(delay(randomDelay()));
  }

  taskList$(): Observable<TaskList[]> {
    return combineLatest(
      [
        this.tasks$(),
        this.users$()
      ]
    ).pipe(
      map(([tasks, users]) => {
        return tasks.map(r => this.mapTaskToTaskList(r, users))
      })
    )
  }

  private mapTaskToTaskList(task: Task, users: User[]): TaskList {
    const user: User = users.find(r => r.id === task.assigneeId);
    return { ...task, assigneeDescription: `${user?.name || ""}`.trim() }
  }

}
