// import DepartmentServices from "../../../api/job/DepartmentServices";
import DepartmentServices from "../../../api/job/DepartmentServices";
import { ActionTypes } from "../../constants/action-types";

export const departmentList = () => async (dispatch) => {
  const res = await DepartmentServices.list();

  dispatch({ type: ActionTypes.DEPARTMENT, payload: res.data });
};

export const saveDepartment = (data) => (dispatch) => {
  // let res = await DepartmentServices.store(data);
  dispatch({
    type: ActionTypes.DEPARTMENTSAVE,
    payload: data,
  });
};

export const editDepartment = (data) => async (dispatch) => {
  dispatch({
    type: ActionTypes.DEPARTMENTEDIT,
    payload: data,
  });
};
