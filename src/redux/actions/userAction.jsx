// import DepartmentServices from "../../../api/job/DepartmentServices";
import UserServices from "../../api/user/UserServices";
import { ActionTypes } from "../constants/action-types";

export const userList = (search, pageNo) => async (dispatch) => {
  // console.log("pageNo :>> ", pageNo);
  const res = await UserServices.userlist(search, pageNo);

  dispatch({ type: ActionTypes.USERLIST, payload: res.data });
};

export const userMerchentList = (search, pageNo) => async (dispatch) => {
  // console.log("pageNo :>> ", pageNo);
  const res = await UserServices.merchentUserlist(search, pageNo);

  dispatch({ type: ActionTypes.USERLIST, payload: res.data });
};

export const merchentList = () => async (dispatch) => {
  // console.log("pageNo :>> ", pageNo);
  const res = await UserServices.merchantList();

  dispatch({ type: ActionTypes.MERCHENTLIST, payload: res });
};

export const merchentUserList = () => async (dispatch) => {
  // console.log("pageNo :>> ", pageNo);
  const res = await UserServices.merchantUserList();

  dispatch({ type: ActionTypes.MERCHENTUSERLIST, payload: res.data });
};

export const userListForAdmission =
  (search, pageNo, id) => async (dispatch) => {
    // console.log("pageNo :>> ", pageNo);
    const res = await UserServices.eligibleUserAdmission(search, pageNo, id);

    dispatch({
      type: ActionTypes.ELIGIBLEADMISSIONUSERLIST,
      payload: res.data,
    });
  };

export const userListForJob = (search, pageNo, id) => async (dispatch) => {
  // console.log("pageNo :>> ", pageNo);
  const res = await UserServices.eligibleUserJob(search, pageNo, id);

  dispatch({
    type: ActionTypes.ELIGIBLEJOBUSERLIST,
    payload: res.data,
  });
};

export const singleUser =
  (id = null) =>
  async (dispatch) => {
    const res = await UserServices.singleUser(id);
    dispatch({ type: ActionTypes.SINGLEUSER, payload: res.data });
  };
// export const userCount = () => async (dispatch) => {
//   const res = await UserServices.userlist();

//   dispatch({ type: ActionTypes.USERCOUNT, payload: res.length });
// };

//userCount

// export const activeAdminssionList = () => async (dispatch) => {
//   const res = await AdmissionServices.activeList();

//   dispatch({ type: ActionTypes.ADMISSIONACTIVE, payload: res.data });
// };

// export const changeStatus = (id) => async (dispatch) => {
//   const res = await AdmissionServices.changeActivation(id);

//   dispatch({ type: ActionTypes.ADMISSIONSTATUS, payload: res.data });
// };

// export const saveAdmission = (data) => async (dispatch) => {
//   // console.log("data :>> ", data);
//   let res = await AdmissionServices.store(data);
//   // console.log("res :>> ", res);
//   dispatch({ type: ActionTypes.ADMISSIONSAVE, payload: res.data });
// };

// export const editAdmissionData = (data) => async (dispatch) => {
//   let res = await AdmissionServices.update(data);
//   dispatch({
//     type: ActionTypes.ADMISSIONEDIT,
//     payload: res,
//   });
// };

// export const singleAdminssionList = (id) => async (dispatch) => {
//   const res = await AdmissionServices.singleAdmission(id);

//   dispatch({ type: ActionTypes.ADMISSIONSINGLE, payload: res.data });
// };
