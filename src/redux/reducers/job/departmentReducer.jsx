import { ActionTypes } from "../../constants/action-types";

const initialState = {
  departmentData: [],
  departmentStoreRed: false,
  departmentEditRed: false,
};

export const departmentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.DEPARTMENT:
      return {
        ...state,

        departmentData: payload,
      };
    case ActionTypes.DEPARTMENTSAVE:
      return {
        ...state,

        departmentStoreRed: payload,
      };
    case ActionTypes.DEPARTMENTEDIT:
      return {
        ...state,
        departmentEditRed: payload,
      };
    default:
      return state;
  }
};
