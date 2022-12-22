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
  editGroup,
  groupList,
  saveGroup,
} from "../../../redux/actions/university/groupAction";

function GroupInput({ pageNo, modalShow, editName, id }) {
  let dispatch = useDispatch();
  let { inputValue } = useSelector((state) => state.inputVal);
  let { storeGroup } = useSelector((state) => state.group);
  let { GroupEdit } = useSelector((state) => state.group);

  // console.log("editGroup :>> ", GroupEdit);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  // console.log("modalShow :>> ", modalShow);
  useMemo(() => {
    dispatch(loadingState(false));

    if (storeGroup?.message === "Group create Successfully") {
      dispatch(groupList(pageNo));
      toastifyAlertSuccess(storeGroup.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (storeGroup.errors) {
      toastifyAlertError(storeGroup.errors.name[0], "top-center");
    }
  }, [storeGroup]);

  useMemo(() => {
    dispatch(loadingState(false));

    if (GroupEdit?.message === "Group update Successfully") {
      dispatch(groupList(pageNo));
      toastifyAlertSuccess(GroupEdit.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (GroupEdit.errors) {
      toastifyAlertError(GroupEdit.errors.name[0], "top-center");
    }
  }, [GroupEdit]);

  let handleSubmit = () => {
    dispatch(loadingState(true));

    modalShow === "create"
      ? dispatch(saveGroup({ name: inputValue }))
      : dispatch(editGroup({ name: inputValue, id: id }));
  };
  return (
    <div>
      <ModalDesign
        name={"Group"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        editName={editName}
        modalShow={modalShow}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default GroupInput;
