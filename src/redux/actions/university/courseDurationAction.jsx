import CourseDurationServices from "../../../api/adminssion/CourseDurationServices";
import { ActionTypes } from "../../constants/action-types";

export const courseDurationList = (pageNo) => async (dispatch) => {
  const res = await CourseDurationServices.list(pageNo);
  //   console.log("res :>> ", res);
  dispatch({
    type: ActionTypes.COURSEDURATION,
    payload: res.data,
  });
};

export const courseDurationAllList = () => async (dispatch) => {
  const res = await CourseDurationServices.allList();
  //   console.log("res :>> ", res);
  dispatch({
    type: ActionTypes.COURSEDURATION,
    payload: res.data,
  });
};

export const saveCourseDuration = (data) => async (dispatch) => {
  let res = await CourseDurationServices.store(data);
  dispatch({
    type: ActionTypes.COURSEDURATIONSAVE,
    payload: res.data,
  });
};

export const editCourseDuration = (data) => async (dispatch) => {
  let res = await CourseDurationServices.update(data);
  dispatch({
    type: ActionTypes.COURSEDURATIONEDIT,
    payload: res,
  });
};
