// src/components/TaskList.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, deleteTask } from "../tasksSlice";
import { Link } from "react-router-dom";
import "./styles.css"; // Import the CSS file
const _ = require("lodash");

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);

  const [tasksArr, setTasksArr] = useState([]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (tasks) {
      // Sort tasks by priority
      const sortedTasks = _.sortBy(tasks, "priority");

      // Group tasks by status
      const groupedTasks = _.flatMap(_.groupBy(sortedTasks, "status"));
      setTasksArr(groupedTasks);
    }
  }, tasks);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const handleDeleteTask = (taskId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (shouldDelete) {
      dispatch(deleteTask(taskId));
    }
  };

  const showPriority = (priority) => {
    const commonStyle = {
      borderRadius: "0.25rem",
      padding: "0.5rem",
      color: "#FFFFFF",
      display: "inline-block",
    };

    switch (priority) {
      case 1:
        return (
          <div style={{ ...commonStyle, backgroundColor: "#E74C3C" }}>
            High priority
          </div>
        );
      case 2:
        return (
          <div style={{ ...commonStyle, backgroundColor: "#FFA500" }}>
            Medium priority
          </div>
        );
      case 3:
        return (
          <div style={{ ...commonStyle, backgroundColor: "#FBF5C4" }}>
            Low priority
          </div>
        );
      default:
        return (
          <div style={{ ...commonStyle, backgroundColor: "#3498DB" }}>
            No priority set
          </div>
        );
    }
  };

  const showStatus = (status) => {
    const commonStyle = {
      borderRadius: "0.25rem",
      padding: "0.5rem",
      color: "#FFFFFF",
      display: "inline-block",
    };

    switch (status) {
      case "To-Do":
        return (
          <div style={{ ...commonStyle, backgroundColor: "#3498DB" }}>
            To-Do
          </div>
        );
      case "In Progress":
        return (
          <div style={{ ...commonStyle, backgroundColor: "#2ECC71" }}>
            In Progress
          </div>
        );
      case "Blocked":
        return (
          <div style={{ ...commonStyle, backgroundColor: "#E74C3C" }}>
            Blocked
          </div>
        );
      case "On Hold":
        return (
          <div style={{ ...commonStyle, backgroundColor: "#F39C12" }}>
            On Hold
          </div>
        );
      case "Completed":
        return (
          <div style={{ ...commonStyle, backgroundColor: "#27AE60" }}>
            Completed
          </div>
        );
      case "Canceled":
        return (
          <div style={{ ...commonStyle, backgroundColor: "#95A5A6" }}>
            Canceled
          </div>
        );
      default:
        return (
          <div style={{ ...commonStyle, backgroundColor: "#3498DB" }}>
            No status set
          </div>
        );
    }
  };

  return (
    <div className="container">
      <div className="flex-middle">
        <Link to="/add-task" className="add-task-link">
          Add Task
        </Link>
      </div>
      <ul className="task-list">
        {tasksArr &&
          tasksArr.map((task) => (
            <li key={task.id} className="task-item">
              <div className="list-container">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{showPriority(task.priority)}</span>
                  <span>{showStatus(task.status)}</span>
                </div>

                <span className="task-description">{task.description}</span>

                <div className="flex-end">
                  <Link to={`/update-task/${task.id}`} className="edit-button ">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TaskList;
