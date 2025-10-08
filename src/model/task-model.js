import { TASKS } from "../mock/task.js";

export default class TaskModel {
  constructor() {
    this.tasks = TASKS;
  }

  getTasks() {
    return this.tasks;
  }

  getTasksByStatus(status) {
    return this.tasks.filter((task) => task.status === status);
  }
}
