export class Task {
  constructor(
    public _id?: number,
    public taskName?: string,
    public done?: boolean
  ) {}
  public static serializeTask(json: any): Task {
    return new this(json.id, json.taskName, json.done);
  }
}
