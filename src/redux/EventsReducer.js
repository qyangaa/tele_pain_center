import * as ActionTypes from "./ActionTypes";

const EVENTSSTATE = {
  isLoading: false,
  err: null,
  events: [],
  // terminals: {},
  selected: null,
};

export const eventsReducer = (state = EVENTSSTATE, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_EVENT:
      const selected = state.events.filter(
        (event) => event._id === action.payload.eventId
      )[0];
      return {
        ...state,
        selected: selected,
      };
    case ActionTypes.ADD_EVENTS:
      return {
        ...state,
        isLoading: false,
        err: null,
        events: action.payload.events,
        // terminals: action.payload.terminals,
      };
    case ActionTypes.EVENTS_LOADING:
      return { ...state, isLoading: true, err: null, events: [] };
    case ActionTypes.EVENTS_FAILED:
      return {
        ...state,
        isLoading: false,
        err: action.payload,
        events: [],
      };
    default:
      return state;
  }
};
