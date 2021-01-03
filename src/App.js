import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Calendar from "./components/pages/calendar";
import Chat from "./components/pages/chat";
import Registration from "./components/pages/registration";
import Search from "./components/pages/search";
import Tracking from "./components/pages/tracking";
import NavBar from "./components/tools/navBar";
import authService from "./services/authService";
import NotFound from "./components/pages/notFound";

import "./App.css";
import Records from "./components/pages/records";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = authService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <BrowserRouter>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/calendar" component={Calendar} />
            <Route path="/chat" component={Chat} />
            <Route path="/registration" component={Registration} />
            <Route path="/search" component={Search} />
            <Route path="/tracking" component={Tracking} />
            <Route path="/records" component={Records} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/tracking" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
