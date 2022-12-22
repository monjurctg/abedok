// import GradeServices from "../../../api/GradeServices";
import QuotaServices from "../../../api/job/QuotaServices";
import { ActionTypes } from "../../constants/action-types";

export const quotaList = () => async (dispatch) => {
  const res = await QuotaServices.list();
  dispatch({ type: ActionTypes.QUOTA, payload: res.data });
};

export const allQuotaList = () => async (dispatch) => {
  const res = await QuotaServices.allList();
  dispatch({ type: ActionTypes.QUOTA, payload: res.data });
};

export const saveQuota = (data) => async (dispatch) => {
  let res = await QuotaServices.store(data);
  dispatch({
    type: ActionTypes.QUOTASAVE,
    payload: res.data,
  });
};

export const editQuota = (data) => async (dispatch) => {
  let dataValue = data;
  if (dataValue) {
    let res = await QuotaServices.update(data);
    // console.log("res :>> ", res);
    dispatch({
      type: ActionTypes.QUOTAEDIT,
      payload: res,
    });
  }
  dispatch({
    type: ActionTypes.QUOTAEDIT,
    payload: data,
  });
};
