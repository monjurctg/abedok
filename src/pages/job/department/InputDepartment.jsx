import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import { MemoDepartmentModal } from "../../../components/modal/DepartmentModal";
import { inputV } from "../../../redux/actions/inputAction";
import {
  departmentList,
  editDepartment,
  saveDepartment,
} from "../../../redux/actions/job/departmentAction";
import { loadingState, modalState } from "../../../redux/actions/modalAction";

function InputDepartment({ pageNo, modalShow, editName, id }) {
  let { inputValue } = useSelector((state) => state.inputVal);
  let { departmentStoreRed, departmentEditRed } = useSelector(
    (state) => state.departments
  );

  let dispatch = useDispatch();
  // console.log("editGroup :>> ", GroupEdit);

  // console.log("storePassingYearReducer :>> ", storePassingYear);
  useMemo(() => {
    dispatch(loadingState(false));
    if (departmentStoreRed?.message === "Department created Successfully") {
      dispatch(departmentList(pageNo));
      dispatch(modalState(false));
      dispatch(inputV(""));
      toastifyAlertSuccess(departmentStoreRed.message, "top-center");
    } else if (departmentStoreRed?.errors) {
      toastifyAlertError(departmentStoreRed.errors.name[0], "top-center");
    }
  }, [departmentStoreRed]);

  useMemo(() => {
    if (departmentEditRed?.message === "Department updated Successfully") {
      dispatch(departmentList(pageNo));
      toastifyAlertSuccess(departmentEditRed.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (departmentEditRed?.errors) {
      toastifyAlertError(departmentEditRed.errors.name[0], "top-center");
    }
  }, [departmentEditRed]);

  let handleSubmit = () => {
    dispatch(loadingState(true));
    console.log("inputValue :>> ", inputValue);
    modalShow === "create"
      ? dispatch(saveDepartment({ name: inputValue }))
      : dispatch(editDepartment({ name: inputValue, id: id }));
  };
  return (
    <div>
      <MemoDepartmentModal
        name={"Department"}
        handleSubmit={handleSubmit}
        editName={editName}
        modalShow={modalShow}
        id={id}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default InputDepartment;
