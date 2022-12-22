import { ActionTypes } from "../../constants/action-types";

const initialState = {
  majorData: [],
  storeMajor: "",
  majorEdit: "",
  singleMajor: "",
};

export const majorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.MAJOR:
      return {
        ...state,
        majorData: payload,
      };
    case ActionTypes.MAJORSAVE:
      return { ...state, storeMajor: payload };

    case ActionTypes.SINGLESUBJECT:
      return { ...state, singleSubject: payload };

    case ActionTypes.MAJOREDIT:
      return { ...state, majorEdit: payload };
    default:
      return state;
  }
};
