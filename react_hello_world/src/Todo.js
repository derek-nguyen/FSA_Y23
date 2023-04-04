import React, { useState } from "react";

const TodoForm = (props) => {
  const addTodo = props.addTodo;
  const [newTodo, setNewTodo] = useState("");
  return (
    <form className="todo-form">
      <input
        //
        type="text"
        //
        value={newTodo}
        //
        placeholder="What do you need to do?"
        //
        onChange={(event) => {
          setNewTodo(event.target.value);
          console.log(newTodo);
          event.preventDefault();
        }}
      />
      <button>Add Todo</button>
    </form>
  );
};

const TodoList = (props) => {
  return <div className="todo-list"></div>;
};

const Todo = (props) => {
  const [todoList, setTodoList] = useState([]);

  function addTodo(todo) {
    const copy = [...todoList];
    copy.push(todo);
    setTodoList(copy);
    // make a copy of todoList, you could use let copy = [...todoList], or any other method
    // push todo into the copy
    // call setTodoList with the copy
  }

  return (
    <div className="todo">
      <TodoForm />
      <TodoList />
    </div>
  );
};
// let todoTasks = []
//   const [todoTasks, addRemoveTask] = useState([]);
//   return (
//     <div className="todo">
//       <TodoForm />
//       <TodoList />
//     </div>
//   );
// };

export default Todo;
