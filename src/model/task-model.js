import { TASKS } from "../mock/task.js";
import { generateID } from "../utils.js";
import { TaskStatus } from "../const.js";

export default class TaskModel {
  #boardtasks = TASKS;
  #observers = [];

  get tasks() {
    return this.#boardtasks;
  }

  getTasksByStatus(status) {
    return this.#boardtasks.filter((task) => task.status === status);
  }

  addTask(title) {
    const newTask = {
      id: generateID(this.#boardtasks),
      title: title,
      status: TaskStatus.BACKLOG,
    };

    this.#boardtasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  clearBasket() {
    this.#boardtasks = this.#boardtasks.filter(
      (task) => task.status !== TaskStatus.BASKET
    );
    this._notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter((obs) => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach((observer) => observer());
  }

  updateTaskStatus(taskId, newStatus, insertPosition = null) {
    const task = this.#boardtasks.find(task => task.id === taskId);
    if (task) {
      this.#boardtasks = this.#boardtasks.filter(t => t.id !== taskId);
      
      task.status = newStatus;
      
      if (insertPosition && insertPosition.type === 'before') {
        const targetIndex = this.#boardtasks.findIndex(t => t.id === insertPosition.elementId);
        
        console.log(`${taskId} ${newStatus} ${targetIndex}`)
        if (targetIndex !== -1) {
          this.#boardtasks.splice(targetIndex, 0, task);
        } else {
          this.#boardtasks.push(task);
        }
      } else {
        this.#boardtasks.push(task);
      }
      
      this._notifyObservers();
    } 
  }
}