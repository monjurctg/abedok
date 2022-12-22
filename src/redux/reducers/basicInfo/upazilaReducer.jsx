import { ActionTypes } from "../../constants/action-types";

const initialState = {
  upazilaData: [],
  singleUpazila: [],
  storeUpazila: false,
  editUpazilaData: false,
};

export const upazilaReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.UPAZILA:
      return {
        ...state,

        upazilaData: payload,
      };

    case ActionTypes.UPAZILASINGLE:
      return {
        ...state,

        singleUpazila: payload,
      };
    case ActionTypes.UPAZILASAVE:
      return {
        ...state,
        storeUpazila: payload,
      };
    case ActionTypes.UPAZILAEDIT:
      return { ...state, editUpazilaData: payload };
    default:
      return state;
  }
};
