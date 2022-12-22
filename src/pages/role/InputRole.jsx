import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../components/alert/tostifyALert";
import RoleDesign from "../../components/modal/RoleModal";
import { inputV } from "../../redux/actions/inputAction";
import { modalState } from "../../redux/actions/modalAction";
import { roleList, roleSave } from "../../redux/actions/roleAction";

function InputRole({ pageNo, modalShow, editName, id }) {
  let { roleStoreRed, roleEditRed } = useSelector((state) => state.role);
  console.log("roleEditRed :>> ", roleStoreRed[0]);

  let dispatch = useDispatch();
  // console.log("editGroup :>> ", GroupEdit);

  // console.log("storePassingYearReducer :>> ", storePassingYear);
  useMemo(() => {
    if (roleStoreRed[0] === "Role & Permission create Successfully") {
      dispatch(roleList(pageNo));
      dispatch(modalState(false));
      dispatch(roleSave(""));
      dispatch(inputV(""));
      toastifyAlertSuccess(roleStoreRed[0], "top-center");
    } else if (roleStoreRed.status === 500) {
      toastifyAlertError(roleStoreRed.data.message, "top-center");
    }
  }, [roleStoreRed]);

  useMemo(() => {
    if (roleEditRed?.message === "Role & Permission Edit Successfully") {
      dispatch(roleList(pageNo));
      toastifyAlertSuccess(roleEditRed.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (roleEditRed?.message) {
      toastifyAlertError(roleEditRed?.message, "top-center");
    }
  }, [roleEditRed]);

  return (
    <div>
      <RoleDesign
        name={"Role"}
        // handleSubmit={handleSubmit}
        editName={editName}
        modalShow={modalShow}
        id={id}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default InputRole;
