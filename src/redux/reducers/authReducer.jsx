import { ActionTypes } from "../constants/action-types";

const initialState = {
  isAuthenticated: false,
  error: null,
  loading: true,
  user: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        error: null,
        loading: false,
        user: payload,
      };
    case ActionTypes.SUCCESS:
      return { ...state, success: payload };
    case ActionTypes.ERROR:
      return { ...state, error: payload };
    default:
      return state;
  }
};
