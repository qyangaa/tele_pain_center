import React, { Component } from "react";
import getProviders from "../../services/providerService";
class Providers extends Component {
  state = {};
  render() {
    const providers = getProviders();
    console.log(providers);
    return <h1>Providers Component</h1>;
  }
}

export default Providers;
