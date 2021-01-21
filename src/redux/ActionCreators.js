import * as ActionTypes from "./ActionTypes";

export const addProviders = (providers) => ({
  type: ActionTypes.ADD_PROVIDERS,
  payload: providers,
});
