import React, { Component } from "react";

import getProviders from "../../services/providerService";
import exampleImg from "../../services/data/pictures/exampleImg.jpeg";
import CardDeck from "../common/cardDeck";
import SearchBox from "../UI/searchBox";
import getFilters from "../../services/FilterService";
import CollapsibleList from "../UI/CollapsibleList";
import { providers } from "../../services/data/providerData";
import Pagination from "../UI/Pagination";
class Providers extends Component {
  state = {
    providers: getProviders(),
    filters: getFilters(),
    selectedFilters: [],
    smallWindow: false,
    searchQuery:""
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

  handleSearch = query=>{
    if (query!= this.state.searchQuery){
      this.setState({searchQuery: query})
    }
  }

  obtainFilter = (key) => {
    const { filters } = this.state;
    const splitKey = key.split(":");
    
    const group = filters.filter((group) => group._id === splitKey[0])[0];
    const item = group.options.filter((item) => item._id === splitKey[1])[0];
    console.log(group);
    return { group, item };
  };
  
  filterSearch = (searchQuery, provider) =>{
    if(!searchQuery){
      return true
    } 
    const searchFields= ["address","city","description","name","specialty"]
    for(const field of searchFields){
      if(provider[field].toLowerCase().includes(searchQuery.toLowerCase())){
        console.log("true")
        return true
      }
    }
    console.log("false")
    return false
  }


  getPagedData = () => {
    // provider: group_id: name
    const { providers: allProviders, selectedFilters, searchQuery } = this.state;
    let filteredProviders = allProviders;
    if(searchQuery){
      filteredProviders = filteredProviders.filter((provider)=>this.filterSearch(searchQuery,provider))
    }
    
    for (const filterKey of selectedFilters) {
      const { group, item } = this.obtainFilter(filterKey);
      filteredProviders = filteredProviders.filter(
        (provider) => provider[group._id] === item.name
      );
    }
    return { data: filteredProviders };
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
              <SearchBox onChange={this.handleSearch}/>
              {CardDeck(providers, smallWindow)}
              <Pagination />
            </div>
          </div>
        )}
        {smallWindow && (
          <div>
              <CollapsibleList
                groups={filters}
                itemKey="options"
                onSelect={this.handleSelect}
              />
            <SearchBox onChange={this.handleSearch}/>
            {CardDeck(providers, smallWindow)}
          </div>
        )}
      </div>
    );
  }
}

export default Providers;
