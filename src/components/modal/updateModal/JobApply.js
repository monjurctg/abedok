import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import JobApplyServices from "../../../api/job/JobApplied";
import { appliedJobsListMerchents } from "../../../redux/actions/job/jobs";
import { modalUpdate } from "../../../redux/actions/modalAction";
import { toastifyAlertError, toastifyAlertSuccess } from "../../alert/tostifyALert";

function JobApply({ type,appliedJobId,fee,user_id,payment_id }) {
  console.log('first', payment_id)
  const { modalUp } = useSelector((state) => state.modalValue);
  let { id } = useParams();

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      care_of_present: "",
      details_present: "",
      district: "",
      postal_code_present: "",
      post_office_present: "",
      user_id: id,
      same_as: 1,
    }
  );

  // console.log('user_id', user_id)

  // const { singleUserRed } = useSelector((state) => state.user);
  // let { gradeStoreRed } = useSelector((state) => state.grade);
  let { loadingNow } = useSelector((state) => state.modalValue);
 

  let dispatch = useDispatch();
  useEffect(() => {
   
  }, []);

 

  const handleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    setState({ [name]: value });
  };

  const handleSubmit = async () => {
    // console.log('value', value)
    if(payment_id){
      let value = {
     
        applied_job_id: appliedJobId,
        methods: state.methods,
        payment_id:payment_id
      };

      let res = await JobApplyServices.newtransferPayment(value);
      // dispatch(loadingState(true))
      // console.log("res", res);
      if (res.status === 201) {
        dispatch(appliedJobsListMerchents());
  
        toastifyAlertSuccess("Congratulations, Your Payment Successfully Done", "top-center");
        dispatch(modalUpdate(false))
      } else {
        toastifyAlertError(" Your Payment has not updated", "top-center");
      }
    }else{
      
      let value = {
   
        job_id: appliedJobId,
        methods: state.methods,
        // user_id:user_id
      };
      // console.log('value', value)
      let res = await JobApplyServices.transferPayment(value,appliedJobId);
      // dispatch(loadingState(true))
      // console.log("res", res);
      if (res.status === 201) {
        dispatch(appliedJobsListMerchents());
  
        toastifyAlertSuccess("Congratulations, Your Payment Successfully Done", "top-center");
        dispatch(modalUpdate(false))
      } else {
        toastifyAlertError(" Your Payment has not updated", "top-center");
      }
    }

  };

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
        <div className="payment pay">
        <div className="payment_content">
          <p>Application fee : {fee}</p>
        </div>

        <div className="payment_methods">
          <div className="methods">
            <h3 className="mb-4">Choose Payment method</h3>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="methods"
                id="flexRadioDefault1"
                value={0}
                onChange={handleChange}
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Bkash
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="methods"
                value={2}
                onChange={handleChange}
                id="flexRadioDefault1"
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Nagad
              </label>
            </div>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="methods"
                value={3}
                onChange={handleChange}
                id="flexRadioDefault1"
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Rocket
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="methods"
                onChange={handleChange}
                id="flexRadioDefault1"
                value={1}
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Cards/Mobile Banking/Net banking
              </label>
            </div>

            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="radio"
                name="methods"
                value={1}
                onChange={handleChange}
                id="flexRadioDefault1"
              />
              <label className="form-check-label" for="flexRadioDefault1">
                Wallet
              </label>
            </div>

            <div className="form-check mt-5">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label className="form-check-label" for="flexCheckDefault">
                Get invoice in my Mail
              </label>
            </div>
          </div>
        </div>
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

export default JobApply;
