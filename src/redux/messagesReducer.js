import * as ActionTypes from "./ActionTypes";

const MESSAGESSSTATE = {
  isLoading: false,
  err: null,
  messages: [],
};

export const messagesReducer = (state = MESSAGESSSTATE, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_MESSAGES:
      return {
        ...state,
        isLoading: false,
        err: null,
        messages: [...action.payload],
      };
    case ActionTypes.MESSAGES_LOADING:
      return { ...state, isLoading: true, err: null, messages: [] };
    case ActionTypes.MESSAGES_FAILED:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
        messages: [],
      };
    default:
      return state;
  }
};
