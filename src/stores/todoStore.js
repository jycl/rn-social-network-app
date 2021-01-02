import { observable, computed, toJS, action, makeObservable } from "mobx";
import { getTodosForUser } from "../services/APIService";

/**
 * TodoStore is an MobX store that manages the state values of components related
 * to the todo list to display.
 *
 * State params / getters:
 * @param {Array} rawTodoList Array of todos for user retrieved from backend API
 * @param {Array} todoList list of todos that has been converted from MobX object
 */
class TodoStore {
  rawTodoList = [];

  constructor() {
    makeObservable(this, {
      rawTodoList: observable,
      setTodoList: action,
      clearData: action,
      todoList: computed,
    });
  }
  
  /**
   * Retrieve user list from backend and save to store
   */
  loadTodoList = userId => getTodosForUser(userId).then(this.setTodoList);

  setTodoList = todos => this.rawTodoList = todos;

  clearData() {
    this.rawTodoList = [];
  }

  get todoList() {
    return toJS(this.rawTodoList);
  }
}

export default TodoStore;
