import React, { useState } from "react";
import "./index.css";

function AppContainer() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  const addTask = () => {
    if (taskInput.trim() !== "") {
      const addTasks = [
        ...tasks,
        { id: Date.now(), text: taskInput, completed: false },
      ];
      setTasks(addTasks);
      setTaskInput("");
    }
  };

  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const [selectedTab, setSelectedTab] = useState("All");

  const filterTodos = () => {
    if (selectedTab === "All") {
      return tasks;
    } else if (selectedTab === "Active") {
      return tasks.filter((tasks) => tasks.completed === false);
    } else if (selectedTab === "Completed") {
      return tasks.filter((tasks) => tasks.completed === true);
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="App">
      <h1>#todo</h1>
      
      <div className="header">
        <button onClick={() => handleTabClick("All")}>All</button>
        <button onClick={() => handleTabClick("Active")}>Active</button>
        <button onClick={() => handleTabClick("Completed")}>Completed</button>
      </div>

      <div className="task">
        <input
          className="border-4 rounded-lg mr-4"
          type="text"
          placeholder="Enter a task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="border-solid border-2 rounded-lg border-indigo-600 bg-blue-500"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      <div className="list-todo">
        <ul>
          {filterTodos().map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.id)}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AppContainer;
