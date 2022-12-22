import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import AdmissionServices from "../../../api/adminssion/AdmissionServices";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import SubLoader from "../../../components/SubLoader";
import { allQuotaList } from "../../../redux/actions/job/quotaAction";
import { loadingState } from "../../../redux/actions/modalAction";
import {
  adminssionList,
  singleAdminssionList,
} from "../../../redux/actions/university/admissionAction";
import { groupAll } from "../../../redux/actions/university/groupAction";
import { unitAll } from "../../../redux/actions/university/unitAction";
import { universityAll } from "../../../redux/actions/university/universityAction";

function AdmissionEdit() {
  const { singleAdmissionRed } = useSelector((state) => state.admission);
  const { quotaData } = useSelector((state) => state.quota);

  let { loadingNow } = useSelector((state) => state.modalValue);
  const { id } = useParams();
  // console.log("id :>> ", id);

  let stateName = singleAdmissionRed.name;
  // console.log('stateName', stateName)
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      pageNo: 1,

      name: "",
      group: "",
      unit: "",
      university: "",
      application_start: "",
      application_end: "",
      exam_time: "",
      application_fee: "",
      min_gpa: "",
      min_gpa_total: "",
      seat: "",
      quota: "",
    }
  );

  // console.log('state.name', state.name)
  const { modalCurrent } = useSelector((state) => state.modalValue);
  const { groupAllRed } = useSelector((state) => state.group);
  const { universityAllRed } = useSelector((state) => state.university);

  // console.log("singleAdmissionRed", singleAdmissionRed.unit);

  const { unitAllRed } = useSelector((state) => state.unit);
  const inputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    let value = target.value;
    const name = target.name;
    if (name === "excel_upload") {
      const fileUploaded = event.target.files[0];
      setState({ [name]: fileUploaded });
    } else {
      setState({
        [name]: value,
      });
    }
  };

  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(unitAll());
    dispatch(groupAll());
    dispatch(universityAll());
    dispatch(singleAdminssionList(id));
    dispatch(allQuotaList());
  }, [id]);

  useEffect(() => {
    setState({
      name: singleAdmissionRed.name,
      group: singleAdmissionRed?.required_group?.id,
      unit: singleAdmissionRed.unit?.id,
      university: singleAdmissionRed.university?.id,
      application_start: singleAdmissionRed.application_start,
      application_end: singleAdmissionRed.application_end,
      exam_time: singleAdmissionRed.exam_time,
      application_fee: singleAdmissionRed.application_fee,
      min_gpa: singleAdmissionRed.min_gpa,
      min_gpa_total: singleAdmissionRed.min_gpa_total,
      seat: singleAdmissionRed.seat,
      service_fee: singleAdmissionRed.service_fee,
    });
  }, [stateName]);
  // console.log('modalShow', modalShow)

  let groupValues = "";
  if (groupAllRed?.data) {
    groupValues = groupAllRed.data.map((group) => (
      <option value={group.id} selected={state.group === group.id}>
        {group.name}
      </option>
    ));
  }

  let unitValues = "";
  if (unitAllRed?.data) {
    unitValues = unitAllRed.data.map((group) => (
      <option value={group.id}>{group.name}</option>
    ));
  }

  let universityValues = "";
  console.log("universityAllRed?.data :>> ", universityAllRed);
  if (universityAllRed?.data) {
    universityValues = universityAllRed.data.map((group) => (
      <option value={group.id} selected={state.university === group.id}>
        {group.name}
      </option>
    ));
  }

  let quotaValues = [];
  let quotaVal = {};

  if (quotaData?.data) {
    quotaData.data.map((group) => {
      quotaVal = { label: group.name, value: group.id };
      quotaValues.push(quotaVal);
      return quotaValues;
    });
  }

  const handleQuotaChange = (options) => {
    // console.log(options);
    const districtArray = [];
    options.map((option) => districtArray.push(option.value));
    setState({
      quota: districtArray,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("inputValue :>> ", inputValue);
    dispatch(loadingState(true));
    let values = {
      name: state.name,
      group_id: state.group,
      unit_id: state.unit,
      university_id: state.university,
      application_start: state.application_start,
      application_end: state.application_end,
      exam_time: state.exam_time,
      application_fee: state.application_fee,
      min_gpa: state.min_gpa,
      min_gpa_total: state.min_gpa_total,
      seat: state.seat,
      service_fee: state.service_fee,
      quota: state.quota || "",
    };

    let res = await AdmissionServices.update(values, id);
    // console.log("res :>> ", res);
    if (res.status === 200) {
      dispatch(loadingState(false));
      toastifyAlertSuccess("Admission updated", "top-center");
      dispatch(adminssionList(state.pageNo));
      navigate("/admission/index");
    } else {
      dispatch(loadingState(false));

      toastifyAlertError("Admission not updated", "top-center");
    }
  };

  let nonAppliedSubmit = async (e) => {
    e.preventDefault();
    let inputData = {
      admission_id: id,
      type: state.type,
      excel_upload: state.excel_upload,
    };
    let formdata = new FormData();
    Object.keys(inputData).map((key) => {
      formdata.append(key, inputData[key]);
    });

    let res = await AdmissionServices.csvUpload(formdata);
    // console.log("res", res);
    if (res.status === 201) {
      toastifyAlertSuccess(res.data?.message, "top-center");
    } else if (res.status === 422) {
      let errors = Object.values(res?.data?.errors);
      // console.log("errors :>> ", errors);
      errors.forEach((element) => {
        // console.log("element :>> ", element);
        toastifyAlertError(element[0], "top-center");
      });
    }
  };

  //   let crossIcon = () => dispatch(modalState(false));

  let module = <SubLoader />;

  if (singleAdmissionRed?.name) {
    module = (
      <div className="profile-details">
        <h4 className="job-h4">Update {singleAdmissionRed.name}</h4>

        <div className="row my-4 gy-3">
          <div className="col-md-6">
            <label>Admission name"</label>
            <input
              className="modal__input"
              onChange={inputChange}
              type="text"
              value={state.name}
              name="name"
              placeholder={"Admission name"}
            />
          </div>
          <div className="col-md-6">
            <label>Group "</label>
            <select
              className="form-selectn modal__input"
              aria-label="Default select example"
              onChange={inputChange}
              name="group"
            >
              <option disabled selected>
                Group
              </option>
              {groupValues}
            </select>
          </div>

          <div className="col-md-6">
            <label>Unit</label>
            <select
              className="form-select modal__input"
              aria-label="Default select example"
              onChange={inputChange}
              name="unit"
              value={state.unit}
            >
              <option disabled selected>
                Unit
              </option>
              {unitValues}
            </select>
          </div>
          <div className="col-md-6">
            <label>Service fee"</label>
            <input
              className="modal__input"
              onChange={inputChange}
              type="text"
              value={state.service_fee}
              name="service_fee"
              placeholder={"Service Fee"}
            />
          </div>
          <div className="col-md-12">
            <label>University</label>
            <select
              className="form-select modal__input"
              aria-label="Default select example"
              onChange={inputChange}
              name="university"
            >
              <option selected disabled>
                University
              </option>
              {universityValues}
            </select>
          </div>

          <div className="col-md-6">
            <label className="my-2">Application start</label>
            <input
              type="date"
              className="modal__input"
              name="application_start"
              value={state.application_start}
              onChange={inputChange}
            />
          </div>

          <div className="col-md-6">
            <label className="my-2">Application end</label>
            <input
              value={state.application_end}
              type="date"
              className="modal__input"
              name="application_end"
              onChange={inputChange}
            />
          </div>
          <div className="col-md-12">
            <label className="my-2">Exam Time</label>
            <input
              name="exam_time"
              type="date"
              className="modal__input"
              value={state.exam_time}
              onChange={inputChange}
            />
          </div>
          <div className="col-md-6">
            <label className="my-2">Application fee</label>
            <input
              value={state.application_fee}
              type="number"
              name="application_fee"
              className="modal__input"
              onChange={inputChange}
            />
          </div>
          <div className="col-md-6">
            <label className="my-2">Min gpa</label>
            <input
              type="number"
              className="modal__input"
              onChange={inputChange}
              name="min_gpa"
              value={state.min_gpa}
            />
          </div>
          <div className="col-md-6">
            <label className="my-2">Min gpa Total</label>
            <input
              type="number"
              name="min_gpa_total"
              className="modal__input"
              onChange={inputChange}
              value={state.min_gpa_total}
            />
          </div>

          <div className="col-md-6">
            <label className="my-2">Seat</label>
            <input
              type="number"
              name="seat"
              value={state.seat}
              className="modal__input"
              onChange={inputChange}
            />
          </div>
          {/* <div className="col-md-12">
            <label className="my-2">Quota</label>

            <Select
              options={quotaValues}
              placeholder={"Select Quota"}
              className="modal__input"
              isMulti={true}
              name={"quota"}
              value={
                state.quota?.length > 0
                  ? state.quota.map((q) => ({
                      label: q.name,
                      value: q.id,
                    }))
                  : ""
              }
              onChange={handleQuotaChange}
            />
          </div> */}

          <div>
            <h5>Admission Applicants status update</h5>
            <div className="col-md-12">
              <label className="my-2">Csv upload</label>
              <input
                type={"file"}
                className="modal__input"
                onChange={inputChange}
                name="excel_upload"
              />
            </div>

            <div className="col-md-12 my-2">
              <label>Type</label>
              <select
                className="form-selectn modal__input"
                aria-label="Default select example"
                onChange={inputChange}
                name="type"
              >
                <option disabled selected>
                  Type
                </option>
                <option value="1">PRELI EXAM LOCATION</option>
                <option value="2">PRELI RESULT</option>
                <option value="3">WRITTEN EXAM LOCATION</option>
                <option value="4">WRITTEN RESULT</option>
                <option value="5">VIVA LOCATION</option>
                <option value="6">VIVA RESULT</option>
              </select>
            </div>

            <div className="text-end">
              <button
                type="button"
                onClick={nonAppliedSubmit}
                className="btn btn-primary btn__modal"
              >
                Status update
              </button>
            </div>
          </div>

          {/* <div className="col-md-12">
            <input
              type="checkbox"
              className="btn-check"
              id="btn-check-outlined"
              autocomplete="off"
              onChange={inputChange}
              name="quota"
            />
            <label className="btn btn-outline-primary" for="btn-check-outlined">
              Quota
            </label>
            <br />
          </div> */}

          <button
            className="btn btn-primary btn__modal w-50 m-auto"
            onClick={handleSubmit}
          >
            {loadingNow ? "Updating........" : "Update job circular"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Dashboard>
      <div className="university userShow">{module}</div>
      <ToastContainer transition={Zoom} />
    </Dashboard>
  );
}

export default AdmissionEdit;
