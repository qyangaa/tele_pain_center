import { createStore, combineReducers } from "redux";
import { filtersReducer } from "./filtersReducer";
import { providersReducer } from "./providersReducer";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      providers: providersReducer,
      filters: filtersReducer,
    })
  );
  return store;
};
