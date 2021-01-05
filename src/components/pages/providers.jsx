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
    selectedFilters: [],
    smallWindow: false,
  };

  updateDimensions() {
    if (window.innerWidth < 800) {
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

  handleSelect = (item) => {
    const selected = [...this.state.selectedFilters];
    if (!selected.includes(item)) {
      selected.push(item);
    }
    this.setState({ selectedFilters: selected });
  };

  handleDeleteSelect = (item) => {
    const selected = [...this.state.selectedFilters];
    const index = selected.indexOf(item);
    if (index > -1) {
      selected.splice(index, 1);
    } else {
      console.log("item not selected");
    }
    this.setState({ selectedFilters: selected });
  };

  render() {
    const { providers, filters, smallWindow } = this.state;
    providers.map((provider) => (provider.photo = exampleImg));
    return (
      <div className="container-fluid">
        {!smallWindow && (
          <div className="row">
            <div className={"col-3"}>
              <CollapsibleList groups={filters} itemKey="options" />
            </div>
            <div className="col">
              <SearchBox />
              {CardDeck(providers, smallWindow)}
            </div>
          </div>
        )}
        {smallWindow && (
          <div>
            {CollapsibleList(filters, "options")}
            <SearchBox />
            {CardDeck(providers, smallWindow)}
          </div>
        )}
      </div>
    );
  }
}

export default Providers;
