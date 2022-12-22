import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../components/alert/tostifyALert";
import ModalDesign from "../../components/modal/ModalDesign";
import {
  editPostOfficeFunction,
  savePostOffice,
} from "../../redux/actions/basicInfo/postOfficeAction";
import { singleUpazilaList } from "../../redux/actions/basicInfo/upazilaAction";
import { inputV } from "../../redux/actions/inputAction";
import { modalState } from "../../redux/actions/modalAction";

function PostOfficeCreate({ modalShow, id, editName, postId }) {
  let dispatch = useDispatch();
  let { inputValue } = useSelector((state) => state.inputVal);
  let { storePostOffice, editPostOffice } = useSelector(
    (state) => state.postOffice
  );

  //   console.log("object :>> ", storePostOffice);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  useMemo(() => {
    if (storePostOffice?.message === "Post Office created Successfully") {
      dispatch(singleUpazilaList(id));
      toastifyAlertSuccess(storePostOffice.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (storePostOffice?.errors) {
      toastifyAlertError(storePostOffice.errors.name[0], "top-center");
    }
  }, [storePostOffice]);

  useMemo(() => {
    if (editPostOffice?.message === "Post Office Updated Successfully") {
      dispatch(singleUpazilaList(id));
      toastifyAlertSuccess(editPostOffice.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (editPostOffice?.errors) {
      toastifyAlertError(editPostOffice.errors.name[0], "top-center");
    }
  }, [editPostOffice]);

  let handleSubmit = () => {
    modalShow === "create"
      ? dispatch(savePostOffice({ name: inputValue, upazila_id: id }))
      : dispatch(
          editPostOfficeFunction({
            name: inputValue,
            upazila_id: id,
            id: postId,
          })
        );
  };
  return (
    <div>
      <ModalDesign
        name={"Post Office"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        modalShow={modalShow}
        editName={editName}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default PostOfficeCreate;
