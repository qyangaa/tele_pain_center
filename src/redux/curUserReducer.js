import * as ActionTypes from "./ActionTypes";

const CURUSERSTATE = {
  isLoading: false,
  isSignedIn: false,
  err: null,
  curUser: "",
  uid: "",
  username: "",
};

export const curUserReducer = (state = CURUSERSTATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CURUSER:
      return {
        ...state,
        isLoading: false,
        isSignedIn: true,
        err: null,
        curUser: action.payload.user,
        uid: action.payload.uid,
        username: action.payload.username,
      };
    case ActionTypes.CURUSER_LOADING:
      return {
        ...state,
        isLoading: true,
        isSignedIn: false,
        err: null,
        curUser: "",
        uid: "",
        username: "",
      };
    case ActionTypes.CURUSER_FAILED:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
        isSignedIn: false,
        curUser: "",
        uid: "",
        username: "",
      };
    case ActionTypes.REMOVE_CURUSER:
      return {
        ...state,
        isLoading: false,
        isSignedIn: false,
        err: action.payload,
        curUser: "",
        uid: "",
        username: "",
      };
    default:
      return state;
  }
};
