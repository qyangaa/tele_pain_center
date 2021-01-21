import { PROVIDERS } from "../services/data/providerData";
import * as ActionTypes from "./ActionTypes";

const PROVIDERSSTATE = {
  isLoading: false,
  err: null,
  providers: [],
};

export const providersReducer = (state = PROVIDERSSTATE, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_PROVIDERS:
      return {
        ...state,
        isLoading: false,
        err: null,
        providers: action.payload,
      };
    case ActionTypes.PROVIDERS_LOADING:
      return { ...state, isLoading: true, err: null, providers: null };
    case ActionTypes.PROVIDERS_FAILED:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
        providers: null,
      };
    default:
      return state;
  }
};
