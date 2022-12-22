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
  courseDurationList,
  editCourseDuration,
  saveCourseDuration,
} from "../../../redux/actions/university/courseDurationAction";

function CourseDurationInput({ pageNo, modalShow, editName, id }) {
  let dispatch = useDispatch();
  let { inputValue } = useSelector((state) => state.inputVal);
  let { storeCourseDuration } = useSelector((state) => state.course);
  let { CourseDurationEdit } = useSelector((state) => state.course);

  // console.log("editGroup :>> ", GroupEdit);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  // console.log("storePassingYearReducer :>> ", storeCourseDuration);
  useMemo(() => {
    dispatch(loadingState(false));
    if (storeCourseDuration?.message === "courseDuration create Successfully") {
      dispatch(courseDurationList(pageNo));
      toastifyAlertSuccess(storeCourseDuration.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (storeCourseDuration?.errors) {
      toastifyAlertError(storeCourseDuration.errors.name[0], "top-center");
    }
  }, [storeCourseDuration]);

  useMemo(() => {
    dispatch(loadingState(false));

    if (CourseDurationEdit?.message === "CourseDuration update Successfully") {
      dispatch(courseDurationList(pageNo));
      toastifyAlertSuccess(CourseDurationEdit.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (CourseDurationEdit?.errors) {
      toastifyAlertError(CourseDurationEdit.errors.name[0], "top-center");
    }
  }, [CourseDurationEdit]);

  let handleSubmit = () => {
    dispatch(loadingState(true));
    modalShow === "create"
      ? dispatch(saveCourseDuration({ name: inputValue }))
      : dispatch(editCourseDuration({ name: inputValue, id: id }));
  };
  return (
    <div>
      <ModalDesign
        name={"Course Duration"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        editName={editName}
        modalShow={modalShow}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default CourseDurationInput;
