import * as ActionTypes from "./ActionTypes";
import axios from "axios";

export const fetchCurUser = async (dispatch, data) => {
  dispatch(curUserLoading(true));
  dispatch(addCurUser(data));
};

export const addCurUser = (curUser) => ({
  type: ActionTypes.ADD_CURUSER,
  payload: curUser,
});

export const curUserLoading = (isLoading) => ({
  type: ActionTypes.CURUSER_LOADING,
  payload: isLoading,
});

export const curUserFailed = (err) => ({
  type: ActionTypes.CURUSER_FAILED,
  payload: err,
});

export const removeCurUser = (err) => ({
  type: ActionTypes.REMOVE_CURUSER,
  payload: err,
});

const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem("FBIdToken", FBIdToken);
  axios.defaults.headers.common["Authorization"] = FBIdToken;
};
