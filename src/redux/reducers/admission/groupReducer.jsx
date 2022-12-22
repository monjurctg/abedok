import { ActionTypes } from "../../constants/action-types";

const initialState = {
  groupData: [],
  groupAllRed: [],
  storeGroup: "",
  GroupEdit: "",
};

export const groupReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GROUP:
      return {
        ...state,
        groupData: payload,
      };
    case ActionTypes.GROUPALL:
      return {
        ...state,
        groupAllRed: payload,
      };

    case ActionTypes.GROUPSAVE:
      return { ...state, storeGroup: payload };

    case ActionTypes.GROUPEDIT:
      return { ...state, GroupEdit: payload };
    default:
      return state;
  }
};
