import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import MainModal from "../../../components/modal/MainModal";
import { inputV } from "../../../redux/actions/inputAction";
import { addRoll, appliedJobsList } from "../../../redux/actions/job/jobs";
import { modalState } from "../../../redux/actions/modalAction";
import {
  addRollAdmission,
  appliedAdmissionList,
} from "../../../redux/actions/university/admissionAction";

function AddRoll({ pageNo, modalShow, id, admission_id }) {
  let { inputValue } = useSelector((state) => state.inputVal);
  let { rollAdd } = useSelector((state) => state.jobCircular);
  console.log("rollAdd :>> ", rollAdd);
  let { rollAdmission } = useSelector((state) => state.admission);

  let dispatch = useDispatch();
  // console.log("id :>> ", id);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  useMemo(() => {
    if (rollAdd?.message === "Roll Updated") {
      dispatch(appliedJobsList(pageNo));
      toastifyAlertSuccess(rollAdd.message, "top-center");
      dispatch(addRoll());
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (rollAdd?.errors) {
      toastifyAlertError(rollAdd.errors.name[0], "top-center");
    }
  }, [rollAdd]);

  useMemo(() => {
    if (rollAdmission?.message === "User Application Updated successfully") {
      dispatch(appliedAdmissionList(pageNo));
      toastifyAlertSuccess(rollAdmission.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (rollAdmission?.errors) {
      toastifyAlertError(rollAdmission.errors.name[0], "top-center");
    }
  }, [rollAdmission]);

  let handleSubmit = () => {
    modalShow === "addAdmission"
      ? dispatch(
          addRollAdmission({
            id: id,
            admission_id: admission_id,
            roll: inputValue,
          })
        )
      : dispatch(addRoll({ id: id, roll: inputValue }));
  };
  return (
    <div>
      <MainModal
        name={"Roll"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        modalShow={modalShow}
        id={id}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default AddRoll;
