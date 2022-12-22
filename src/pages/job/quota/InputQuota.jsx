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
  editQuota,
  quotaList,
  saveQuota,
} from "../../../redux/actions/job/quotaAction";
import { modalState } from "../../../redux/actions/modalAction";

function InputQuota({ pageNo, modalShow, editName, id }) {
  let { inputValue } = useSelector((state) => state.inputVal);
  let { quotaStoreRed, quotaEditRed } = useSelector((state) => state.quota);

  let dispatch = useDispatch();
  // console.log("editGroup :>> ", GroupEdit);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  // console.log("storePassingYearReducer :>> ", storePassingYear);
  useMemo(() => {
    if (quotaStoreRed?.message === "Quota create Successfully") {
      dispatch(quotaList(pageNo));
      toastifyAlertSuccess(quotaStoreRed.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (quotaStoreRed?.errors) {
      toastifyAlertError(quotaStoreRed.errors.name[0], "top-center");
    }
  }, [quotaStoreRed]);

  useMemo(() => {
    if (quotaEditRed?.message === "quotas update Successfully") {
      dispatch(quotaList(pageNo));
      toastifyAlertSuccess(quotaEditRed.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (quotaEditRed?.errors) {
      toastifyAlertError(quotaEditRed.errors.name[0], "top-center");
    }
  }, [quotaEditRed]);

  let handleSubmit = () => {
    modalShow === "create"
      ? dispatch(saveQuota({ name: inputValue }))
      : dispatch(editQuota({ name: inputValue, id: id }));
  };
  return (
    <div>
      <ModalDesign
        name={"Quota"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        editName={editName}
        modalShow={modalShow}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default InputQuota;
