import { createStore, combineReducers, applyMiddleware } from "redux";
import { filtersReducer } from "./filtersReducer";
import { providersReducer } from "./providersReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      providersState: providersReducer,
      filters: filtersReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  applyMiddleware(thunk, logger);
  return store;
};
