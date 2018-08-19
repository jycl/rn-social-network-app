import { observable, computed, toJS, action } from "mobx";
import { getTodosForUser } from "../services/APIService";

/**
 * TodoStore is an MobX store that manages the state values of components related
 * to the todo list to display.
 *
 * State params:
 * @param {Array} rawTodoList Array of todos for user retrieved from backend API
 * @param {Array} todoList list of todos that has been converted from MobX object
 */
class TodoStore {
  @observable
  rawTodoList = [];

  /**
   * Retrieve user list from backend and save to store
   */
  @action
  loadTodoList = userId => {
    getTodosForUser(userId).then(todos => {
      this.rawTodoList = todos;
    });
  };

  @computed
  get todoList() {
    return toJS(this.rawTodoList);
  }
}
const todoStore = new TodoStore();
export default todoStore;
