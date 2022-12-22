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
  editUnitData,
  saveUnit,
  unitList,
} from "../../../redux/actions/university/unitAction";

function InputUnit({ pageNo, modalShow, editName, id }) {
  let { inputValue } = useSelector((state) => state.inputVal);
  let { storeUnit, editUnit } = useSelector((state) => state.unit);

  let dispatch = useDispatch();
  // console.log("editUnit :>> ", editUnit.data);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  // console.log("storePassingYearReducer :>> ", storePassingYear);
  useMemo(() => {
    dispatch(loadingState(false));

    if (storeUnit?.message === "Unit Created Successfully") {
      dispatch(unitList(pageNo));
      toastifyAlertSuccess(storeUnit.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (storeUnit?.errors) {
      toastifyAlertError(storeUnit.errors.name[0], "top-center");
    }
  }, [storeUnit]);

  useMemo(() => {
    if (editUnit?.message === "Unit Updated Successfully") {
      dispatch(unitList(pageNo));
      toastifyAlertSuccess(editUnit.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (editUnit?.data?.errors) {
      toastifyAlertError(editUnit.data.errors.name[0], "top-center");
    }
  }, [editUnit]);

  let handleSubmit = () => {
    dispatch(loadingState(true));

    modalShow === "create"
      ? dispatch(saveUnit({ name: inputValue }))
      : dispatch(editUnitData({ name: inputValue, id: id }));
  };

  return (
    <div>
      <ModalDesign
        name={"Unit"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        editName={editName}
        modalShow={modalShow}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default InputUnit;
