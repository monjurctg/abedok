import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import ModalDesign from "../../../components/modal/ModalDesign";
import { inputV } from "../../../redux/actions/inputAction";
import {
  editPost,
  postsList,
  savePost,
} from "../../../redux/actions/job/postAction";
import { loadingState, modalState } from "../../../redux/actions/modalAction";

function InputPost({ pageNo, modalShow, editName, id }) {
  let { inputValue } = useSelector((state) => state.inputVal);
  let { postStoreRed, postEditRed } = useSelector((state) => state.post);

  let dispatch = useDispatch();
  // console.log("editGroup :>> ", GroupEdit);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  // console.log("postEditRed :>> ", postEditRed);
  useMemo(() => {
    dispatch(loadingState(false));
    // console.log("postStoreRed", postStoreRed);
    if (postStoreRed?.message === "Post Created Successfully") {
      dispatch(loadingState(false));
      dispatch(postsList(pageNo));
      toastifyAlertSuccess(postStoreRed.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (postStoreRed?.errors) {
      dispatch(loadingState(false));

      toastifyAlertError(postStoreRed.errors.name[0], "top-center");
    }
  }, [postStoreRed]);

  useMemo(() => {
    if (postEditRed?.message === "Post Name Updated") {
      dispatch(postsList(pageNo));
      dispatch(loadingState(false));
      toastifyAlertSuccess(postEditRed.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (postEditRed?.errors) {
      dispatch(loadingState(false));
      toastifyAlertError(postEditRed.errors.name[0], "top-center");
    }
  }, [postEditRed]);

  let handleSubmit = () => {
    dispatch(loadingState(true));
    modalShow === "create"
      ? dispatch(savePost({ name: inputValue }))
      : dispatch(editPost({ name: inputValue, id: id }));
  };
  return (
    <div>
      <ModalDesign
        name={"Post"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        editName={editName}
        modalShow={modalShow}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default InputPost;
