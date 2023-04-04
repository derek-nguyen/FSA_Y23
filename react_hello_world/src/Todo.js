import React, { useState } from "react";

const TodoForm = (props) => {
  const addTodo = props.addTodo;
  const [newTodo, setNewTodo] = useState("");

  const OnSubmit = (event) => {
    event.preventDefault();
    addTodo(newTodo);
    setNewTodo('');
    // console.log(newTodo);
  }

  return (
    <form className="todo-form" onSubmit={OnSubmit}>
      <input
        type="text"
        value={newTodo}
        placeholder="What do you need to do?"
        onChange={(event) => {
          setNewTodo(event.target.value)
          // console.log(newTodo)
        }} />
      <button type='submit'>Add Todo</button>
    </form>
  );
};

const TodoList = (props) => {
  const todos = props.todoList

  return (
    <div className="todo-list">
      {todos.map((todo,index)=>{
        return <h3 key={index}>{todo}</h3>
      })}
    </div>
  );
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
      <TodoForm addTodo={addTodo}/>
      <TodoList todoList={todoList}/>
    </div>
  );
};

export default Todo;
