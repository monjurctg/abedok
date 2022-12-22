import MajorServices from "../../../api/adminssion/MajorServices";
import { ActionTypes } from "../../constants/action-types";

export const majorList = (pageNo) => async (dispatch) => {
  const res = await MajorServices.list(pageNo);
  //   console.log("res :>> ", res);
  dispatch({
    type: ActionTypes.MAJOR,
    payload: res.data,
  });
};

export const allMajorList = () => async (dispatch) => {
  const res = await MajorServices.allList();
  dispatch({
    type: ActionTypes.MAJOR,
    payload: res.data,
  });
};

export const saveMajor = (data) => async (dispatch) => {
  let res = await MajorServices.store(data);
  // console.log("res :>> ", res.data);
  dispatch({
    type: ActionTypes.MAJORSAVE,
    payload: res.data,
  });
};

export const editMajor = (data) => async (dispatch) => {
  let res = await MajorServices.update(data);
  dispatch({
    type: ActionTypes.MAJOREDIT,
    payload: res,
  });
};

export const singleSubjectList = (id) => async (dispatch) => {
  const res = await MajorServices.singleList(id);
  //   console.log("res :>> ", res);
  dispatch({
    type: ActionTypes.SINGLEMAJOR,
    payload: res.data,
  });
};
