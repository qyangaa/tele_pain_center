import { createStore, combineReducers } from "redux";
import { filtersReducer } from "./filtersReducer";
import { providersReducer } from "./providersReducer";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      providersState: providersReducer,
      filters: filtersReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
