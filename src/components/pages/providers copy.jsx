import React, { Component } from "react";

import getProviders from "../../services/providerService";
import exampleImg from "../../services/data/pictures/exampleImg.jpeg";
import CardDeck from "../common/cardDeck";
import SearchBox from "../UI/searchBox";
import getFilters from "../../services/FilterService";
import CollapsibleList from "../UI/CollapsibleList";
import { providers } from "../../services/data/providerData";
import Pagination from "../UI/Pagination";
import { paginate } from "../../utils/paginate";
class Providers extends Component {
  state = {
    providers: getProviders(),
    filters: getFilters(),
    selectedFilters: [],
    smallWindow: false,
    searchQuery: "",
    currentPage: 1,
    pageSize: 5,
    button2: {
      text: "Message",
      onClick: (item) => () => this.handleMessage(item),
    },
  };

  handleMessage = (item) => {
    console.log("clicked:", item);
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

  handleSearch = (query) => {
    if (query != this.state.searchQuery) {
      this.setState({ searchQuery: query });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  obtainFilters = () => {
    const { filters, selectedFilters } = this.state;
    const groupedFilters = {};
    for (const key of selectedFilters) {
      const splitKey = key.split(":");
      const group = filters.filter((group) => group._id === splitKey[0])[0];
      const item = group.options.filter((item) => item._id === splitKey[1])[0];
      if (group._id in groupedFilters) {
        groupedFilters[group._id].push(item);
      } else {
        groupedFilters[group._id] = [item];
      }
    }
    return groupedFilters;
  };

  filterSearch = (searchQuery, provider) => {
    if (!searchQuery) {
      return true;
    }
    const searchFields = [
      "address",
      "city",
      "description",
      "name",
      "specialty",
    ];
    for (const field of searchFields) {
      if (provider[field].toLowerCase().includes(searchQuery.toLowerCase())) {
        return true;
      }
    }
    return false;
  };

  getPagedData = () => {
    // provider: group_id: name
    const {
      providers: allProviders,
      searchQuery,
      currentPage,
      pageSize,
    } = this.state;
    let filteredProviders = allProviders;
    if (searchQuery) {
      filteredProviders = filteredProviders.filter((provider) =>
        this.filterSearch(searchQuery, provider)
      );
    }
    const groupedFilters = this.obtainFilters();
    for (const group in groupedFilters) {
      let curProviders = [];
      for (const item of groupedFilters[group]) {
        curProviders = curProviders.concat(
          filteredProviders.filter((provider) => provider[group] === item.name)
        );
      }
      filteredProviders = curProviders;
    }
    const itemsCount = filteredProviders.length;
    filteredProviders = paginate(filteredProviders, currentPage, pageSize);

    return { itemsCount, data: filteredProviders };
  };

  render() {
    const {
      filters,
      smallWindow,
      currentPage,
      pageSize,
      selectedFilters,
      button2,
    } = this.state;
    const { itemsCount, data: providers } = this.getPagedData();
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
                selectedItems={selectedFilters}
              />
            </div>
            <div className="col">
              <SearchBox onChange={this.handleSearch} />
              {CardDeck(providers, smallWindow, button2)}
              <Pagination
                itemsCount={itemsCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              />
            </div>
          </div>
        )}
        {smallWindow && (
          <div>
            <CollapsibleList
              groups={filters}
              itemKey="options"
              onSelect={this.handleSelect}
              selectedItems={selectedFilters}
            />
            <SearchBox onChange={this.handleSearch} />
            {CardDeck(providers, smallWindow, button2)}
            <Pagination
              itemsCount={itemsCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Providers;
