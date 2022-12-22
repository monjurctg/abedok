import { ActionTypes } from "../constants/action-types";

const initialState = {
  notificationData: "",
  notiCount: 0,
};

export const notificatonReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.NOTIFICATONS:
      return { ...state, notificationData: payload };
    case ActionTypes.NOTIFICATONSCOUNT:
      return { ...state, notiCount: payload };

    default:
      return state;
  }
};
