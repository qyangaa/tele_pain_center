import * as ActionTypes from "./ActionTypes";
import { PROVIDERS } from "../services/data/providerData";

import GetProviders from "../services/providerService";

// TODO: should we call servce from action or call action from service?
export const fetchProviders = async (dispatch, data) => {
  dispatch(providersLoading(true));
  dispatch(addProviders(data));
};

export const addProviders = (providers) => ({
  type: ActionTypes.FETCH_PROVIDERS,
  payload: providers,
});

export const providersLoading = (isLoading) => ({
  type: ActionTypes.PROVIDERS_LOADING,
  payload: isLoading,
});

export const providersFailed = (err) => ({
  type: ActionTypes.PROVIDERS_FAILED,
  payload: err,
});
