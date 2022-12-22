import { ActionTypes } from "../constants/action-types";

// export const loginFunction = (data) => async (dispatch) => {
//   const res = await AuthServices.login(data);
//   console.log("res :>> ", res);
//   if (res.status === 201) {
//     dispatch({ type: ActionTypes.LOGIN, payload: res, val: true });
//   } else if (res.status === 422) {
//     dispatch({ type: ActionTypes.LOGIN, payload: res, val: false });
//   }
// };

export const loginFunction = (data) => {
  // console.log("message :>> ", message);
  return {
    type: ActionTypes.LOGIN,
    payload: data,
  };
};
export const setCurrentUser = (user) => {};

export const loginError = (message) => {
  return {
    type: ActionTypes.ERROR,
    payload: message,
  };
};
