import { PROVIDERS } from "../services/data/providerData";
import * as ActionTypes from "./ActionTypes";

const PROVIDERSSTATE = {
  isLoading: false,
  err: null,
  providers: [],
  terminals: {},
  selected: null,
};

export const providersReducer = (state = PROVIDERSSTATE, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_PROVIDER:
      const selected = state.providers.filter(
        (provider) => provider._id === action.payload.providerId
      )[0];
      return {
        ...state,
        selected: selected,
      };
    case ActionTypes.FETCH_PROVIDERS:
      return {
        ...state,
        isLoading: false,
        err: null,
        providers: action.payload.providers,
        terminals: action.payload.terminals,
      };
    case ActionTypes.PROVIDERS_LOADING:
      return { ...state, isLoading: true, err: null, providers: [] };
    case ActionTypes.PROVIDERS_FAILED:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
        providers: [],
      };
    default:
      return state;
  }
};
