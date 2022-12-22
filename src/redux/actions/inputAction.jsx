import { ActionTypes } from "../constants/action-types";

export const inputV = (value) => {
  return {
    type: ActionTypes.INPUTVALUE,
    payload: value,
  };
};

export const editV = (value) => {
  return {
    type: ActionTypes.EDITVALUE,
    payload: value,
  };
};

export const setUser = (value) => {
  return {
    type: ActionTypes.USERID,
    payload: value,
  };
};
