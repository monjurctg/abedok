import { ActionTypes } from "../../constants/action-types";

const initialState = {
  unitData: [],
  unitAllRed: [],
  storeUnit: false,
  editUnit: false,
};

export const unitReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.UNIT:
      return {
        ...state,

        unitData: payload,
      };
    case ActionTypes.UNITALL:
      return {
        ...state,

        unitAllRed: payload,
      };
    case ActionTypes.UNITSAVE:
      return { ...state, storeUnit: payload };
    case ActionTypes.EXAMEDIT:
      return { ...state, editUnit: payload };
    default:
      return state;
  }
};
