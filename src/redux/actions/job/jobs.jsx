// import GradeServices from "../../../api/GradeServices";
import JobApplyServices from "../../../api/job/JobApplied";
import QuotaServices from "../../../api/job/QuotaServices";
import { ActionTypes } from "../../constants/action-types";

export const appliedJobsList = (pageNo) => async (dispatch) => {
  const res = await JobApplyServices.list(pageNo);
  dispatch({ type: ActionTypes.JOBAPPLIEDLIST, payload: res.data });
};

export const appliedJobsListMerchents = (pageNo) => async (dispatch) => {
  const res = await JobApplyServices.merchentsList(pageNo);
  dispatch({ type: ActionTypes.JOBAPPLIEDLISTMERCHENTS, payload: res.data });
};

export const paymentAdmin = (pageNo) => async (dispatch) => {
  const res = await JobApplyServices.paymentListAdmin(pageNo);
  dispatch({ type: ActionTypes.PAYMENTADMIN, payload: res.data });
};

export const appliedJobsPendingList = () => async (dispatch) => {
  const res = await JobApplyServices.pendinglist();
  // console.log("res :>> ", res);
  // let values = res.data.data.filter((data) => data.current_status == null);
  // console.log("values :>> ", values);
  dispatch({ type: ActionTypes.JOBPENDINGLIST, payload: res.data.data });
};

export const saveQuota = (data) => async (dispatch) => {
  let res = await QuotaServices.store(data);
  dispatch({
    type: ActionTypes.QUOTASAVE,
    payload: res.data,
  });
};

export const addRoll = (data) => async (dispatch) => {
  console.log("data :>> ", data);
  if (data) {
    const res = await JobApplyServices.updateROll(data);
    dispatch({ type: ActionTypes.ROLLADD, payload: res.data });
  } else {
    dispatch({ type: ActionTypes.ROLLADD, payload: "" });
  }
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
