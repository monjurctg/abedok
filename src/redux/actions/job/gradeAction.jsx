// import GradeServices from "../../../api/GradeServices";
import GradeServices from "../../../api/job/GradeServices";
import { ActionTypes } from "../../constants/action-types";

export const gradesList = () => async (dispatch) => {
  const res = await GradeServices.list();
  dispatch({ type: ActionTypes.GRADE, payload: res.data });
};

export const saveGrade = (data) => async (dispatch) => {
  let res = await GradeServices.store(data);
  dispatch({
    type: ActionTypes.GRADESAVE,
    payload: res.data,
  });
};

export const editGrade = (data) => async (dispatch) => {
  let dataValue = data;
  if (dataValue) {
    let res = await GradeServices.update(data);
    // console.log("res :>> ", res);
    dispatch({
      type: ActionTypes.GRADEEDIT,
      payload: res,
    });
  }
  dispatch({
    type: ActionTypes.QUOTAEDIT,
    payload: data,
  });
};
