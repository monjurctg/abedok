import { ActionTypes } from "../constants/action-types";

const initialState = {
  roleListRed: "",
  roleStoreRed: false,
  singleRoleRed: "",
  roleEditRed: "",
};

export const roleReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ROLELIST:
      return { ...state, roleListRed: payload };
    case ActionTypes.SINGLEROLELIST:
      return { ...state, singleRoleRed: payload };
    case ActionTypes.ROLESAVE:
      return { ...state, roleStoreRed: payload };
    case ActionTypes.ROLEEDIT:
      return { ...state, roleEditRed: payload };

    default:
      return state;
  }
};
