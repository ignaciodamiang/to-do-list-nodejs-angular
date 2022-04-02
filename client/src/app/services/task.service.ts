import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  public obtainAllTheTasksToDo(folderId: number): Promise<Array<Task>> {
    return this.http
      .get(environment.API + '/api/taskstodo/' + folderId, {})
      .toPromise()
      .then((data: any) => {
        const datas = Array.from(data);
        return datas.map((task) => {
          return Task.serializeTask(task);
        });
      });
  }

  public obtainAllTheTasksDone(folderId: number): Promise<Array<Task>> {
    return this.http
      .get(environment.API + '/api/tasksdone/' + folderId, {})
      .toPromise()
      .then((data: any) => {
        const datas = Array.from(data);
        return datas.map((task) => {
          return Task.serializeTask(task);
        });
      });
  }

  public addTask(newTaskName: string, folderId: number): any {
    return this.http
      .post(environment.API + '/api/tasks/new', {
        taskName: newTaskName,
        folderId: folderId,
      })
      .toPromise();
  }

  public deleteTask(taskId: number) {
    return this.http
      .delete(environment.API + '/api/tasks/' + taskId, {})
      .toPromise();
  }

  public editTaskName(taskName: string, taskId: number) {
    return this.http
      .patch(environment.API + '/api/tasks/' + taskId, {
        taskName: taskName,
      })
      .toPromise();
  }

  public done(done: Boolean, taskId: number) {
    return this.http
      .patch(environment.API + '/api/tasks/' + taskId, {
        done: done,
      })
      .toPromise();
  }
}
