import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Folder } from '../models/folder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  constructor(private http: HttpClient) {}

  public obtainAllTheFolders(): Promise<Array<Folder>> {
    return this.http
      .get(environment.API + '/api/folders', {})
      .toPromise()
      .then((data: any) => {
        const datas = Array.from(data);
        return datas.map((folder) => {
          return Folder.serializeFolder(folder);
        });
      });
  }

  public obtainFolders(userId: number): Promise<Array<Folder>> {
    return this.http
      .get(environment.API + '/api/folders', {})
      .toPromise()
      .then((data: any) => {
        const datas = Array.from(data);
        return datas.map((folder) => {
          return Folder.serializeFolder(folder);
        });
      });
  }

  public addFolder(newFolderName: any): any {
    return this.http
      .post(environment.API + '/api/folders/new', {
        folderName: newFolderName,
        userId: localStorage.user_id,
      })
      .toPromise();
  }

  public obtainFolder(idFolder: any): any {
    return this.http
      .get(environment.API + '/api/folders/' + idFolder)
      .toPromise();
  }

  public deleteFolder(folderId: number) {
    return this.http
      .delete(environment.API + '/api/folders/' + folderId, {})
      .toPromise();
  }

  public editFolderName(folderName: string, folderId: number) {
    return this.http
      .patch(environment.API + '/api/folders/' + folderId, {
        folderName: folderName,
      })
      .toPromise();
  }
}
