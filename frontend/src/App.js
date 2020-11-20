import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Register from "./LandingPage/Register";
import Login from "./LandingPage/Login";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  );
}

export default App;
