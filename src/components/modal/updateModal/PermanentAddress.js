import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserServices from "../../../api/user/UserServices";
import { districtListAll } from "../../../redux/actions/basicInfo/districtAction";
import { postOfficeALl } from "../../../redux/actions/basicInfo/postOfficeAction";
import { upazilaAllList } from "../../../redux/actions/basicInfo/upazilaAction";
import { allQuotaList } from "../../../redux/actions/job/quotaAction";
import { loadingState, modalUpdate } from "../../../redux/actions/modalAction";
import { singleUser } from "../../../redux/actions/userAction";
import { toastifyAlertError, toastifyAlertSuccess } from "../../alert/tostifyALert";

function PermanentAddress({ type }) {
  const { modalUp } = useSelector((state) => state.modalValue);
  const { id } = useParams();
  
  const { singleUserRed } = useSelector((state) => state.user);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      care_of_permanent: "",
      details_permanent: "",
      district: "",
      postal_code_permanent: "",
      post_office_permanent: "",
      user_id: id,
  
      same_as:2,
      care_of_present: "",
      details_present: "",
      postal_code_present: "",
      post_office_present: "",
    }
  );
  // let { gradeStoreRed } = useSelector((state) => state.grade);
  let { loadingNow } = useSelector((state) => state.modalValue);
  const { districtData } = useSelector((state) => state.district);
  const { postOfficeData } = useSelector((state) => state.postOffice);
  const { upazilaData } = useSelector((state) => state.upazila);

  // console.log("singleUserRed", singleUserRed);
 

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(allQuotaList());
    dispatch(upazilaAllList());
    dispatch(postOfficeALl());
    dispatch(districtListAll());
    dispatch(singleUser(id));

  }, []);


  useEffect(() => {
    if (singleUserRed?.data.Address) {
      // console.log('first', singleUserRed?.data.Address)
      setState({
        care_of_permanent: singleUserRed.data?.Address[1]?.care_of,
       
        details_permanent: singleUserRed.data?.Address[1]?.details,
        
        district_id_permanent: singleUserRed.data?.Address[1]?.district?.id,
        postal_code_permanent: singleUserRed.data?.Address[1]?.postal_code,
        post_office_id_permanent: singleUserRed.data?.Address[1]?.post_office?.id,
        upazila_id_permanent: singleUserRed.data?.Address[1]?.upazila?.id,
        
        care_of_present: singleUserRed.data.Address[0]?.care_of,

        details_present: singleUserRed.data.Address[0]?.details,

        district_id_present: singleUserRed.data.Address[0]?.district?.id,
        postal_code_present: singleUserRed.data.Address[0]?.postal_code,
        post_office_id_present: singleUserRed.data.Address[0]?.post_office?.id,
        upazila_id_present: singleUserRed.data.Address[0]?.upazila?.id,
      });
    }
  }, [singleUserRed]);

  const sameValueSet = ()=>{
    setState({
      care_of_permanent: singleUserRed.data?.Address[0]?.care_of,
       
        details_permanent: singleUserRed.data?.Address[0]?.details,
        
        district_id_permanent: singleUserRed.data?.Address[0]?.district?.id,
        postal_code_permanent: singleUserRed.data?.Address[0]?.postal_code,
        post_office_id_permanent: singleUserRed.data?.Address[0]?.post_office?.id,
        upazila_id_permanent: singleUserRed.data?.Address[0]?.upazila?.id,
    })
  }
  const inputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    setState({
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    let res = await UserServices.addressStore(state);
    dispatch(loadingState(true))
    if (res.status === 201) {
      dispatch(loadingState(false))
      dispatch(singleUser(id));
      toastifyAlertSuccess("Permanent address Updated", "top-center");
    } else {
      dispatch(loadingState(false))

      toastifyAlertError("Permanent address not updated", "top-center");
    }

  };

  let districtValuesPermanent = "";
  if (districtData?.data) {
    // console.log('districtData', districtData.data)
    districtValuesPermanent = districtData.data.map((group, index) => {
      return (
        <option
          value={group.id}
          key={index}
          selected={
            state.activePermanent && group.id == state.district_id_permanent
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
            state.activePermanent && upazila.id == state.upazila_id_permanent
          }
        >
          {upazila.name}
        </option>
      ));
  }
  // console.log('upazilaValuesPresent', state.upazila_id_permanent)

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
            state.activePermanent && upazila.id == state.post_office_id_permanent
          }
        >
          {upazila.name}
        </option>
      ));
    // console.log('upazilaValuesPresent', upazilaValuesPresent)
  }

  let crossIcon = () => dispatch(modalUpdate(false));
  return (
    <div className="modal_items">
      <div
        className={`modal_content ${modalUp ? "animation" : "animationOut"} `}
      >
        <div className="modal_header">
          <h5>{type}</h5>
          <button
            type="button"
            id="crossIcon"
            onClick={crossIcon}
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <div>
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
          <input
            className="modal__input my-2"
            // value={inputValue}
            onChange={inputChange}
            name="care_of_permanent"
            value={state.care_of_permanent}
            type="text"
            placeholder="Care of"
          />

          <input
            className="modal__input my-2"
            // value={inputValue
            value={state.postal_code_permanent}
            onChange={inputChange}
            name="postal_code_permanent"
            type="number"
            placeholder="Postal code"
          />

          <input
            className="modal__input my-2"
            value={state.details_permanent}
            onChange={inputChange}
            name="details_permanent"
            type="text"
            placeholder="Details"
          />

          <div>
            <select
              className="modal__input my-2"
              onChange={inputChange}
              value={state.district_id_permanent}
              name="district_id_permanent"
            >
              <option disabled selected>
                District
              </option>
              {districtValuesPermanent}
            </select>
          </div>
          <div>
            <select
              className="modal__input my-2"
              onChange={inputChange}
              name="upazila_id_permanent"
            >
              <option disabled selected>
                Upazilla
              </option>
              {upazilaValuesPermanent}
            </select>
          </div>
          <div>
            <select
              className="modal__input"
              onChange={inputChange}
              name="post_office_id_permanent"
              value={state.post_office_id_permanent}
            >
              <option disabled selected>
                Post Office
              </option>
              {postOfficetValuesPermanent}
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary btn_close"
            data-bs-dismiss="modal"
            onClick={crossIcon}
          >
            Close
          </button>
          <button
            type="button"
              onClick={handleSubmit}
            className="btn btn-primary btn__modal"
          >
            {loadingNow ? "Loading........" : type}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PermanentAddress;
