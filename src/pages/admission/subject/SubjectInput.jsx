import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import SubjectModal from "../../../components/modal/subjectModal/SubjectModal";
import { inputV } from "../../../redux/actions/inputAction";
import { loadingState, modalState } from "../../../redux/actions/modalAction";
import { passingYearList } from "../../../redux/actions/university/passingYearAction";
import { subjectList } from "../../../redux/actions/university/subjectAction";

function SubjectInput({ pageNo, modalShow, editName, id }) {
  let dispatch = useDispatch();

  let { storeSubject } = useSelector((state) => state.subject);
  let { subjectEdit } = useSelector((state) => state.subject);

  // console.log("editGroup :>> ", GroupEdit);

  // console.log("storePassingYearReducer :>> ", storeSubject);
  useMemo(() => {
    dispatch(loadingState(false));
    if (storeSubject?.message === "Subject create Successfully") {
      dispatch(subjectList(pageNo));
      toastifyAlertSuccess(storeSubject.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (storeSubject?.errors) {
      toastifyAlertError(storeSubject.errors.name[0], "top-center");
    }
  }, [storeSubject]);

  useMemo(() => {
    dispatch(loadingState(false));
    if (subjectEdit?.message === "Subject update Successfully") {
      dispatch(passingYearList(pageNo));
      toastifyAlertSuccess(subjectEdit.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (subjectEdit?.errors) {
      toastifyAlertError(subjectEdit.errors.name[0], "top-center");
    }
  }, [subjectEdit]);

  return (
    <div>
      <SubjectModal
        name={"Subject"}
        editName={editName}
        modalShow={modalShow}
      />
      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default SubjectInput;
