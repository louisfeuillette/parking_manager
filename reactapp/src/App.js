import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import Login from "./pages/Login"
import DashboardAdmin from "./pages/DashboardAdmin"
import DashboardUser from "./pages/DashboardUser"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard-admin" component={DashboardAdmin} />
        <Route exact path="/dashboard-user" component={DashboardUser} />
      </Switch>
    </Router>
  );
}

export default App;
