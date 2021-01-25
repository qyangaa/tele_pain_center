import * as ActionTypes from "./ActionTypes";

const GROUPSSTATE = {
  isLoading: false,
  err: null,
  groups: {},
};

export const chatGroupsReducer = (state = GROUPSSTATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_GROUPS:
      return {
        ...state,
        isLoading: false,
        err: null,
        groups: action.payload,
      };
    case ActionTypes.GROUPS_LOADING:
      return { ...state, isLoading: true, err: null, groups: {} };
    case ActionTypes.GROUPS_FAILED:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
        groups: {},
      };
    default:
      return state;
  }
};
