// import DepartmentServices from "../../../api/job/DepartmentServices";
import JobCircularServices from "../../../api/job/JobCircularServices";
import { ActionTypes } from "../../constants/action-types";

export const jobCircularList = (pageNo) => async (dispatch) => {
  const res = await JobCircularServices.list(pageNo);

  dispatch({ type: ActionTypes.JOBCIRCULAR, payload: res.data });
};

export const activeJobCircularList = (pageNo) => async (dispatch) => {
  const res = await JobCircularServices.activeList(pageNo);

  dispatch({ type: ActionTypes.JOBCIRCULARACTIVE, payload: res.data });
};

export const changeJobCircularStatus = (id) => async (dispatch) => {
  const res = await JobCircularServices.changeActivation(id);

  dispatch({ type: ActionTypes.JOBCIRCULARSTATUS, payload: res.data });
};

export const saveJobCircular = (data) => async (dispatch) => {
  // console.log("data :>> ", data);
  let res = await JobCircularServices.store(data);
  // console.log("res :>> ", res);
  dispatch({ type: ActionTypes.JOBCIRCULARSAVE, payload: res.data });
};

export const editJobCircularData = (data) => async (dispatch) => {
  // console.log("data :>> ", data);
  let res = await JobCircularServices.update(data);
  dispatch({
    type: ActionTypes.JOBCIRCULAREDIT,
    payload: res,
  });
};

export const singlejobCircularList = (id) => async (dispatch) => {
  const res = await JobCircularServices.singleJob(id);

  dispatch({ type: ActionTypes.JOBCIRCULARSINGLE, payload: res.data.data });
};
