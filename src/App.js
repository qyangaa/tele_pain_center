import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Calendar from "./components/pages/calendar";
import Chat from "./components/pages/Chat";
import Registration from "./components/pages/Registration";
import Providers from "./components/pages/providers";
import Tracking from "./components/pages/tracking";
import NavBar from "./components/UI/navBar";
import NotFound from "./components/pages/notFound";
import Dashboard from "./components/pages/Dashboard";
import ForgotPassword from "./components/pages/ForgotPassword";

import "./App.css";
import Records from "./components/pages/records";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/pages/Login";
import ProtectedRoute from "./components/common/ProtectedRoute";
import UpdateProfile from "./components/pages/UpdateProfile";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { getRrfProps } from "./services/Firebase/firebase";

const store = ConfigureStore();

class App extends Component {
  state = {};
  render() {
    const { user } = this.state;

    return (
      <Provider store={store}>
        <BrowserRouter>
          {console.log(".env test:", process.env.REACT_APP_TEST)}
          {console.log({ ...getRrfProps(store) })}
          <ToastContainer />
          <NavBar user={user} />
          <Container fluid>
            <ReactReduxFirebaseProvider {...getRrfProps(store)}>
              <Switch>
                <Route path="/calendar" component={Calendar} />
                <Route path="/chat" component={Chat} />
                <Route path="/registration" component={Registration} />
                <ProtectedRoute path="/dashboard" component={Dashboard} />
                <ProtectedRoute
                  path="/update-profile"
                  component={UpdateProfile}
                />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Route path="/login" component={Login} />
                <Route path="/search" component={Providers} />
                <Route path="/tracking" component={Tracking} />
                <Route path="/records" component={Records} />
                <Route path="/not-found" component={NotFound} />
                <Redirect from="/" exact to="/tracking" />
                <Redirect to="/not-found" />
              </Switch>
            </ReactReduxFirebaseProvider>
          </Container>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
