import { ActionTypes } from "../../constants/action-types";

const initialState = {
  termsData: [],
  storeTerms: false,
  editTermsData: false,
};

export const termsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.TERMS:
      return {
        ...state,
        termsData: payload,
      };
    case ActionTypes.TERMSSAVE:
      return {
        ...state,
        storeTerms: payload,
      };
    case ActionTypes.TERMSEDIT:
      return { ...state, editTermsData: payload };
    default:
      return state;
  }
};
