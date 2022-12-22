import { ActionTypes } from "../constants/action-types";

export const modalState = (value) => {
  return {
    type: ActionTypes.MODALSTATE,
    payload: value,
  };
};

export const modalUpdate = (value) => {
  return {
    type: ActionTypes.MODALUPDATE,
    payload: value,
  };
};

export const loadingState = (value) => {
  return {
    type: ActionTypes.LOADINGSTATE,
    payload: value,
  };
};
