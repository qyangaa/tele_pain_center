import * as ActionTypes from "./ActionTypes";

export const fetchProviders = (providers) => ({
  type: ActionTypes.FETCH_PROVIDERS,
  payload: providers,
});

export const providersLoading = () => ({
  type: ActionTypes.PROVIDERS_LOADING,
});

export const providersFailed = (err) => ({
  type: ActionTypes.PROVIDERS_FAILED,
  payload: err,
});
