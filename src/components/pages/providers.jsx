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
    smallWindow: false,
  };

  updateDimensions() {
    if (window.innerWidth < 1000) {
      this.setState({ smallWindow: true });
    } else {
      this.setState({ smallWindow: false });
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const { providers, filters, smallWindow } = this.state;
    providers.map((provider) => (provider.photo = exampleImg));
    return (
      <div className="container-fluid">
        {!smallWindow && (
          <div className="row">
            <div className={"col-3"}>{CollapsibleList(filters, "options")}</div>
            <div className="col">
              <SearchBox />
              {CardDeck(providers)}
            </div>
          </div>
        )}
        {smallWindow && (
          <div>
            {CollapsibleList(filters, "options")}
            <SearchBox />
            {CardDeck(providers)}
          </div>
        )}
      </div>
    );
  }
}

export default Providers;
