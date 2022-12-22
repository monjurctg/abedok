import { ActionTypes } from "../constants/action-types";

const initialState = {
  modalCurrent: false,
  modalUp: false,
  loadingNow: false,
};

export const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.MODALSTATE:
      return { ...state, modalCurrent: payload };
    case ActionTypes.LOADINGSTATE:
      return { ...state, loadingNow: payload };
    case ActionTypes.MODALUPDATE:
      return { ...state, modalUp: payload };

    default:
      return state;
  }
};
