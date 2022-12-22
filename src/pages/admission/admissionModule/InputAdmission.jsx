import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import ModalAdmissionShow from "../../../components/modal/admission/ModalAdmissionShow";
import ModalCreateAdmission from "../../../components/modal/admission/ModalCreateAdmission";
import ModalEditAdmission from "../../../components/modal/admission/ModalEditAdmission";
import { inputV } from "../../../redux/actions/inputAction";
import { loadingState, modalState } from "../../../redux/actions/modalAction";
import { adminssionList } from "../../../redux/actions/university/admissionAction";

function InputAdmission({ pageNo, modalShow, editName, id }) {
  let { storeAdmissionRed, editAdmissionRed } = useSelector(
    (state) => state.admission
  );

  let dispatch = useDispatch();
  //
  useMemo(() => {
    dispatch(loadingState(false));
    if (storeAdmissionRed?.message === "Admission Created Successfully") {
      dispatch(adminssionList(pageNo));
      toastifyAlertSuccess(storeAdmissionRed.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (storeAdmissionRed?.errors) {
      let errors = Object.values(storeAdmissionRed.errors);
      // console.log("errors :>> ", errors);
      errors.forEach((element) => {
        // console.log("element :>> ", element);
        toastifyAlertError(element[0], "top-center");
      });
    }
  }, [storeAdmissionRed]);

  useMemo(() => {
    dispatch(loadingState(false));
    if (editAdmissionRed?.message === "Admission Updated Successfully") {
      dispatch(adminssionList(pageNo));
      toastifyAlertSuccess(editAdmissionRed.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (editAdmissionRed?.errors) {
      toastifyAlertError(editAdmissionRed.errors.name[0], "top-center");
    }
  }, [editAdmissionRed]);

  return (
    <div>
      {modalShow === "create" ? (
        <ModalCreateAdmission
          name={"Admission"}
          editName={editName}
          modalShow={modalShow}
          id={id}
        />
      ) : modalShow === "show" ? (
        <ModalAdmissionShow id={id} modalShow={modalShow} />
      ) : (
        <ModalEditAdmission
          name={"Admission"}
          editName={editName}
          modalShow={modalShow}
          id={id}
        />
      )}

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default InputAdmission;
