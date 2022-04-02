import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FolderService } from 'src/app/services/folder.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  public folder: any;
  public taskId: any;
  public tasksToDo: Array<Task> | undefined;
  public tasksDone: Array<Task> | undefined;
  public editedTaskName: any;
  public taskDone: any;
  public existsTasksToDo!: boolean;
  public existsTasksDone!: boolean;
  @Input('data') task: any;
  @Output() delete = new EventEmitter<number>();
  constructor(
    private taskService: TaskService,
    private folderService: FolderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.folderService.obtainFolder(id).then((folder: any) => {
      this.folder = folder;
      this.obtainTasksToDo();
      this.obtainTasksDone();
    });
  }

  public obtainTasksToDo() {
    return this.taskService
      .obtainAllTheTasksToDo(this.folder.id)
      .then((obtainedTasks) => {
        return (this.tasksToDo = obtainedTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public obtainTasksDone() {
    return this.taskService
      .obtainAllTheTasksDone(this.folder.id)
      .then((obtainedTasks) => {
        return (this.tasksDone = obtainedTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public deleteTask(task: Task) {
    this.taskId = task._id;
    this.taskService.deleteTask(this.taskId);
    window.location.reload();
  }

  public editTaskName() {
    this.taskService.editTaskName(this.editedTaskName, this.taskId);
    window.location.reload();
  }

  public updateTaskName(task: Task) {
    this.taskId = task._id;
  }

  public done(task: Task) {
    this.taskId = task._id;
    this.taskDone = task.done;
    if (this.taskDone) {
      this.taskService.done(false, this.taskId);
      window.location.reload();
    } else {
      this.taskService.done(true, this.taskId);
      window.location.reload();
    }
  }
}
