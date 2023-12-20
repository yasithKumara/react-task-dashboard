// src/components/UpdateTaskPage.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateTask } from "../tasksSlice";
import UpdateTaskForm from "./UpdateTaskForm";
import { Link } from "react-router-dom";

const UpdateTaskPage = () => {
  const dispatch = useDispatch();
  const { taskId } = useParams();
  const task = useSelector((state) =>
    state.tasks.tasks.find((t) => t.id === parseInt(taskId, 10))
  );

  if (!task) {
    // Handle task not found
    return <div>Task not found</div>;
  }

  const handleUpdateTask = (updatedTask) => {
    dispatch(updateTask({ id: task.id, task: updatedTask }));
  };

  return (
    <div>
      <div className="flex-middle">
      <Link to={`/`}><h2>Dashboard</h2></Link> <h2>-{'>'}</h2> <h2>Update Task</h2>
      </div>

      <UpdateTaskForm task={task} onUpdateTask={handleUpdateTask} />
    </div>
  );
};

export default UpdateTaskPage;
