import todoStore from "../todoStore";

describe("TodoStore tests ", () => {
  it("Snapshot test of TodoStore", () => {
    expect(todoStore).toMatchSnapshot();
  });

  it("Check initial state values and changes", () => {
    expect(todoStore.rawTodoList).toHaveLength(0);
    expect(todoStore.todoList).toHaveLength(0);

    const testTodoList = [
      {
        id: 1,
        title: "Jogging",
        completed: true
      },
      {
        id: 2,
        title: "Laundry",
        completed: false
      }
    ];
    todoStore.loadTodoList = jest.fn().mockImplementation(() => {
      todoStore.rawTodoList = testTodoList;
    });

    todoStore.loadTodoList("1");
    expect(todoStore.todoList).toHaveLength(2);
    expect(todoStore.todoList[0].completed).toBe(true);

    todoStore.clearData();
    expect(todoStore.todoList).toHaveLength(0);
  });
});
