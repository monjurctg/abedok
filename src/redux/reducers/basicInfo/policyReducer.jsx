import { ActionTypes } from "../../constants/action-types";

const initialState = {
  policyData: [],
  storePolicy: false,
  editPolicyData: false,
};

export const policyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.POLICY:
      return {
        ...state,

        policyData: payload,
      };
    case ActionTypes.POLICYSAVE:
      return {
        ...state,
        storePolicy: payload,
      };
    case ActionTypes.POLICYEDIT:
      return { ...state, editPolicyData: payload };
    default:
      return state;
  }
};
