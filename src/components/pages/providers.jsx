import React, { Component, useEffect, useState } from "react";

import exampleImg from "../../services/data/pictures/exampleImg.jpeg";
import CardDeck from "../common/cardDeck";
import SearchBox from "../UI/searchBox";
import getFilters from "../../services/FilterService";
import CollapsibleList from "../UI/CollapsibleList";
import Pagination from "../UI/Pagination";
import Loading from "../common/Loading";

import { paginate } from "../../utils/paginate";
import { db } from "../../services/Firebase/firebase";
import providerActions from "../../redux/ProvidersActions";
import { useSelector, useDispatch } from "react-redux";
import GetProviders from "../../services/providerService";

import { PROVIDERS } from "../../services/data/providerData";

export default function Providers() {
  // const [providers, setProviders] = useState([]);
  const providersState = useSelector((state) => state.providersState);

  // const [filters, setFilters] = useState(getFilters());
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const [selectedFilters, setSelectedFilters] = useState([]);

  const [smallWindow, setSmallWindow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [button2, setButton2] = useState({
    text: "Message",
    onClick: (item) => () => handleMessage(item),
  });

  useEffect(() => {
    //componentDidMount
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    providerActions.fetchProviders(dispatch);
    GetProviders(dispatch);
  }, []);

  useEffect(() => {
    //componnetWillUnmount

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const handleMessage = (item) => {
    console.log("clicked:", item);
  };

  const updateDimensions = () => {
    if (window.innerWidth < 800) {
      setSmallWindow(true);
    } else {
      setSmallWindow(false);
    }
  };

  const handleSelect = (item) => {
    // item: "filter_id:item_id"
    let selected = [...selectedFilters];
    if (!selected.includes(item)) {
      selected.push(item);
    } else {
      selected = selectedFilters.filter((i) => i !== item);
    }
    setSelectedFilters(selected);
  };

  const handleSearch = (query) => {
    if (query != searchQuery) {
      setSearchQuery(query);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const obtainFilters = () => {
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

  const filterSearch = (searchQuery, provider) => {
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

  const getPagedData = () => {
    // provider: group_id: name
    let filteredProviders = providersState.providers;
    if (filteredProviders == null) {
      return { itemsCount: 0, data: [] };
    }
    if (searchQuery) {
      filteredProviders = filteredProviders.filter((provider) =>
        filterSearch(searchQuery, provider)
      );
    }
    const groupedFilters = obtainFilters();
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

  const { itemsCount, data: pagedProviders } = getPagedData();
  pagedProviders.map((provider) => (provider.photo = exampleImg));

  const renderProviders = (pagedProviders) => {
    return (
      <div>
        {!smallWindow && (
          <div className="row">
            <div className={"col-3"}>
              <CollapsibleList
                groups={filters}
                itemKey="options"
                onSelect={handleSelect}
                selectedItems={selectedFilters}
              />
            </div>
            <div className="col">
              <SearchBox onChange={handleSearch} />
              {providersState.isLoading && Loading()}
              {CardDeck(pagedProviders, smallWindow, button2)}
              <Pagination
                itemsCount={itemsCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
        {smallWindow && (
          <div>
            <CollapsibleList
              groups={filters}
              itemKey="options"
              onSelect={handleSelect}
              selectedItems={selectedFilters}
            />
            <SearchBox onChange={handleSearch} />
            {providersState.isLoading && Loading()}
            {CardDeck(pagedProviders, smallWindow, button2)}
            <Pagination
              itemsCount={itemsCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container-fluid">
      {pagedProviders && renderProviders(pagedProviders)}
    </div>
  );
}
