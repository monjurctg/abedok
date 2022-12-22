// import DepartmentServices from "../../../api/job/DepartmentServices";
import UniversityServices from "../../../api/adminssion/UniversityServices";
import { ActionTypes } from "../../constants/action-types";

export const universityList = (pageNo) => async (dispatch) => {
  const res = await UniversityServices.list(pageNo);

  dispatch({ type: ActionTypes.UNIVERSITY, payload: res.data });
};

export const universityAll = () => async (dispatch) => {
  const res = await UniversityServices.all();
  // console.log("universityAll :>> ", res);
  dispatch({
    type: ActionTypes.UNIVERSITYALL,
    payload: res.data,
  });
};
