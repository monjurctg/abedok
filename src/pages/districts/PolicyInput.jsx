import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../components/alert/tostifyALert";
import ModalDesign from "../../components/modal/ModalDesign";
import {
  editPolicy,
  policyList,
} from "../../redux/actions/basicInfo/policyAction";
import { inputV } from "../../redux/actions/inputAction";
import { modalState } from "../../redux/actions/modalAction";

function PolicyInput({ pageNo, modalShow, editName, id }) {
  let dispatch = useDispatch();
  let { inputValue } = useSelector((state) => state.inputVal);
  let { editPolicyData } = useSelector((state) => state.policy);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  useMemo(() => {
    if (editPolicyData?.message === "Policy Updated Successfull") {
      dispatch(policyList());
      toastifyAlertSuccess(editPolicyData.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (editPolicyData?.errors) {
      toastifyAlertError(editPolicyData.errors.name[0], "top-center");
    }
  }, [editPolicyData]);

  let handleSubmit = () => {
    dispatch(editPolicy({ details: inputValue, id: id }));
  };
  return (
    <div>
      <ModalDesign
        name={"Policy"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        editName={editName}
        modalShow={modalShow}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default PolicyInput;
