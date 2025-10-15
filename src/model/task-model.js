import { TASKS } from "../mock/task.js";

export default class TaskModel {
  #boardtasks = TASKS;

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter((task) => task.status === status);
  }
}
