import PostOfficeServices from "../../../api/district/PostOfficeServices";
import { ActionTypes } from "../../constants/action-types";

export const postOfficeList = (pageNo) => async (dispatch) => {
  const res = await PostOfficeServices.list(pageNo);
  dispatch({
    type: ActionTypes.POSTOFFICE,
    payload: res.data,
  });
};

export const postOfficeALl = () => async (dispatch) => {
  const res = await PostOfficeServices.allList();
  dispatch({
    type: ActionTypes.POSTOFFICE,
    payload: res.data,
  });
};

export const savePostOffice = (data) => async (dispatch) => {
  let res = await PostOfficeServices.store(data);
  dispatch({
    type: ActionTypes.POSTOFFICESAVE,
    payload: res.data,
  });
};

export const editPostOfficeFunction = (data) => async (dispatch) => {
  let dataValue = data;
  if (dataValue) {
    let res = await PostOfficeServices.update(data);
    // console.log("res :>> ", res);
    dispatch({
      type: ActionTypes.POSTOFFICEEDIT,
      payload: res,
    });
  }
  dispatch({
    type: ActionTypes.POSTOFFICEEDIT,
    payload: data,
  });
};
