// src/components/UpdateTaskForm.js
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  description: Yup.string().required("Description is required"),
  priority: Yup.number()
    .required("Priority is required")
    .positive("Priority must be a positive number"),
  status: Yup.string().required("Status is required"),
});

const UpdateTaskForm = ({ task, onUpdateTask }) => {
  const formik = useFormik({
    initialValues: {
      description: task.description,
      priority: task.priority,
      status: task.status,
    },
    validationSchema,
    onSubmit: (values) => {
      onUpdateTask(values);
    },
  });

  return (
    <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label className="form-label" htmlFor="description">
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className="form-input"
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error">{formik.errors.description}</div>
          )}
        </div>

        <div>
          <label className="form-label" htmlFor="priority">
            Priority:
          </label>
          <select
            id="priority"
            name="priority"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.priority}
            className="form-input"
          >
            <option value={3}>Low</option>
            <option value={2}>Medium</option>
            <option value={1}>High</option>
          </select>
          {formik.touched.priority && formik.errors.priority && (
            <div className="error">{formik.errors.priority}</div>
          )}
        </div>

        <div>
          <label className="form-label" htmlFor="status">
            Status:
          </label>
          <select
            id="status"
            name="status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
            className="form-input"
          >
            <option value="">Select Status</option>
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Blocked">Blocked</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
            {/* Add other status options as needed */}
          </select>
          {formik.touched.status && formik.errors.status && (
            <div className="error">{formik.errors.status}</div>
          )}
        </div>

        <div className="flex-middle">
          <button type="submit" className="add-task-link">
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTaskForm;
