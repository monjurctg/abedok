import GroupServices from "../../../api/adminssion/GroupServices";
import { ActionTypes } from "../../constants/action-types";

export const groupList = (pageNo) => async (dispatch) => {
  const res = await GroupServices.list(pageNo);
  //   console.log("res :>> ", res);
  dispatch({
    type: ActionTypes.GROUP,
    payload: res.data,
  });
};

export const groupAll = (pageNo) => async (dispatch) => {
  const res = await GroupServices.all();
  console.log("res :>> ", res);
  dispatch({
    type: ActionTypes.GROUPALL,
    payload: res.data,
  });
};

export const saveGroup = (data) => async (dispatch) => {
  let res = await GroupServices.store(data);
  // console.log("res :>> ", res);
  dispatch({
    type: ActionTypes.GROUPSAVE,
    payload: res.data,
  });
};

export const editGroup = (data) => async (dispatch) => {
  let res = await GroupServices.update(data);
  dispatch({
    type: ActionTypes.GROUPEDIT,
    payload: res,
  });
};
