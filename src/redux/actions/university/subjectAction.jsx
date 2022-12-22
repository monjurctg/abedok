import SubjectServices from "../../../api/adminssion/SubjectServices";
import { ActionTypes } from "../../constants/action-types";

export const subjectList = (pageNo) => async (dispatch) => {
  const res = await SubjectServices.list(pageNo);
  //   console.log("res :>> ", res);
  dispatch({
    type: ActionTypes.SUBJECT,
    payload: res.data,
  });
};

export const allSubjectList = () => async (dispatch) => {
  const res = await SubjectServices.listAll();
  //   console.log("res :>> ", res);
  dispatch({
    type: ActionTypes.SUBJECT,
    payload: res.data,
  });
};

export const saveSubject = (data) => async (dispatch) => {
  let res = await SubjectServices.store(data);
  dispatch({
    type: ActionTypes.SUBJECTSAVE,
    payload: res.data,
  });
};

export const editSubject = (data) => async (dispatch) => {
  if (data) {
    let res = await SubjectServices.update(data);
    // console.log("res :>> ", res);
    dispatch({
      type: ActionTypes.SUBJECTEDIT,
      payload: res,
    });
  } else {
    dispatch({
      type: ActionTypes.SUBJECTEDIT,
      payload: "",
    });
  }
};

export const singleSubjectList = (id) => async (dispatch) => {
  const res = await SubjectServices.singleList(id);
  //   console.log("res :>> ", res);
  dispatch({
    type: ActionTypes.SINGLESUBJECT,
    payload: res.data,
  });
};
