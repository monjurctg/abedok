import { ActionTypes } from "../../constants/action-types";

const initialState = {
  postList: [],
  postStoreRed: false,
  postEditRed: false,
};

export const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.POST:
      return {
        ...state,
        postList: payload,
      };
    case ActionTypes.POSTSAVE:
      return {
        ...state,
        postStoreRed: payload,
      };
    case ActionTypes.POSTEDIT:
      return {
        ...state,
        postEditRed: payload,
      };
    default:
      return state;
  }
};
