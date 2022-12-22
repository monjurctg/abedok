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
  editMajor,
  majorList,
  saveMajor,
} from "../../../redux/actions/university/majorAction";

function MajorInput({ pageNo, modalShow, editName, id }) {
  let dispatch = useDispatch();
  let { inputValue } = useSelector((state) => state.inputVal);
  let { storeMajor, majorEdit } = useSelector((state) => state.major);

  // console.log("editGroup :>> ", GroupEdit);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  // console.log("storePassingYearReducer :>> ", storeMajor);
  useMemo(() => {
    dispatch(loadingState(false));
    if (storeMajor?.message === "Subject create Successfully") {
      dispatch(majorList(pageNo));
      toastifyAlertSuccess(storeMajor.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (storeMajor?.errors) {
      toastifyAlertError(storeMajor.errors.name[0], "top-center");
    }
  }, [storeMajor]);

  useMemo(() => {
    if (majorEdit?.message === "Subject update Successfully") {
      dispatch(majorList(pageNo));
      toastifyAlertSuccess(majorEdit.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (majorEdit?.errors) {
      toastifyAlertError(majorEdit.errors.name[0], "top-center");
    }
  }, [majorEdit]);

  let handleSubmit = () => {
    dispatch(loadingState(true));
    modalShow === "create"
      ? dispatch(saveMajor({ name: inputValue, id }))
      : dispatch(editMajor({ name: inputValue }));
  };
  return (
    <div>
      <ModalDesign
        name={"Major"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        editName={editName}
        modalShow={modalShow}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default MajorInput;
