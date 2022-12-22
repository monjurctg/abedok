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
  editPassingYear,
  passingYearList,
  savePassingYear,
} from "../../../redux/actions/university/passingYearAction";

function PassingYearInput({ pageNo, modalShow, editName, id }) {
  let dispatch = useDispatch();
  let { inputValue } = useSelector((state) => state.inputVal);
  let { storePassingYear } = useSelector((state) => state.passingYear);
  let { PassingYearEdit } = useSelector((state) => state.passingYear);

  // console.log("editGroup :>> ", GroupEdit);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  // console.log("storePassingYearReducer :>> ", storePassingYear);
  useMemo(() => {
    dispatch(loadingState(false));
    if (storePassingYear?.message === "Passing Year create Successfully") {
      dispatch(passingYearList(pageNo));
      toastifyAlertSuccess(storePassingYear.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (storePassingYear?.errors) {
      toastifyAlertError(storePassingYear.errors.name[0], "top-center");
    }
  }, [storePassingYear]);

  useMemo(() => {
    dispatch(loadingState(false));

    if (PassingYearEdit?.message === "Passing Year update Successfully") {
      dispatch(passingYearList(pageNo));
      toastifyAlertSuccess(PassingYearEdit.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (PassingYearEdit?.errors) {
      toastifyAlertError(PassingYearEdit.errors.name[0], "top-center");
    }
  }, [PassingYearEdit]);

  let handleSubmit = () => {
    dispatch(loadingState(true));

    modalShow === "create"
      ? dispatch(savePassingYear({ name: inputValue }))
      : dispatch(editPassingYear({ name: inputValue, id: id }));
  };
  return (
    <div>
      <ModalDesign
        name={"Passing Year"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        editName={editName}
        modalShow={modalShow}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default PassingYearInput;
