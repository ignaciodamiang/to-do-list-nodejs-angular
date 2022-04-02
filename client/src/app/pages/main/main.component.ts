import { Component, OnInit } from '@angular/core';
import { FolderService } from 'src/app/services/folder.service';
import { Folder } from 'src/app/models/folder';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public task: any;
  public folders: Array<Folder> | undefined;
  public folderId: any;
  public newFolderName: any;
  public editedFolderName: any;
  public folderName: any;
  folderForm: FormGroup;
  constructor(
    private folderService: FolderService,
    private _builder: FormBuilder
  ) {
    this.folderForm = this._builder.group({
      folderName: this.folderName,
    });
  }

  ngOnInit(): void {
    this.obtainFolders();
  }

  public obtainFolders() {
    return this.folderService
      .obtainAllTheFolders()
      .then((obtainedFolders) => {
        console.log(obtainedFolders);
        return (this.folders = obtainedFolders);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public addFolder() {
    this.folderService.addFolder(this.newFolderName);
    window.location.reload();
  }

  public deleteFolder(folderId: any) {
    this.folderService.deleteFolder(folderId);
    window.location.reload();
  }

  public editFolderName(editedFolderName: string) {
    this.folderService.editFolderName(editedFolderName, this.folderId);
  }
}
