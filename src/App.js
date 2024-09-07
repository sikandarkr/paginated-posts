import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaSearch,
} from "react-icons/fa";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskInput.trim()) {
      if (editId) {
        setTasks(
          tasks.map((task) =>
            task.id === editId ? { ...task, text: taskInput } : task
          )
        );
        setEditId(null);
      } else {
        setTasks([
          ...tasks,
          { id: uuidv4(), text: taskInput, completed: false },
        ]);
      }
      setTaskInput("");
    }
  };

  const handleDeleteTask = (id) => {
    setDeleteId(id);
    setTimeout(() => {
      setTasks(tasks.filter((task) => task.id !== id));
      setDeleteId(null);
    }, 500); // Delay to show the animation
  };

  const handleEditTask = (task) => {
    setTaskInput(task.text);
    setEditId(task.id);
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSort = () => {
    const sortedTasks = [...tasks].sort((a, b) =>
      sortAsc ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
    );
    setTasks(sortedTasks);
    setSortAsc(!sortAsc);
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Todo List</h1>

      <div className="search-sort">
        <div className="search-bar">
          <FaSearch className="icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="sort-button" onClick={handleSort}>
          {sortAsc ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
        </button>
      </div>

      <div className="task-input">
        <input
          type="text"
          placeholder="Add or edit a task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={handleAddTask}>
          <FaPlus />
        </button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`${task.completed ? "completed" : ""} ${
              deleteId === task.id ? "breaking" : ""
            }`}
          >
            <span onClick={() => handleToggleComplete(task.id)}>
              {task.text}
            </span>
            <div className="actions">
              <button className="edit-btn" onClick={() => handleEditTask(task)}>
                <FaEdit />
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteTask(task.id)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
