import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { filtersReducer } from "./filtersReducer";
import { providersReducer } from "./providersReducer";
import { messagesReducer } from "./messagesReducer";
import { chatGroupsReducer } from "./chatGroupsReducer";
import { curGroupReducer } from "./curGroupReducer";
import { firebaseReducer } from "react-redux-firebase";
import { dashboardReducer } from "./reducers/dashboardReducer"; //test

import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      providersState: providersReducer,
      filters: filtersReducer,
      messagesState: messagesReducer,
      chatGroupsState: chatGroupsReducer,
      curGroup: curGroupReducer,
      firebase: firebaseReducer,
      dashboardReducer: dashboardReducer, //test
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  applyMiddleware(thunk, logger);
  return store;
};
