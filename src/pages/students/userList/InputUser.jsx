import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import ModalUserShow from "../../../components/modal/userModal/ModalUserShow";
import { jobCircularList } from "../../../redux/actions/job/jobCircularAction";
import { modalState } from "../../../redux/actions/modalAction";

function InputUser({ pageNo, modalShow, editName, id }) {
  let { editJobRed } = useSelector((state) => state.jobCircular);

  let dispatch = useDispatch();

  useMemo(() => {
    if (editJobRed?.message === "Job Updated Successfully") {
      dispatch(jobCircularList(pageNo));
      toastifyAlertSuccess(editJobRed.message, "top-center");
      dispatch(modalState(false));
      // dispatch(inputV(""));
    } else if (editJobRed?.errors) {
      toastifyAlertError(editJobRed.errors.name[0], "top-center");
    }
  }, [editJobRed]);

  // console.log("modalShowdfsdfsdf", modalShow);

  return (
    <div>
      {modalShow === "userShow" ? (
        <ModalUserShow id={id} modalShow={modalShow} />
      ) : (
        ""
      )}

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default InputUser;
