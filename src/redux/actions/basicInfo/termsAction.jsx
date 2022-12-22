import TermsServices from "../../../api/district/TermsServices";
import { ActionTypes } from "../../constants/action-types";

export const termsList = () => async (dispatch) => {
  const res = await TermsServices.list();
  dispatch({
    type: ActionTypes.TERMS,
    payload: res.data,
  });
};

export const saveTerm = (data) => async (dispatch) => {
  let res = await TermsServices.store(data);
  dispatch({
    type: ActionTypes.TERMSSAVE,
    payload: res.data,
  });
};

export const editTerm = (data) => async (dispatch) => {
  let res = await TermsServices.update(data);
  dispatch({
    type: ActionTypes.TERMSEDIT,
    payload: res,
  });
};
