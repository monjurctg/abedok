import NotificationServices from "../../api/NotificationServices";
import { ActionTypes } from "../constants/action-types";

export const getNotification = () => async (dispatch) => {
  let res = await NotificationServices.notifications();
  dispatch({ type: ActionTypes.NOTIFICATONS, payload: res.data.notifications });
};

export const getNotificationCount = () => async (dispatch) => {
  let res = await NotificationServices.notifications();
  // console.log("res.data.length :>> ", res.data.notifications?.length);
  let count = res.data.notifications?.length;
  // console.log("count :>> ", count);
  dispatch({ type: ActionTypes.NOTIFICATONSCOUNT, payload: count });
};

// export const universityAll = () => async (dispatch) => {
//   const res = await UniversityServices.all();
//   // console.log("universityAll :>> ", res);
//   dispatch({
//     type: ActionTypes.UNIVERSITYALL,
//     payload: res.data,
//   });
// };
