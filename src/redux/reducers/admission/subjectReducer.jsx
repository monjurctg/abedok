import { ActionTypes } from "../../constants/action-types";

const initialState = {
  subjectData: [],
  storeSubject: "",
  subjectEditRed: "",
  singleSubject: "",
};

export const subjectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SUBJECT:
      return {
        ...state,
        subjectData: payload,
      };
    case ActionTypes.SUBJECTSAVE:
      return { ...state, storeSubject: payload };

    case ActionTypes.SINGLESUBJECT:
      return { ...state, singleSubject: payload };

    case ActionTypes.SUBJECTEDIT:
      return { ...state, subjectEditRed: payload };
    default:
      return state;
  }
};
