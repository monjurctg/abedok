import { ActionTypes } from "../../constants/action-types";

const initialState = {
  universityData: [],
  universityAllRed: [],
};

export const universityReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.UNIVERSITY:
      return {
        ...state,

        universityData: payload,
      };
    case ActionTypes.UNIVERSITYALL:
      return {
        ...state,

        universityAllRed: payload,
      };
    default:
      return state;
  }
};
