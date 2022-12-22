import { ActionTypes } from "../../constants/action-types";

const initialState = {
  workerData: [],
};

export const paymentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.WORKERPAYMENT:
      return {
        ...state,

        workerData: payload,
      };

    case ActionTypes.DISTRICTEDIT:
      return { ...state, editDistrictData: payload };
    default:
      return state;
  }
};
