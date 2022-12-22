import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import AdmissionServices from "../../api/adminssion/AdmissionServices";
import JobCircularServices from "../../api/job/JobCircularServices";
import { toastifyAlertSuccess } from "../../components/alert/tostifyALert";
import Dashboard from "../../components/layout/Dashboard";
import { singlejobCircularList } from "../../redux/actions/job/jobCircularAction";
import { singleAdminssionList } from "../../redux/actions/university/admissionAction";

function PaymentSelect() {
  let { module, id, userId } = useParams();
  const { singleJobRed } = useSelector((state) => state.jobCircular);
  const { singleAdmissionRed } = useSelector((state) => state.admission);

  const navigate = useNavigate();

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      methods: "",
    }
  );
  //   console.log("singleJobRed :>> ", singleJobRed);
  let dispatch = useDispatch();
  useEffect(() => {
    if (module === "job") {
      dispatch(singlejobCircularList(id));
    } else if (module === "admission") {
      dispatch(singleAdminssionList(id));
    }
  }, []);

  const handleChange = (e) => {
    let target = e.target;
    let name = target.name;
    let value = target.value;
    setState({ [name]: value });
  };
  const handleSubmit = async () => {
    if (module === "job") {
      let value = {
        jobId: id,
        user_id: userId,
        methods: state.methods,
      };
      // console.log("value :>> ", value);
      let res = await JobCircularServices.withoutPermissionApply(value, id);
      if (res.status === 201) {
        toastifyAlertSuccess(res.data.message, "top-center");
        setTimeout(() => {
          navigate("/job/circular/applied");
        }, 2000);
      }

      // console.log("res :>> ", res);
    }
    if (module === "admission") {
      let value = {
        admission_id: id,
        user_id: userId,
        methods: state.methods,
      };
      // console.log("value :>> ", value);
      let res = await AdmissionServices.withoutPermissionApply(value, id);
      if (res.status === 201) {
        toastifyAlertSuccess(res.data.message, "top-center");
        setTimeout(() => {
          navigate("/admission/applied");
        }, 2000);
      }

      // console.log("res :>> ", res);
    }
  };

  let moduleVal = <h4>Loading...............</h4>;
  if (module === "job" && singleJobRed) {
    moduleVal = (
      <div className="payment pay">
        <div className="payment_content">
          <p>Application fee : {singleJobRed.fee}</p>

          <button className="payment_btn" onClick={handleSubmit}>
            ৳ {singleJobRed.fee}
          </button>
        </div>

        <div className="payment_methods">
          <div className="methods">
            <h3 className="mb-4">Choose Payment method:</h3>

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
            <div className="form-check mb-3">
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

            <div className="form-check ">
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
    );
  }
  if (module === "admission" && singleAdmissionRed) {
    moduleVal = (
      <div className="payment pay">
        <div className="payment_content">
          <p>Application fee : {singleAdmissionRed.application_fee}</p>

          <button className="payment_btn" onClick={handleSubmit}>
            ৳ {singleAdmissionRed.application_fee}
          </button>
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
    );
  }
  return (
    <div>
      <Dashboard>
        <div className="university">
          <div className="payment_class">{moduleVal}</div>
        </div>
        <ToastContainer transition={Zoom} />
      </Dashboard>
    </div>
  );
}

export default PaymentSelect;
