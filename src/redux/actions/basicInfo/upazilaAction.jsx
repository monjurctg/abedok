import UpazilaServices from "../../../api/district/UpazilaServices";
import { ActionTypes } from "../../constants/action-types";

export const upazilaList = (pageNo) => async (dispatch) => {
  const res = await UpazilaServices.list(pageNo);
  dispatch({
    type: ActionTypes.UPAZILA,
    payload: res.data,
  });
};

export const upazilaAllList = () => async (dispatch) => {
  const res = await UpazilaServices.allList();
  dispatch({
    type: ActionTypes.UPAZILA,
    payload: res.data,
  });
};

export const saveUpazila = (data) => async (dispatch) => {
  let res = await UpazilaServices.store(data);
  dispatch({
    type: ActionTypes.UPAZILASAVE,
    payload: res.data,
  });
};

export const singleUpazilaList = (id) => async (dispatch) => {
  const res = await UpazilaServices.singleList(id);
  dispatch({
    type: ActionTypes.UPAZILASINGLE,
    payload: res.data,
  });
};

export const editUpazila = (data) => async (dispatch) => {
  let dataValue = data;
  if (dataValue) {
    let res = await UpazilaServices.update(data);
    // console.log("res :>> ", res);
    dispatch({
      type: ActionTypes.UPAZILAEDIT,
      payload: res,
    });
  }
  dispatch({
    type: ActionTypes.UPAZILAEDIT,
    payload: data,
  });
};
