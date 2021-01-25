import {
  fetchMessages,
  addMessages,
  messagesLoading,
  messagesFailed,
  fetchGroups,
  addGroups,
  groupsLoading,
  groupsFailed,
  fetchCurGroup,
  addCurGroup,
  curGroupLoading,
  curGroupFailed,
} from "./ChatActionCreator";

const chatActions = {
  fetchMessages,
  addMessages,
  messagesLoading,
  messagesFailed,
  fetchGroups,
  addGroups,
  groupsLoading,
  groupsFailed,
  fetchCurGroup,
  addCurGroup,
  curGroupLoading,
  curGroupFailed,
};

export default chatActions;
