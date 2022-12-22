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
  editGrade,
  gradesList,
  saveGrade,
} from "../../../redux/actions/job/gradeAction";
import { loadingState, modalState } from "../../../redux/actions/modalAction";

function InputGrade({ pageNo, modalShow, editName, id }) {
  let { inputValue } = useSelector((state) => state.inputVal);
  let { gradeStoreRed, gradeEditRed } = useSelector((state) => state.grade);

  let dispatch = useDispatch();
  // console.log("editGroup :>> ", GroupEdit);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  // console.log("storePassingYearReducer :>> ", storePassingYear);
  useMemo(() => {
    if (gradeStoreRed?.message === "Grade create Successfully") {
      dispatch(loadingState(false));
      dispatch(gradesList(pageNo));
      toastifyAlertSuccess(gradeStoreRed.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (gradeStoreRed?.errors) {
      dispatch(loadingState(false));
      toastifyAlertError(gradeStoreRed.errors.name[0], "top-center");
    }
  }, [gradeStoreRed]);

  useMemo(() => {
    if (gradeEditRed?.message === "Grade update Successfully") {
      dispatch(loadingState(false));

      dispatch(gradesList(pageNo));
      toastifyAlertSuccess(gradeEditRed.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (gradeEditRed?.errors) {
      dispatch(loadingState(false));
      toastifyAlertError(gradeEditRed.errors.name[0], "top-center");
    }
  }, [gradeEditRed]);

  let handleSubmit = () => {
    dispatch(loadingState(true));
    modalShow === "create"
      ? dispatch(saveGrade({ name: inputValue }))
      : dispatch(editGrade({ name: inputValue, id: id }));
  };
  return (
    <div>
      <ModalDesign
        name={"Grade"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        editName={editName}
        modalShow={modalShow}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default InputGrade;
