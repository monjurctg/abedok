import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdmissionServices from "../../api/adminssion/AdmissionServices";
import JobCircularServices from "../../api/job/JobCircularServices";
import image from "../../assets/img/payment.svg";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../components/alert/tostifyALert";
import Dashboard from "../../components/layout/Dashboard";
import PermissionCheck from "../../components/PermissionCheck";
import { jobs } from "../../constants/rolePermission";
import { singlejobCircularList } from "../../redux/actions/job/jobCircularAction";
import { loadingState } from "../../redux/actions/modalAction";
import { singleAdminssionList } from "../../redux/actions/university/admissionAction";

function ApplyIndex() {
  let { module, id, userId } = useParams();
  const { singleJobRed } = useSelector((state) => state.jobCircular);
  const { singleAdmissionRed } = useSelector((state) => state.admission);
  let { loadingNow } = useSelector((state) => state.modalValue);
  let navigate = useNavigate();

  // console.log("id :>> ", id);
  let dispatch = useDispatch();
  useEffect(() => {
    if (module === "job") {
      dispatch(singlejobCircularList(id));
    } else if (module === "admission") {
      dispatch(singleAdminssionList(id));
    }
  }, []);

  let applyUser = async () => {
    let value = {
      jobId: id,
      user_id: userId,
    };

    dispatch(loadingState(true));

    let res = await JobCircularServices.withoutPermissionApply(value, id);
    if (res.status === 201) {
      dispatch(loadingState(false));

      toastifyAlertSuccess(res.data.message, "top-center");
      setTimeout(() => {
        navigate("/job/circular/applied");
      }, 2000);
    } else {
      dispatch(loadingState(false));

      toastifyAlertError("Job not applied", "top-center");
    }
  };

  let applyAdmission = async () => {
    let value = {
      admission_id: id,
      user_id: userId,
      methods: 1,
    };
    dispatch(loadingState(true));

    let res = await AdmissionServices.withoutPermissionApply(value, id);
    if (res.status === 201) {
      dispatch(loadingState(false));

      navigate("/admission/applied");

      toastifyAlertSuccess(res.data.message, "top-center");
    } else {
      dispatch(loadingState(false));

      toastifyAlertError("Admission not applied", "top-center");
    }
  };

  let moduleVal = <h4>Loading...............</h4>;

  if (module === "job" && singleJobRed) {
    moduleVal = (
      <div className="payment_class">
        <h2>Payments:</h2>
        <div className="payment">
          <div className="payment_img">
            <img src={image} alt="" />
          </div>
          <div className="payment_content">
            <p>Application fee : {singleJobRed.fee}</p>
            <p>Service fee :{singleJobRed.service_fee}</p>

            <PermissionCheck permission={jobs.jobApply}>
              <Link
                to={`/payment/apply/job/${id}/${userId}/select`}
                className="payment_btn"
              >
                <button>৳ {singleJobRed.fee}</button>
              </Link>
            </PermissionCheck>

            <button onClick={applyUser}>
              {loadingNow ? "Applying" : "Apply"}
            </button>
          </div>
        </div>
      </div>
    );
  } else if (module === "admission" && singleAdmissionRed) {
    moduleVal = (
      <div className="payment_class">
        <h2>Payment:</h2>
        <div className="payment">
          <div className="payment_img">
            <img src={image} alt="" />
          </div>
          <div className="payment_content">
            <p>Application fee : {singleAdmissionRed.application_fee}</p>
            <p>Service fee : {singleAdmissionRed.service_fee}</p>

            <PermissionCheck permission={jobs.jobApply}>
              <Link
                to={`/payment/apply/${module}/${id}/${userId}/select`}
                className="payment_btn"
              >
                <button>৳{singleAdmissionRed.application_fee}</button>
              </Link>
            </PermissionCheck>

            <button onClick={applyAdmission}>
              {loadingNow ? "Applying" : "Apply"}
            </button>
          </div>
        </div>
      </div>
    );
  }
  //   console.log("module :>> ", module);
  return (
    <div>
      <Dashboard>
        <div className="university">{moduleVal}</div>
      </Dashboard>
    </div>
  );
}

export default ApplyIndex;
