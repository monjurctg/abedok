import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import ModalDesign from "../../../components/modal/ModalDesign";
import { inputV } from "../../../redux/actions/inputAction";
import { loadingState, modalState } from "../../../redux/actions/modalAction";
import {
  editExamination,
  examList,
  saveExam,
} from "../../../redux/actions/university/examAction";

function ExamInput({ pageNo, modalShow, editName, id }) {
  let { inputValue } = useSelector((state) => state.inputVal);
  let { storeExam, editExam } = useSelector((state) => state.exam);

  let dispatch = useDispatch();
  // console.log("editGroup :>> ", GroupEdit);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  // console.log("storePassingYearReducer :>> ", storePassingYear);
  useMemo(() => {
    dispatch(loadingState(false));

    if (storeExam?.message === "Examination create Successfully") {
      dispatch(examList(pageNo));
      toastifyAlertSuccess(storeExam.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (storeExam?.errors) {
      toastifyAlertError(storeExam.errors.name[0], "top-center");
    }
  }, [storeExam]);

  useMemo(() => {
    dispatch(loadingState(false));

    if (editExam?.message === "Examination update Successfully") {
      dispatch(examList(pageNo));
      toastifyAlertSuccess(editExam.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (editExam?.errors) {
      toastifyAlertError(editExam.errors.name[0], "top-center");
    }
  }, [editExam]);

  let handleSubmit = () => {
    dispatch(loadingState(true));

    modalShow === "create"
      ? dispatch(saveExam({ name: inputValue }))
      : dispatch(editExamination({ name: inputValue, id: id }));
  };
  return (
    <div>
      <ModalDesign
        name={"Exam"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        editName={editName}
        modalShow={modalShow}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default ExamInput;
