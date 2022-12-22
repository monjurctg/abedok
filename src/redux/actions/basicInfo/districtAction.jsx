import DistrictServices from "../../../api/district/DistrictServices";
import { ActionTypes } from "../../constants/action-types";

export const districtList = (pageNo) => async (dispatch) => {
  const res = await DistrictServices.list(pageNo);
  dispatch({
    type: ActionTypes.DISTRICT,
    payload: res.data,
  });
};

export const districtListAll = () => async (dispatch) => {
  const res = await DistrictServices.allList();
  dispatch({
    type: ActionTypes.DISTRICT,
    payload: res.data,
  });
};

export const saveDistrict = (data) => async (dispatch) => {
  let res = await DistrictServices.store(data);
  dispatch({
    type: ActionTypes.DISTRICTSAVE,
    payload: res.data,
  });
};

export const editDistrict = (data) => async (dispatch) => {
  let dataValue = data;
  if (dataValue) {
    let res = await DistrictServices.update(data);
    // console.log("res :>> ", res);
    dispatch({
      type: ActionTypes.DISTRICTEDIT,
      payload: res,
    });
  }
  dispatch({
    type: ActionTypes.DISTRICTEDIT,
    payload: data,
  });
};

export const singleDistrictList = (id) => async (dispatch) => {
  const res = await DistrictServices.singleList(id);
  dispatch({
    type: ActionTypes.DISTRICTSINGLE,
    payload: res.data,
  });
};
