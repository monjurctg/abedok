import { ActionTypes } from "../../constants/action-types";

const initialState = {
  districtData: [],
  singleDistrict: [],
  storeDistrict: false,
  editDistrictData: false,
};

export const districtReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.DISTRICT:
      return {
        ...state,

        districtData: payload,
      };
    case ActionTypes.DISTRICTSINGLE:
      return {
        ...state,

        singleDistrict: payload,
      };
    case ActionTypes.DISTRICTSAVE:
      return {
        ...state,
        storeDistrict: payload,
      };
    case ActionTypes.DISTRICTEDIT:
      return { ...state, editDistrictData: payload };
    default:
      return state;
  }
};
