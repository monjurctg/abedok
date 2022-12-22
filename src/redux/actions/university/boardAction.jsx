// import DepartmentServices from "../../../api/job/DepartmentServices";
import BoardServices from "../../../api/adminssion/BoardServices";
import { ActionTypes } from "../../constants/action-types";

export const boardList = (pageNo) => async (dispatch) => {
  const res = await BoardServices.list(pageNo);
  dispatch({
    type: ActionTypes.BOARD,
    payload: res.data,
  });
};

export const boardAllList = () => async (dispatch) => {
  const res = await BoardServices.allList();
  dispatch({
    type: ActionTypes.BOARD,
    payload: res.data,
  });
};

export const saveBoard = (data) => async (dispatch) => {
  // dispatch(loadingState())
  let res = await BoardServices.store(data);
  console.log("resddds :>> ", res);
  dispatch({
    type: ActionTypes.BOARDSAVE,
    payload: res.data,
  });
};

export const editBoard = (data) => async (dispatch) => {
  let res = await BoardServices.update(data);
  dispatch({
    type: ActionTypes.BOARDEDIT,
    payload: res,
  });
};
