import { ActionTypes } from "../../constants/action-types";

const initialState = {
  courseDurationData: [],
  storeCourseDuration: "",
  CourseDurationEdit: "",
};

export const courseDurationReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.COURSEDURATION:
      return {
        ...state,
        courseDurationData: payload,
      };
    case ActionTypes.COURSEDURATIONSAVE:
      return { ...state, storeCourseDuration: payload };

    case ActionTypes.COURSEDURATIONEDIT:
      return { ...state, CourseDurationEdit: payload };
    default:
      return state;
  }
};
