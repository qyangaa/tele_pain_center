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
    let selected = [...this.state.selectedFilters];
    if (!selected.includes(item)) {
      selected.push(item);
    } else {
      console.log("deleting");
      selected = this.state.selectedFilters.filter((i) => i !== item);
    }
    this.setState({ selectedFilters: selected });
  };

  getPagedData = () => {
    const { providers: allProviders, selectedFilters } = this.state;
    let filteredProviders = allProviders;
    for (let filter in selectedFilters) {
      filteredProviders = filteredProviders.filter();
    }
  };

  obtainField = (key) => {
    const { filters } = this.state;
    const splitKey = key.split(":");
    return splitKey;
  };

  render() {
    const { providers, filters, smallWindow } = this.state;
    providers.map((provider) => (provider.photo = exampleImg));
    // console.log(this.obtainField());
    return (
      <div className="container-fluid">
        {!smallWindow && (
          <div className="row">
            <div className={"col-3"}>
              <CollapsibleList
                groups={filters}
                itemKey="options"
                onSelect={this.handleSelect}
              />
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
