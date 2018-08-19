import todoStore from "../todoStore";

describe("TodoStore tests ", () => {
  it("Snapshot test of TodoStore", () => {
    expect(todoStore).toMatchSnapshot();
  });

  it("Check initial state values", () => {
    expect(todoStore.rawTodoList).toHaveLength(0);
    expect(todoStore.todoList).toHaveLength(0);
  });
});
