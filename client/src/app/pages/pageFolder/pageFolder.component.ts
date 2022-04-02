import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FolderService } from 'src/app/services/folder.service';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/task';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-page-folder',
  templateUrl: './pageFolder.component.html',
  styleUrls: ['./pageFolder.component.css'],
})
export class PageFolderComponent implements OnInit {
  public folder: any;
  public tasks: Array<Task> | undefined;
  public taskName: any;
  public taskDone: any;
  public newTaskName: any;
  taskForm: FormGroup;
  public taskId: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private folderService: FolderService,
    private taskService: TaskService,
    private _builder: FormBuilder
  ) {
    this.taskForm = this._builder.group({
      taskName: this.taskName,
      taskDone: this.taskDone,
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') == null) {
      this.router.navigate(['/']);
    }
    let id = this.route.snapshot.params.id;
    this.folderService.obtainFolder(id).then((folder: any) => {
      this.folder = folder;
      this.obtainTasks();
    });
  }

  public obtainTasks() {
    return this.taskService
      .obtainAllTheTasksToDo(this.folder.id)
      .then((obtainedTasks) => {
        return (this.tasks = obtainedTasks);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public addTask() {
    this.taskService.addTask(this.newTaskName, this.folder.id);
    window.location.reload();
  }

  public deleteTask(taskId: any) {
    this.taskService.deleteTask(taskId);
    window.location.reload();
  }
}
