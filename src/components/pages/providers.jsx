import React, { Component, useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";

import exampleImg from "../../services/data/pictures/exampleImg.jpeg";
import CardDeck from "../common/cardDeck";
import SearchBox from "../UI/searchBox";
import getFilters from "../../services/FilterService";
import CollapsibleList from "../UI/CollapsibleList";
import Pagination from "../UI/Pagination";
import Loading from "../common/Loading";
import ProvidersMap from "./ProvidersMap";
import AppointmentModal from "./AppointmentModal";

import { paginate } from "../../utils/paginate";
import { db } from "../../services/Firebase/firebase";
import providerActions from "../../redux/ProvidersActions";
import { useSelector, useDispatch } from "react-redux";
import { GetProviders, searchAlgolia } from "../../services/providerService";

import { PROVIDERS } from "../../services/data/providerData";

import {
  CreateGroup,
  GetGroups,
  SetCurGroup,
} from "../../services/ChatService";

import "./Providers.css";

export default function Providers() {
  // const [providers, setProviders] = useState([]);
  const providersState = useSelector((state) => state.providersState);
  const groups = useSelector((state) => state.chatGroupsState);
  const curGroup = useSelector((state) => state.curGroup.curGroup);
  // const [filters, setFilters] = useState(getFilters());
  const filters = useSelector((state) => state.filters);
  const curUid = useSelector((state) => state.firebase.auth.uid);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [filterGroups, setFilterGroups] = useState({
    specialty: "",
    city: "",
  });

  const chunkSize = 5; // TODO: Watchout! Hard coded for now, matches providerService

  const [smallWindow, setSmallWindow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [currentChunk, setCurrentChunk] = useState(1);
  const [button2, setButton2] = useState({
    text: "Message",
    onClick: (providerUid) => () => {
      console.log({ providerUid, curUid });
    },
  });

  const [button1, setButton1] = useState({
    text: "Appointment",
    onClick: (providerUid) => () => {
      setIsAppointmentModalOpen(true);
      dispatch(
        providerActions.selectProvider({
          providerId: providerUid,
        })
      );
    },
  });

  useEffect(() => {
    //componentDidMount
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    GetProviders(
      dispatch,
      filterGroups,
      pageSize * chunkSize,
      "none",
      providersState.terminals,
      searchQuery
    );
  }, []);

  useEffect(() => {
    GetProviders(
      dispatch,
      filterGroups,
      pageSize * chunkSize,
      "none",
      providersState.terminals,
      searchQuery
    );
  }, [filterGroups, pageSize, isAppointmentModalOpen]);

  useEffect(() => {
    GetGroups(dispatch, curUid);
  }, [curUid]);

  useEffect(() => {
    setButton2({
      text: "Message",
      onClick: (providerUid) => () => {
        if (!curUid) {
          history.push("/login");
          return;
        }
        if (groups.groups) {
          for (let group of Object.values(groups.groups)) {
            if (providerUid in group.users) {
              SetCurGroup(dispatch, group._id);
              history.push("/chat");
              return;
            }
          }
          CreateGroup(dispatch, providerUid, curUid);
          history.push("/chat");
        }
      },
    });
  }, [groups, curUid]);

  useEffect(() => {
    //componnetWillUnmount

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  const updateDimensions = () => {
    if (window.innerWidth < 800) {
      setSmallWindow(true);
    } else {
      setSmallWindow(false);
    }
  };

  const handleSelect = (groupName, itemName) => {
    const newFilterGroups = { ...filterGroups };
    if (filterGroups[groupName] != itemName) {
      newFilterGroups[groupName] = itemName;
    } else {
      newFilterGroups[groupName] = "";
    }
    setFilterGroups(newFilterGroups);
    console.log({ groupName, itemName, filterGroups });
  };

  const handleSearch = (query) => {
    if (query != searchQuery) {
      setSearchQuery(query);
    }
  };
  const handleSubmitSearch = () => {
    if (!searchQuery) {
      GetProviders(
        dispatch,
        filterGroups,
        pageSize * chunkSize,
        "none",
        providersState.terminals,
        searchQuery
      );
      return;
    }
    searchAlgolia(searchQuery, dispatch);
  };

  const handlePageChange = (page) => {
    if (page < 1 && currentChunk <= 1) {
      return;
    }
    if (page < 1) {
      setCurrentChunk((currentChunk) => currentChunk - 1);
      setCurrentPage(chunkSize);
      GetProviders(
        dispatch,
        filterGroups,
        pageSize * chunkSize,
        "prev",
        providersState.terminals,
        searchQuery
      );
      return;
    }
    if (page > chunkSize) {
      setCurrentChunk((currentChunk) => currentChunk + 1);
      setCurrentPage(1);
      GetProviders(
        dispatch,
        filterGroups,
        pageSize * chunkSize,
        "next",
        providersState.terminals,
        searchQuery
      );
      return;
    }
    setCurrentPage(page);
  };

  const getPagedData = () => {
    let filteredProviders = providersState.providers;
    const itemsCount = filteredProviders.length;
    filteredProviders = paginate(filteredProviders, currentPage, pageSize);

    return { itemsCount, data: filteredProviders };
  };

  const { itemsCount, data: pagedProviders } = getPagedData();
  pagedProviders.map((provider) => (provider.photo = exampleImg));

  const renderProviders = (pagedProviders) => {
    return (
      <div>
        {
          <div className="row">
            <div className="col-sm-5 col-md-3">
              <div className="side_menu">
                <CollapsibleList
                  groups={filters}
                  itemKey="options"
                  onSelect={handleSelect}
                  selectedItems={selectedFilters}
                  filterGroups={filterGroups}
                />
                <SearchBox
                  onChange={(e) => handleSearch(e)}
                  onSubmit={() => handleSubmitSearch()}
                />
                <ProvidersMap />
              </div>
            </div>
            <div className="col-sm-7 col-md-9 card-list">
              {providersState.isLoading && Loading()}

              {CardDeck(pagedProviders, smallWindow, button1, button2)}
              <Pagination
                itemsCount={itemsCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                startPage={(currentChunk - 1) * chunkSize + 1}
              />
            </div>
          </div>
        }
      </div>
    );
  };

  return (
    <div className="container-fluid">
      {pagedProviders && renderProviders(pagedProviders)}
      {isAppointmentModalOpen && (
        <AppointmentModal
          open={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
        ></AppointmentModal>
      )}
    </div>
  );
}
