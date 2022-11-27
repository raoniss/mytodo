export class Todo {
  description: string;
  createddate: any;
  executeddate: any;

  constructor(description: string, executeddate: any) {
    this.description = description;
    this.createddate = Date.now();
    this.executeddate = executeddate;
  }
}
