import { ActionTypes } from "../../constants/action-types";

const initialState = {
  quotaData: [],
  quotaStoreRed: false,
  quotaEditRed: false,
};

export const quotaReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.QUOTA:
      return {
        ...state,

        quotaData: payload,
      };
    case ActionTypes.QUOTASAVE:
      return {
        ...state,

        quotaStoreRed: payload,
      };
    case ActionTypes.QUOTAEDIT:
      return {
        ...state,
        quotaEditRed: payload,
      };
    default:
      return state;
  }
};
