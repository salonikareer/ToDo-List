import React, { useEffect, useState } from "react";
import Todo from "../src/componenets/Todo";
import { addToDo, deleteTodo, getAllToDo, updateTodo } from "../src/utils/HadleApi";

function App() {
  const [todo, setToDo] = useState([]);
  const [text, settext] = useState("");
  const [isupdating, setisupdating] = useState(false);
  const [todoid, settodoid] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const updateMode = (_id, text) => {
    setisupdating(true);
    settext(text);
    settodoid(_id);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      isupdating
        ? updateTodo(todoid, text, setToDo, settext, setisupdating)
        : addToDo(text, settext, setToDo);
    }
  };

  const handleDeleteTodo = (todoId) => {
    deleteTodo(todoId)
      .then(() => {
        const updatedTodos = todo.filter((item) => item._id !== todoId);
        setToDo(updatedTodos);
      })
      .catch((error) => console.error('Error deleting todo:', error));
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo List</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add Todos.."
            value={text}
            onChange={(e) => settext(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className="add"
            onClick={() =>
              isupdating
                ? updateTodo(todoid, text, setToDo, settext, setisupdating)
                : addToDo(text, settext, setToDo)
            }
          >
            {isupdating ? "Update" : "Add"}
          </button>
        </div>
        <div className="list">
          {todo.map((item) => (
            <Todo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteTodo={() => handleDeleteTodo(item._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
