import { ActionTypes } from "../../constants/action-types";

const initialState = {
  postOfficeData: [],
  storePostOffice: false,
  editPostOffice: false,
};

export const postOfficeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.POSTOFFICE:
      return {
        ...state,

        postOfficeData: payload,
      };

    case ActionTypes.POSTOFFICESAVE:
      return {
        ...state,
        storePostOffice: payload,
      };
    case ActionTypes.POSTOFFICEEDIT:
      return { ...state, editPostOffice: payload };
    default:
      return state;
  }
};
