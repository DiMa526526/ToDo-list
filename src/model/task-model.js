import Observable from "../framework/observable.js";
import { TaskStatus, UserAction } from "../const.js";

export default class TaskModel extends Observable {
  #tasksApiService = null;
  #boardtasks = [];
  #taskOrder = new Map();

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    const tasks = this.#boardtasks.filter((task) => task.status === status);

    if (this.#taskOrder.has(status)) {
      const order = this.#taskOrder.get(status);
      tasks.sort((a, b) => {
        const indexA = order.indexOf(a.id);
        const indexB = order.indexOf(b.id);
        return indexA - indexB;
      });
    }

    return tasks;
  }

  deleteTask(taskId) {
    this.#boardtasks = this.#boardtasks.filter((task) => task.id != taskId);

    for (const [status, order] of this.#taskOrder.entries()) {
      const newOrder = order.filter((id) => id != taskId);
      this.#taskOrder.set(status, newOrder);
    }

    this._notify(UserAction.DELETE_TASK, { id: taskId });
  }

  hasBasketTasks() {
    return this.#boardtasks.some((task) => task.status === "basket");
  }

  async clearBasketTasks() {
    const basketTasks = this.#boardtasks.filter(
      (task) => task.status === "basket"
    );

    try {
      const deletePromises = basketTasks.map(async (task) => {
        try {
          await this.#tasksApiService.deleteTask(task.id);
          return { success: true, taskId: task.id };
        } catch (err) {
          if (err.message.includes("404")) {
            return { success: true, taskId: task.id };
          }
          throw err;
        }
      });

      await Promise.all(deletePromises);

      this.#boardtasks = this.#boardtasks.filter(
        (task) => task.status !== "basket"
      );

      this.#taskOrder.delete("basket");

      this._notify(UserAction.DELETE_TASK, { status: "basket" });
    } catch (err) {
      throw err;
    }
  }

  async updateTaskStatus(taskId, newStatus) {
    const task = this.#boardtasks.find((task) => task.id == taskId);
    if (task) {
      if (task.status === newStatus) {
        return;
      }

      const previousStatus = task.status;
      task.status = newStatus;

      if (this.#taskOrder.has(previousStatus)) {
        const oldOrder = this.#taskOrder
          .get(previousStatus)
          .filter((id) => id != taskId);
        this.#taskOrder.set(previousStatus, oldOrder);
      }

      if (!this.#taskOrder.has(newStatus)) {
        this.#taskOrder.set(newStatus, []);
      }
      this.#taskOrder.get(newStatus).push(taskId);

      try {
        const updatedTask = await this.#tasksApiService.updateTask(task);
        Object.assign(task, updatedTask);
        this._notify(UserAction.UPDATE_TASK, task);
      } catch (err) {
        task.status = previousStatus;
        throw err;
      }
    }
  }

  async reorderTask(taskId, status, afterTaskId = null) {
    const task = this.#boardtasks.find((task) => task.id == taskId);
    if (!task) return;

    const previousStatus = task.status;

    if (task.status !== status) {
      task.status = status;

      if (this.#taskOrder.has(previousStatus)) {
        const oldOrder = this.#taskOrder
          .get(previousStatus)
          .filter((id) => id != taskId);
        this.#taskOrder.set(previousStatus, oldOrder);
      }
    }

    if (!this.#taskOrder.has(status)) {
      this.#taskOrder.set(status, []);
    }

    const order = this.#taskOrder.get(status).filter((id) => id != taskId);

    if (afterTaskId) {
      const beforeIndex = order.indexOf(afterTaskId);
      if (beforeIndex !== -1) {
        order.splice(beforeIndex, 0, taskId);
      } else {
        order.push(taskId);
      }
    } else {
      order.push(taskId);
    }

    this.#taskOrder.set(status, order);

    if (previousStatus !== status) {
      try {
        const updatedTask = await this.#tasksApiService.updateTask(task);
        Object.assign(task, updatedTask);
      } catch (err) {
        task.status = previousStatus;

        const newOrder = this.#taskOrder
          .get(status)
          .filter((id) => id != taskId);
        this.#taskOrder.set(status, newOrder);

        if (!this.#taskOrder.has(previousStatus)) {
          this.#taskOrder.set(previousStatus, []);
        }
        this.#taskOrder.get(previousStatus).push(taskId);

        throw err;
      }
    }

    this._notify(UserAction.UPDATE_TASK, task);
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks;
      this.#boardtasks = tasks;

      this.#initializeTaskOrder();
    } catch (err) {
      this.#boardtasks = [];
    }
    this._notify("INIT");
  }

  #initializeTaskOrder() {
    Object.values(TaskStatus).forEach((status) => {
      const statusTasks = this.#boardtasks.filter(
        (task) => task.status === status
      );
      this.#taskOrder.set(
        status,
        statusTasks.map((task) => task.id)
      );
    });
  }

  async addTask(title) {
    const newTask = {
      title,
      status: TaskStatus.BACKLOG,
    };

    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardtasks.push(createdTask);

      if (!this.#taskOrder.has(TaskStatus.BACKLOG)) {
        this.#taskOrder.set(TaskStatus.BACKLOG, []);
      }
      this.#taskOrder.get(TaskStatus.BACKLOG).push(createdTask.id);

      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask;
    } catch (err) {
      throw err;
    }
  }
}
