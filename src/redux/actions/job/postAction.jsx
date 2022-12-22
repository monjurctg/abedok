// import GradeServices from "../../../api/GradeServices";
import PostServices from "../../../api/job/PostServices";
import { ActionTypes } from "../../constants/action-types";

export const postsList = () => async (dispatch) => {
  const res = await PostServices.list();
  dispatch({ type: ActionTypes.POST, payload: res.data });
};

export const postsAllList = () => async (dispatch) => {
  const res = await PostServices.allList();
  dispatch({ type: ActionTypes.POST, payload: res.data });
};

export const savePost = (data) => async (dispatch) => {
  let res = await PostServices.store(data);
  console.log("res :>> ", res);
  dispatch({
    type: ActionTypes.POSTSAVE,
    payload: res.data,
  });
};

export const editPost = (data) => async (dispatch) => {
  let dataValue = data;
  if (dataValue) {
    let res = await PostServices.update(data);
    // console.log("res :>> ", res);
    dispatch({
      type: ActionTypes.POSTEDIT,
      payload: res,
    });
  }
  dispatch({
    type: ActionTypes.POSTEDIT,
    payload: data,
  });
};
