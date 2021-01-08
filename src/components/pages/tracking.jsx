import { Button, Alert } from "react-bootstrap";
import React, { Component } from "react";
import { useAuth } from "../../contexts/AuthContext";

class Tracking extends Component {
  state = {
    error: "",
  };

  handleLogout = () => {};
  render() {
    const { error } = this.state;
    return (
      <div>
        <h1>Tracking Component</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <strong>Email: </strong>
        <Button variant="link" onClick={this.handleLogout}>
          Log Out
        </Button>
      </div>
    );
  }
}

export default Tracking;
