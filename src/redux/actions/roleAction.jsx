import RoleServices from "../../api/RoleServices";
import { ActionTypes } from "../constants/action-types";

export const roleList = (pageNo) => async (dispatch) => {
  const res = await RoleServices.list(pageNo);

  dispatch({ type: ActionTypes.ROLELIST, payload: res.data });
};

export const singleRoleList = (id) => async (dispatch) => {
  const res = await RoleServices.singleRole(id);

  dispatch({ type: ActionTypes.SINGLEROLELIST, payload: res.data });
};

export const roleSave = (value) => async (dispatch) => {
  if (value) {
    const res = await RoleServices.store(value);
    dispatch({ type: ActionTypes.ROLESAVE, payload: res });
  } else {
    dispatch({ type: ActionTypes.ROLESAVE, payload: "" });
  }
};

export const editRoleData = (data) => async (dispatch) => {
  let res = await RoleServices.update(data);
  dispatch({
    type: ActionTypes.ROLEEDIT,
    payload: res,
  });
};
