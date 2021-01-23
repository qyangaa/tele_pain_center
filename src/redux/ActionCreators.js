import * as ActionTypes from "./ActionTypes";
import { PROVIDERS } from "../services/data/providerData";

import GetProviders from "../services/providerService";

export const fetchProviders = async (dispatch) => {
  dispatch(providersLoading(true));
  GetProviders().then((providers) => dispatch(addProviders(providers)));
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
