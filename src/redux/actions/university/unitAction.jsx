// import DepartmentServices from "../../../api/job/DepartmentServices";
import UnitServices from "../../../api/adminssion/UnitServices";
import { ActionTypes } from "../../constants/action-types";

export const unitList = () => async (dispatch) => {
  const res = await UnitServices.list();

  dispatch({ type: ActionTypes.UNIT, payload: res.data });
};

export const unitAll = () => async (dispatch) => {
  const res = await UnitServices.all();

  dispatch({ type: ActionTypes.UNITALL, payload: res.data });
};

export const saveUnit = (data) => async (dispatch) => {
  let res = await UnitServices.store(data);
  dispatch({ type: ActionTypes.UNITSAVE, payload: res.data });
};

export const editUnitData = (data) => async (dispatch) => {
  let res = await UnitServices.update(data);
  dispatch({
    type: ActionTypes.EXAMEDIT,
    payload: res,
  });
};
