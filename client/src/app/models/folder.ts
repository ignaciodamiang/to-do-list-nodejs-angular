export class Folder {
  constructor(public _id?: number, public folderName?: string) {}

  public static serializeFolder(json: any): Folder {
    return new this(json.id, json.folderName);
  }
}
