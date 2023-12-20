// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import TaskList from "./components/TaskList";
import AddTaskPage from "./components/AddTaskPage";
import store from "./app/store";
import ErrorBoundary from "./components/ErrorBoundary";
import UpdateTaskPage from "./components/UpdateTaskPage";
import { Link } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <div className="App">
            <div className="flex-middle">
            <Link className="remove-link-style" to={`/`}><h1>Task Dashboard</h1></Link>
            </div>

            <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="/add-task" element={<AddTaskPage />} />
              <Route path="/update-task/:taskId" element={<UpdateTaskPage />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
}

export default App;
