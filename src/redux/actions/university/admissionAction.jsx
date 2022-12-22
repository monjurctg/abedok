// import DepartmentServices from "../../../api/job/DepartmentServices";
import AdmissionServices from "../../../api/adminssion/AdmissionServices";
import { ActionTypes } from "../../constants/action-types";

export const adminssionList = (pageNo) => async (dispatch) => {
  const res = await AdmissionServices.list(pageNo);

  dispatch({ type: ActionTypes.ADMISSION, payload: res.data });
};

export const activeAdminssionList = () => async (dispatch) => {
  const res = await AdmissionServices.activeList();

  dispatch({ type: ActionTypes.ADMISSIONACTIVE, payload: res.data });
};

export const appliedAdmissionList = () => async (dispatch) => {
  const res = await AdmissionServices.appliedList();
  dispatch({ type: ActionTypes.ADMISSIONAPPLIEDLIST, payload: res.data });
};

export const addRollAdmission = (data) => async (dispatch) => {
  const res = await AdmissionServices.updateROllAdmission(data);
  dispatch({ type: ActionTypes.ADMISSIONROLLADD, payload: res.data });
};

export const singleAppliedAdmissionList = (id) => async (dispatch) => {
  const res = await AdmissionServices.admissionAppliedSingleList(id);
  dispatch({ type: ActionTypes.SINGLEADMISSIONAPPLIEDLIST, payload: res.data });
};

export const changeStatus = (id) => async (dispatch) => {
  const res = await AdmissionServices.changeActivation(id);

  dispatch({ type: ActionTypes.ADMISSIONSTATUS, payload: res.data });
};

export const saveAdmission = (data) => async (dispatch) => {
  // console.log("data :>> ", data);
  let res = await AdmissionServices.store(data);
  // console.log("res :>> ", res);
  dispatch({ type: ActionTypes.ADMISSIONSAVE, payload: res.data });
};

export const editAdmissionData = (data) => async (dispatch) => {
  let res = await AdmissionServices.update(data);
  dispatch({
    type: ActionTypes.ADMISSIONEDIT,
    payload: res,
  });
};

export const singleAdminssionList = (id) => async (dispatch) => {
  if (id) {
    const res = await AdmissionServices.singleAdmission(id);
    dispatch({ type: ActionTypes.ADMISSIONSINGLE, payload: res.data });
  } else {
    dispatch({ type: ActionTypes.ADMISSIONSINGLE, payload: false });
  }
};

export const appliedAdmissionListMerchents = (pageNo) => async (dispatch) => {
  const res = await AdmissionServices.merchentsList(pageNo);
  dispatch({
    type: ActionTypes.ADMISSIONAPPLIEDLISTMERCHENTS,
    payload: res.data,
  });
};
