import { ActionTypes } from "../../constants/action-types";

const initialState = {
  gradeList: [],
  gradeStoreRed: false,
  gradeEditRed: false,
};

export const gradeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GRADE:
      return {
        ...state,
        gradeList: payload,
      };
    case ActionTypes.GRADESAVE:
      return {
        ...state,

        gradeStoreRed: payload,
      };
    case ActionTypes.GRADEEDIT:
      return {
        ...state,
        gradeEditRed: payload,
      };
    default:
      return state;
  }
};
