import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../components/alert/tostifyALert";
import ModalDesign from "../../components/modal/ModalDesign";
import {
  districtList,
  editDistrict,
  saveDistrict,
} from "../../redux/actions/basicInfo/districtAction";
import { inputV } from "../../redux/actions/inputAction";
import { loadingState, modalState } from "../../redux/actions/modalAction";

function DistrictInput({ pageNo, modalShow, editName, id }) {
  let dispatch = useDispatch();
  let { inputValue } = useSelector((state) => state.inputVal);
  let { storeDistrict, editDistrictData } = useSelector(
    (state) => state.district
  );

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  // console.log("storePassingYearReducer :>> ", storeDistrict);
  useMemo(() => {
    dispatch(loadingState(false));
    if (storeDistrict?.message === "District create Successfully") {
      dispatch(districtList(pageNo));
      toastifyAlertSuccess(storeDistrict.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (storeDistrict?.errors) {
      toastifyAlertError(storeDistrict.errors.name[0], "top-center");
    }
  }, [storeDistrict]);

  useMemo(() => {
    if (editDistrictData?.message === "District update Successfully") {
      dispatch(districtList(pageNo));
      toastifyAlertSuccess(editDistrictData.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (editDistrictData?.errors) {
      toastifyAlertError(editDistrictData.errors.name[0], "top-center");
    }
  }, [editDistrictData]);

  let handleSubmit = () => {
    dispatch(loadingState(true));
    modalShow === "create"
      ? dispatch(saveDistrict({ name: inputValue }))
      : dispatch(editDistrict({ name: inputValue, id: id }));
  };
  return (
    <div>
      <ModalDesign
        name={"District"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        editName={editName}
        modalShow={modalShow}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default DistrictInput;
