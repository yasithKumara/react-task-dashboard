// src/components/AddTaskPage.js
import React from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../tasksSlice";
import AddTaskForm from "./AddTaskForm";
import { Link } from "react-router-dom";

const AddTaskPage = () => {
  const dispatch = useDispatch();

  const handleAddTask = (task) => {
    dispatch(addTask(task))
      .unwrap()
      .then(() => {
        // Task added successfully
      })
      .catch((rejectedValueOrSerializedError) => {
        if ("error" in rejectedValueOrSerializedError) {
          // Handle server-side validation errors
          console.error(rejectedValueOrSerializedError.error);
        } else {
          // Handle other errors
          console.error(rejectedValueOrSerializedError);
        }
      });
  };

  return (
    <div>
      <div className="flex-middle">
      <Link to={`/`}><h2>Dashboard</h2></Link> <h2>-{'>'}</h2> <h2>Add Task</h2>
      </div>

      <AddTaskForm onAddTask={handleAddTask} />
      
    </div>
  );
};

export default AddTaskPage;
