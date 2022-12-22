import { ActionTypes } from "../constants/action-types";

const initialState = {
  userListRed: [],

  singleUserRed: "",
  eligibleUserAdmission: [],
  eligibleUserJob: [],
  userCountRed: 0,
  merchentsData: "",
  MerchentUserListData: "",
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.USERLIST:
      return { ...state, userListRed: payload };
    case ActionTypes.ELIGIBLEADMISSIONUSERLIST:
      return { ...state, eligibleUserAdmission: payload };

    case ActionTypes.ELIGIBLEJOBUSERLIST:
      return { ...state, eligibleUserJob: payload };

    case ActionTypes.SINGLEUSER:
      return { ...state, singleUserRed: payload };
    case ActionTypes.MERCHENTLIST:
      return { ...state, merchentsData: payload };

    case ActionTypes.MERCHENTUSERLIST:
      return { ...state, MerchentUserListData: payload };

    default:
      return state;
  }
};
