import React, { Component } from "react";

import getProviders from "../../services/providerService";
import exampleImg from "../../services/data/pictures/exampleImg.jpeg";
import CardDeck from "../common/cardDeck";
import SearchBox from "../UI/searchBox";
import getFilters from "../../services/FilterService";
import CollapsibleList from "../UI/CollapsibleList";
class Providers extends Component {
  state = {
    providers: getProviders(),
    filters: getFilters(),
  };

  render() {
    const { providers, filters } = this.state;
    providers.map((provider) => (provider.photo = exampleImg));
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">{CollapsibleList(filters, "options")}</div>
          <div className="col">
            <SearchBox />
            {CardDeck(providers)}
          </div>
        </div>
      </div>
    );
  }
}

export default Providers;
