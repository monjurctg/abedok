import { ActionTypes } from "../constants/action-types";

const initialState = {
  inputValue: "",
  editValue: "",
  userCurrent: false,
};

export const inputReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.INPUTVALUE:
      return { ...state, inputValue: payload };
    case ActionTypes.EDITVALUE:
      return { ...state, editValue: payload };

    case ActionTypes.USERID:
      return { ...state, userCurrent: payload };

    default:
      return state;
  }
};
