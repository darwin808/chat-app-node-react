import "./App.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  BrowserRouter,
  Switch,
  useLocation,
} from "react-router-dom";
import Login from "./Page/Login";
import Home from "./Page/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Switch>
            <Route path="/chat" exact render={() => <Home />} />

            <Route path="/" exact render={() => <Login />} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
