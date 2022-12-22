import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import UserServices from "../../../api/user/UserServices";
import {
  toastifyAlertError,
  toastifyAlertSuccess
} from "../../../components/alert/tostifyALert";
import { districtListAll } from "../../../redux/actions/basicInfo/districtAction";
import { postOfficeALl } from "../../../redux/actions/basicInfo/postOfficeAction";
import { upazilaAllList } from "../../../redux/actions/basicInfo/upazilaAction";
import { loadingState } from "../../../redux/actions/modalAction";
import { singleUser } from "../../../redux/actions/userAction";

function Address() {
  const { id } = useParams();
  const { districtData } = useSelector((state) => state.district);
  const { postOfficeData } = useSelector((state) => state.postOffice);
  const { upazilaData } = useSelector((state) => state.upazila);
  const { singleUserRed } = useSelector((state) => state.user);
  let { loadingNow } = useSelector((state) => state.modalValue);

  // console.log("singleUserRed", singleUserRed?.data);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      care_of_present: "",
      care_of_permanent: "",
      details_present: "",
      details_permanent: "",
      activePermanent: false,

      district_id_present: "",
      district_id_permanent: "",

      upazila_id_present: "",
      upazila_id_permanent: "",

      post_office_id_present: "",

      post_office_id_permanent: "",
      postal_code_permanent: "",
      postal_code_present: "",
      same_as: 1,
      upazilaValue: [],
    }
  );
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(upazilaAllList());
    dispatch(postOfficeALl());
    dispatch(districtListAll());
    dispatch(singleUser(id));
  }, []);

  // console.log("singleUserRed?.data?", singleUserRed.data);

  let districtValues = "";
  if (districtData?.data) {
    districtValues = districtData.data.map((group, index) => {
      // ))})
      return (
        <option
          key={index}
          value={group.id}
          selected={group.id === state.district_id_present}
        >
          {group.name}
        </option>
      );
    });
  }

  let upazilaValuesPresent = "";
  if (upazilaData?.data && state.district_id_present) {
    upazilaValuesPresent = upazilaData?.data
      .filter((upazila) => upazila.district_id == state.district_id_present)
      .map((upazila, index) => (
        <option key={index} value={upazila.id}>
          {upazila.name}
        </option>
      ));
  } else {
    upazilaValuesPresent = (
      <option selected disabled>
        Choose District first
      </option>
    );
  }
  // console.log('upazilaValuesPresent', state.upazila_id_present)

  let postOfficeValuesPresent = "";
  if (postOfficeData?.data && state.upazila_id_present) {
    // console.log('postOfficeData', postOfficeData)
    postOfficeValuesPresent = postOfficeData?.data
      .filter((upazila) => upazila.Upazila_id == state.upazila_id_present)
      .map((upazila, index) => (
        <option key={index} value={upazila.id}>
          {upazila.name}
        </option>
      ));
    // console.log('upazilaValuesPresent', upazilaValuesPresent)
  } else {
    postOfficeValuesPresent = (
      <option selected disabled>
        Select Upazila first
      </option>
    );
  }

  let districtValuesPermanent = "";
  if (districtData?.data) {
    // console.log('districtData', districtData.data)
    districtValuesPermanent = districtData.data.map((group, index) => {
      return (
        <option
          value={group.id}
          key={index}
          selected={
            state.activePermanent && group.id == state.district_id_present
          }
        >
          {group.name}
        </option>
      );
    });
  }

  let upazilaValuesPermanent = "";
  if (upazilaData?.data && state.district_id_permanent) {
    upazilaValuesPermanent = upazilaData?.data
      .filter((upazila) => upazila.district_id == state.district_id_permanent)
      .map((upazila, index) => (
        <option
          key={index}
          value={upazila.id}
          selected={
            state.activePermanent && upazila.id == state.upazila_id_present
          }
        >
          {upazila.name}
        </option>
      ));
  } else {
    upazilaValuesPermanent = (
      <option selected disabled>
        Select District first
      </option>
    );
  }
  // console.log('upazilaValuesPresent', state.upazila_id_present)

  let postOfficetValuesPermanent = "";
  if (postOfficeData?.data && state.upazila_id_permanent) {
    // console.log('postOfficeData', postOfficeData)
    postOfficetValuesPermanent = postOfficeData?.data
      .filter((upazila) => upazila.Upazila_id == state.upazila_id_permanent)
      .map((upazila, index) => (
        <option
          key={index}
          value={upazila.id}
          selected={
            state.activePermanent && upazila.id == state.post_office_id_present
          }
        >
          {upazila.name}
        </option>
      ));
    // console.log('upazilaValuesPresent', upazilaValuesPresent)
  } else {
    postOfficetValuesPermanent = (
      <option selected disabled>
        Select Upazila first
      </option>
    );
  }

  const inputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    setState({
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loadingState(true));

    let values = {
      care_of_present: state.care_of_present,
      details_present: state.details_present,
      district_id_present: state.district_id_present,
      upazila_id_present: state.upazila_id_present,
      post_office_id_present: state.post_office_id_present,
      postal_code_present: state.postal_code_present,
      // }
      user_id: id,
      // let permanentValues = {
      care_of_permanent: state.care_of_permanent,
      details_permanent: state.details_permanent,
      district_id_permanent: state.district_id_permanent,
      upazila_id_permanent: state.upazila_id_permanent,
      post_office_id_permanent: state.post_office_id_permanent,
      postal_code_permanent: state.postal_code_permanent,
      same_as: state.same_as,
    };

    let res = await UserServices.addressStore(values);
    if (res.data?.errors) {
      dispatch(loadingState(false));

      toastifyAlertError(res?.data.message, "top-center");
    } else {
      dispatch(loadingState(false));
      dispatch(singleUser(id))
      setTimeout(() => {
        navigate(`/user/create/student/${id}/education`);
      }, 2000);

      toastifyAlertSuccess(res?.data.message, "top-center");
    }
    // console.log("res", res.data);
  };

  const sameValueSet = () => {
    setState({
      care_of_permanent: state.care_of_present,
      details_permanent: state.details_present,
      district_id_permanent: state.district_id_present,
      upazila_id_permanent: state.upazila_id_present,
      post_office_id_permanent: state.post_office_id_present,
      postal_code_permanent: state.postal_code_present,
      same_as: 3,
      activePermanent: !state.activePermanent,
    });
  };

  let module = "";
  if (!singleUserRed?.data?.Address?.length >0) {
    module = (
      <div className="row profile-details">
        <h5 style={{ borderBottom: "1px solid #e91e63" }}>Present Address:</h5>
        {/* <div className=""> */}
        <div className="col-md-6">
          <label>Care of present</label>
          <input
            className="modal__input"
            type="text"
            name="care_of_present"
            onChange={inputChange}
            value={state.care_of_present}
            placeholder="Care of present*"
          />
        </div>
        <div className="col-md-6">
          <label>Present details</label>

          <input
            className="modal__input"
            name="details_present"
            type="text"
            onChange={inputChange}
            value={state.details_present}
            placeholder="Details present*"
          />
        </div>

        <div className="col-md-6">
          <label>Present district</label>

          <select
            className="modal__input"
            onChange={inputChange}
            name="district_id_present"
          >
            <option disabled selected>
              District
            </option>

            {districtValues}
          </select>
        </div>
        <div className="col-md-6">
          <label>Upazila</label>

          <select
            className="modal__input"
            onChange={inputChange}
            name="upazila_id_present"
          >
            <option>Upazilla</option>
            {upazilaValuesPresent}
          </select>
        </div>
        <div className="col-md-6">
          <label>Present Post Office</label>

          <select
            className="modal__input"
            onChange={inputChange}
            name="post_office_id_present"
            // value={state.post_office_id_present}
          >
            <option>Post Office</option>
            {postOfficeValuesPresent}
          </select>
        </div>

        <div className="col-md-6">
          <label>Postal code</label>

          <input
            className="modal__input"
            name="postal_code_present"
            type="text"
            onChange={inputChange}
            value={state.postal_code_present}
            placeholder="Postal Code*"
          />
        </div>

        <h5 className="mt-5" style={{ borderBottom: "1px solid #e91e63" }}>
          Permanent Address:
        </h5>
        <div className="d-flex justify-content-between my-4">
          <div className={"pink__btn"}>
            <button
              type="button"
              className={
                state.activePermanent
                  ? `pink__btn activePer btn btn-primary`
                  : "pink__btn btn btn-primarybtn btn-primary"
              }
              onClick={sameValueSet}
            >
              Same as Present
            </button>
          </div>
        </div>

        {/* <div className="inputs row gy-5"> */}
        <div className="col-md-6">
          <label>Care of permanent</label>

          <input
            className="modal__input"
            type="text"
            name="care_of_permanent"
            onChange={inputChange}
            value={state.care_of_permanent}
            placeholder="Care of parmanent*"
          />
        </div>
        <div className="col-md-6">
          <label>Details</label>

          <input
            className="modal__input"
            name="details_permanent"
            onChange={inputChange}
            type="text"
            value={state.details_permanent}
            placeholder="Details parmanent*"
          />
        </div>

        <div className="col-md-6">
          <label>District</label>

          <select
            className="modal__input"
            onChange={inputChange}
            // value={state.district_id_permanent}
            name="district_id_permanent"
          >
            <option disabled selected>
              District
            </option>
            {districtValuesPermanent}
          </select>
        </div>

        <div className="col-md-6">
          <label>Upazila</label>

          <select
            className="modal__input"
            onChange={inputChange}
            name="upazila_id_permanent"
            // value={state.upazila_id_permanent}
          >
            <option>Upazilla</option>
            {upazilaValuesPermanent}
          </select>
        </div>

        <div className="col-md-6">
          <label>Post office</label>

          <select
            className="modal__input"
            onChange={inputChange}
            // value={state.post_office_id_permanent}
            name="post_office_id_permanent"
          >
            <option>Post Office</option>
            {postOfficetValuesPermanent}
          </select>
        </div>

        <div className="col-md-6">
          <label>Postal Code</label>

          <input
            className="modal__input"
            name="postal_code_permanent"
            type="text"
            onChange={inputChange}
            value={state.postal_code_permanent}
            placeholder="Postal Code*"
          />
        </div>

        <div className="text-center py-3">
          <input
            type="submit"
            value={loadingNow ? "Creating..." : "Save Address"}
            className="submit_btn"
            onClick={handleSubmit}
          />
        </div>
      </div>
    );
  }else{
    module =  <div style={{height:"100%"}} className="row profile-details">
      <h2>Already did it</h2>
    </div>
  }

  return (
    <div className=" userShow">
     {module}
      {/* </> */}
      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default Address;
