import * as ActionTypes from "./ActionTypes";

const CURGROUPSTATE = {
  isLoading: false,
  err: null,
  curGroup: "",
};

export const curGroupReducer = (state = CURGROUPSTATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CURGROUP:
      return {
        ...state,
        isLoading: false,
        err: null,
        curGroup: action.payload,
      };
    case ActionTypes.CURGROUP_LOADING:
      return { ...state, isLoading: true, err: null, curGroup: "" };
    case ActionTypes.CURGROUP_FAILED:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
        curGroup: "",
      };
    default:
      return state;
  }
};
