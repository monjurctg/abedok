import { ActionTypes } from "../../constants/action-types";

const initialState = {
  boardData: [],
  storeBoard: "",
  editBoardData: "",
};

export const boardReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.BOARD:
      return {
        ...state,

        boardData: payload,
      };
    case ActionTypes.BOARDSAVE:
      return { ...state, storeBoard: payload };
    case ActionTypes.BOARDEDIT:
      return { ...state, editBoardData: payload };
    default:
      return state;
  }
};
