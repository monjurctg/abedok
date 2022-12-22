import { ActionTypes } from "../../constants/action-types";

const initialState = {
  passingYearData: [],
  storePassingYear: "",
  PassingYearEdit: "",
};

export const passingYearReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.PASSINGYEAR:
      return {
        ...state,
        passingYearData: payload,
      };
    case ActionTypes.PASSINGYEARSAVE:
      return { ...state, storePassingYear: payload };

    case ActionTypes.PASSINGYEAREDIT:
      return { ...state, PassingYearEdit: payload };
    default:
      return state;
  }
};
