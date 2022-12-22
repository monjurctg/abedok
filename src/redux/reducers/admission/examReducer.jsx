import { ActionTypes } from "../../constants/action-types";

const initialState = {
  examData: [],
  storeExam: "",
  editExam: "",
};

export const examReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.EXAM:
      return {
        ...state,

        examData: payload,
      };
    case ActionTypes.EXAMSAVE:
      return { ...state, storeExam: payload };
    case ActionTypes.EXAMEDIT:
      return { ...state, editExam: payload };
    default:
      return state;
  }
};
