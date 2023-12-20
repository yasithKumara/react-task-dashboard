// src/tasksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/tasks";

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
        // Server returned validation errors
        return Promise.reject(error.response ? error.response.data : error.message);
      }
    throw error;
  }
});

// Async thunk to add a new task
export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  try {
    const response = await axios.post(API_BASE_URL, task);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
        // Server returned validation errors
        return Promise.reject(error.response ? error.response.data : error.message);
      }
    throw error;
  }
});

// Async thunk to fetch a single task by ID
export const fetchTaskById = createAsyncThunk(
    "tasks/fetchTaskById",
    async (id) => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 400) {
            // Server returned validation errors
            return Promise.reject(error.response ? error.response.data : error.message);
          }
        throw error;
      }
    }
  );

// Async thunk to update a task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, task }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, task);
      return response.data;
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Server returned validation errors
            return Promise.reject(error.response ? error.response.data : error.message);
          }
      throw error;
    }
  }
);

// Async thunk to delete a task
export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    return id;
  } catch (error) {
    if (error.response && error.response.status === 400) {
        // Server returned validation errors
        return Promise.reject(error.response ? error.response.data : error.message);
      }
    throw error;
  }
});

// Create a tasks slice
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTaskById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedTask = action.payload;
      })
      .addCase(fetchTaskById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default tasksSlice.reducer;
