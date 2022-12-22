import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../components/alert/tostifyALert";
import ModalDesign from "../../components/modal/ModalDesign";
import { singleDistrictList } from "../../redux/actions/basicInfo/districtAction";
import { saveUpazila } from "../../redux/actions/basicInfo/upazilaAction";
import { inputV } from "../../redux/actions/inputAction";
import { loadingState, modalState } from "../../redux/actions/modalAction";

function UpazilaCreate({ modalShow, id }) {
  let dispatch = useDispatch();
  let { inputValue } = useSelector((state) => state.inputVal);
  let { storeUpazila, editUpazilaData } = useSelector((state) => state.upazila);

  // console.log("object :>> ", storeUpazila);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  // console.log("storeUpazila :>> ", storeUpazila);
  useMemo(() => {
    dispatch(loadingState(false));
    if (storeUpazila?.message === "Upazila create Successfully") {
      dispatch(singleDistrictList(id));
      toastifyAlertSuccess(storeUpazila.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (storeUpazila?.errors) {
      toastifyAlertError(storeUpazila.errors.name[0], "top-center");
    }
  }, [storeUpazila]);

  let handleSubmit = () => {
    dispatch(loadingState(true));

    dispatch(saveUpazila({ name: inputValue, district_id: id }));
  };
  return (
    <div>
      <ModalDesign
        name={"Upazila"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        modalShow={modalShow}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default UpazilaCreate;
