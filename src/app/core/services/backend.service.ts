import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable, of, throwError } from "rxjs";
import { delay, map } from "rxjs/operators";
import { Task, TaskList } from "../models/task";
import { User } from "../models/user";


function randomDelay() {
  return Math.random() * 1000;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  lastId: number = 1;
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

  constructor() {

  }

  private storedTasks$ = new BehaviorSubject<Task[]>(this.storedTasks);

  tasks$(): Observable<Task[]> {
    return this.storedTasks$.asObservable().pipe(delay(randomDelay()));
  }

  storedUsers: User[] = [
    { id: 0, name: "Mike" },
    { id: 1, name: "James" },
    { id: 2, name: "Viktor" }
  ];

  private findTaskById = (id: number) =>
    this.storedTasks.find(task => task.id === +id);

  private findUserById = (id: number) => this.storedUsers.find(user => user.id === +id);

  getRandomDescription(): string {
    const rand: string[] = [
      "Clean the board every morning at 8AM.", 
      "Shut the machine when you're back home.", 
      "Improve the list detail page.", 
      "Implement the bank entry screen"
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

  newTask$(payload: { description: string }): Observable<Task> {
    const newTask: Task = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: null,
      completed: false
    };

    this.storedTasks = this.storedTasks.concat(newTask);
    this.storedTasks$.next(this.storedTasks);

    return of(newTask).pipe(delay(randomDelay()));
  }

  /**
   * 
   * @param taskId 
   * @param userId 
   * @returns updated task
   */
  assignTask$(taskId: number, userId: number): Observable<Task> {
    return this.updateTask$(taskId, { assigneeId: userId });
  }

  /**
   * 
   * @param taskId 
   * @param userId 
   * @returns updated task
   */
  completeTask$(taskId: number, completed: boolean): Observable<Task> {
    return this.updateTask$(taskId, { completed });
  }

  /**
   * 
   * @param taskId 
   * @param userId 
   * @returns updated task
   */
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
