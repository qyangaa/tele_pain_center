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
    // item: "filter_id:item_id"
    let selected = [...this.state.selectedFilters];
    if (!selected.includes(item)) {
      selected.push(item);
    } else {
      selected = this.state.selectedFilters.filter((i) => i !== item);
    }
    this.setState({ selectedFilters: selected });
  };

  getPagedData = () => {
    // provider: group_id: name
    const { providers: allProviders, selectedFilters } = this.state;
    let filteredProviders = allProviders;
    for (const filterKey of selectedFilters) {
      const { group, item } = this.obtainFilter(filterKey);
      filteredProviders = filteredProviders.filter(
        (provider) => provider[group._id] === item.name
      );
    }
    return { data: filteredProviders };
  };

  obtainFilter = (key) => {
    const { filters } = this.state;
    const splitKey = key.split(":");

    const group = filters.filter((group) => group._id === splitKey[0])[0];
    const item = group.options.filter((item) => item._id === splitKey[1])[0];
    console.log(group);
    return { group, item };
  };

  render() {
    const { filters, smallWindow } = this.state;
    const { data: providers } = this.getPagedData();
    providers.map((provider) => (provider.photo = exampleImg));

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
