import * as ActionTypes from "./ActionTypes";

export const fetchMessages = async (dispatch, data) => {
  dispatch(messagesLoading(true));
  dispatch(addMessages(data));
};

export const addMessages = (messages) => ({
  type: ActionTypes.FETCH_MESSAGES,
  payload: messages,
});

export const messagesLoading = (isLoading) => ({
  type: ActionTypes.MESSAGES_LOADING,
  payload: isLoading,
});

export const messagesFailed = (err) => ({
  type: ActionTypes.MESSAGES_FAILED,
  payload: err,
});

export const fetchGroups = async (dispatch, data) => {
  dispatch(groupsLoading(true));
  dispatch(addGroups(data));
};

export const addGroups = (groups) => ({
  type: ActionTypes.ADD_GROUPS,
  payload: groups,
});

export const groupsLoading = (isLoading) => ({
  type: ActionTypes.GROUPS_LOADING,
  payload: isLoading,
});

export const groupsFailed = (err) => ({
  type: ActionTypes.GROUPS_FAILED,
  payload: err,
});

export const fetchCurGroup = async (dispatch, data) => {
  dispatch(curGroupLoading(true));
  dispatch(addCurGroup(data));
};

export const addCurGroup = (curGroup) => ({
  type: ActionTypes.ADD_CURGROUP,
  payload: curGroup,
});

export const curGroupLoading = (isLoading) => ({
  type: ActionTypes.CURGROUP_LOADING,
  payload: isLoading,
});

export const curGroupFailed = (err) => ({
  type: ActionTypes.CURGROUP_FAILED,
  payload: err,
});
