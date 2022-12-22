// import DepartmentServices from "../../../api/job/DepartmentServices";
import ExamServices from "../../../api/adminssion/ExamService";
import { ActionTypes } from "../../constants/action-types";

export const examList = (pageNo) => async (dispatch) => {
  const res = await ExamServices.list(pageNo);
  dispatch({
    type: ActionTypes.EXAM,
    payload: res.data,
  });
};

export const examAllList = () => async (dispatch) => {
  const res = await ExamServices.Alllist();
  dispatch({
    type: ActionTypes.EXAM,
    payload: res.data,
  });
};

export const saveExam = (data) => async (dispatch) => {
  let res = await ExamServices.store(data);
  dispatch({
    type: ActionTypes.EXAMSAVE,
    payload: res.data,
  });
};

export const editExamination = (data) => async (dispatch) => {
  let res = await ExamServices.update(data);
  dispatch({
    type: ActionTypes.EXAMEDIT,
    payload: res,
  });
};
