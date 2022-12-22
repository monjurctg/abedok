import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../components/alert/tostifyALert";
import ModalDesign from "../../components/modal/ModalDesign";
import { editTerm, termsList } from "../../redux/actions/basicInfo/termsAction";
import { inputV } from "../../redux/actions/inputAction";
import { loadingState, modalState } from "../../redux/actions/modalAction";

function TermInput({ pageNo, modalShow, editName, id }) {
  // console.log("editName :>> ", editName);
  let dispatch = useDispatch();
  let { inputValue } = useSelector((state) => state.inputVal);
  let { editTermsData } = useSelector((state) => state.terms);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  // console.log("storePassingYearReducer :>> ", storePassingYear);

  useMemo(() => {
    if (editTermsData?.message === "Term Updated Successfull") {
      dispatch(loadingState(false));
      dispatch(termsList());
      toastifyAlertSuccess(editTermsData.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (editTermsData?.errors) {
      toastifyAlertError(editTermsData.errors.name[0], "top-center");
    }
  }, [editTermsData]);

  let handleSubmit = () => {
    dispatch(loadingState(true));
    dispatch(editTerm({ details: inputValue, id: id }));
  };
  return (
    <div>
      <ModalDesign
        name={"Terms"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        editName={editName}
        modalShow={modalShow}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default TermInput;
