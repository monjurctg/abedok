import PolicyServices from "../../../api/district/PolicyServices";
import { ActionTypes } from "../../constants/action-types";

export const policyList = (pageNo) => async (dispatch) => {
  const res = await PolicyServices.list(pageNo);
  dispatch({
    type: ActionTypes.POLICY,
    payload: res.data,
  });
};

export const savePolicy = (data) => async (dispatch) => {
  let res = await PolicyServices.store(data);
  dispatch({
    type: ActionTypes.POLICYSAVE,
    payload: res.data,
  });
};

export const editPolicy = (data) => async (dispatch) => {
  let res = await PolicyServices.update(data);
  dispatch({
    type: ActionTypes.POLICYEDIT,
    payload: res,
  });
};
