import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { FolderService } from 'src/app/services/folder.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task';
import { Folder } from 'src/app/models/folder';
import { FormBuilder, FormGroup } from '@angular/forms';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
})
export class FolderComponent implements OnInit {
  public userId: any;
  public folderId: any;
  public folders: Array<Folder> | undefined;
  public editedFolderName: any;
  public folderName: any;
  folderForm: FormGroup;

  @Input('data') folder: any;
  @Output() delete = new EventEmitter<number>();
  constructor(
    private folderService: FolderService,
    private route: ActivatedRoute,
    private _builder: FormBuilder
  ) {
    this.folderForm = this._builder.group({
      taskName: this.folderName,
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.user_id;
    this.obtainFolders();
  }

  public obtainFolders() {
    return this.folderService
      .obtainFolders(this.userId)
      .then((obtainedFolders) => {
        return (this.folders = obtainedFolders);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public deleteFolder(folder: Folder) {
    this.folderId = folder._id;
    this.folderService.deleteFolder(this.folderId);
    window.location.reload();
  }

  public editFolderName() {
    this.folderService.editFolderName(this.editedFolderName, this.folderId);
    window.location.reload();
  }

  public updateFolder(folder: Folder) {
    this.folderId = folder._id;
  }
}
