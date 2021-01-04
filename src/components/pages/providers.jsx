import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import getProviders from "../../services/providerService";
import exampleImg from "../../services/data/pictures/exampleImg.jpeg";
import CardDeck from "../common/cardDeck";

class Providers extends Component {
  state = {
    providers: getProviders(),
  };

  render() {
    const { providers } = this.state;
    providers.map((provider) => (provider.photo = exampleImg));
    return CardDeck(providers);
  }
}

export default Providers;
