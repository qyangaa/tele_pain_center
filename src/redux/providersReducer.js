import { PROVIDERS } from "../services/data/providerData";
import * as ActionTypes from "./ActionTypes";

export const providersReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PROVIDERS:
      return action.payload;
    default:
      return state;
  }
};
