import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Calendar from "./components/pages/calendar";
import Chat from "./components/pages/chat";
import Registration from "./components/pages/Registration";
import Providers from "./components/pages/providers";
import Tracking from "./components/pages/tracking";
import NavBar from "./components/UI/navBar";
import authService from "./services/authService";
import NotFound from "./components/pages/notFound";

import "./App.css";
import Records from "./components/pages/records";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";

class App extends Component {
  state = {};

  render() {
    const { user } = this.state;

    return (
      <AuthProvider>
        <BrowserRouter>
          {console.log(".env test:", process.env.REACT_APP_TEST)}
          <ToastContainer />
          <NavBar user={user} />
          <Container fluid>
            <Switch>
              <Route path="/calendar" component={Calendar} />
              <Route path="/chat" component={Chat} />
              <Route path="/registration" component={Registration} />
              <Route path="/search" component={Providers} />
              <Route path="/tracking" component={Tracking} />
              <Route path="/records" component={Records} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/tracking" />
              <Redirect to="/not-found" />
            </Switch>
          </Container>
        </BrowserRouter>
      </AuthProvider>
    );
  }
}

export default App;
