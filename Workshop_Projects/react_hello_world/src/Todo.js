import React, { useState } from "react";

// Define the TodoForm component that takes addTodo function as a prop
const TodoForm = (props) => {
  const addTodo = props.addTodo;
  // Declare a state variable called newTodo and a function to update it called setNewTodo, initialized to an empty string
  const [newTodo, setNewTodo] = useState("");

  // Define the OnSubmit function that will be called when the form is submitted
  const OnSubmit = (event) => {
    // Prevent the default form submission behavior, no refresh
    event.preventDefault();
    // Call the addTodo function with the current newTodo value
    addTodo(newTodo);
    // Reset the newTodo state to an empty string
    setNewTodo('');
    // console.log(newTodo);
  }

  // Render the TodoForm component
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
  // Destructure the todoList prop  
  const todos = props.todoList

  // Render the TodoList component
  return (
    <div className="todo-list">
      {/* Map over the todos array and create an h3 element for each todo */}
      {todos.map((todo,index)=>{
        // Return the h3 element with the todo text and a unique key based on the index
        return <h3 key={index}>{todo}</h3>
      })}
    </div>
  );
};

const Todo = (props) => {
  // Declare a state variable called todoList and a function to update it called setTodoList, initialized to an empty array
  const [todoList, setTodoList] = useState([]);
  
  // Define the addTodo function that takes a todo as an argument and updates the todoList state
  function addTodo(todo) {
    // Create a copy of the current todoList state
    const copy = [...todoList];
    // Add the new todo to the copy
    copy.push(todo);
    // Update the todoList state with the new copy
    setTodoList(copy);

  }
  
  // Render the main Todo component
  return (
    <div className="todo">
      
      {/* Render the TodoForm component and pass the addTodo function as a prop */}
      <TodoForm addTodo={addTodo}/>

      {/* Render the TodoList component and pass the todoList state as a prop */}
      <TodoList todoList={todoList}/>
    </div>
  );
};

export default Todo;