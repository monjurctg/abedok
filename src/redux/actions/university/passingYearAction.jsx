import PassingYearServices from "../../../api/adminssion/PassingYearServices";
import { ActionTypes } from "../../constants/action-types";

export const passingYearList = (pageNo) => async (dispatch) => {
  const res = await PassingYearServices.list(pageNo);
  //   console.log("res :>> ", res);
  dispatch({
    type: ActionTypes.PASSINGYEAR,
    payload: res.data,
  });
};

export const passingYearAllList = () => async (dispatch) => {
  const res = await PassingYearServices.Alllist();
  //   console.log("res :>> ", res);
  dispatch({
    type: ActionTypes.PASSINGYEAR,
    payload: res.data,
  });
};

export const savePassingYear = (data) => async (dispatch) => {
  let res = await PassingYearServices.store(data);
  console.log("res :>> ", res.data);
  dispatch({
    type: ActionTypes.PASSINGYEARSAVE,
    payload: res.data,
  });
};

export const editPassingYear = (data) => async (dispatch) => {
  let res = await PassingYearServices.update(data);
  dispatch({
    type: ActionTypes.PASSINGYEAREDIT,
    payload: res,
  });
};
