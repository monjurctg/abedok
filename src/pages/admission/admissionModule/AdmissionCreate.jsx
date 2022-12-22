import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import AdmissionServices from "../../../api/adminssion/AdmissionServices";

import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import { allQuotaList } from "../../../redux/actions/job/quotaAction";
import { loadingState } from "../../../redux/actions/modalAction";
import { adminssionList } from "../../../redux/actions/university/admissionAction";
import { groupAll } from "../../../redux/actions/university/groupAction";
import { unitAll } from "../../../redux/actions/university/unitAction";
import { universityAll } from "../../../redux/actions/university/universityAction";

function AdmissionCreate() {
  let { loadingNow } = useSelector((state) => state.modalValue);
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

  const { groupAllRed } = useSelector((state) => state.group);
  const { universityAllRed } = useSelector((state) => state.university);
  const { unitAllRed } = useSelector((state) => state.unit);
  const { quotaData } = useSelector((state) => state.quota);

  const inputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    let value = target.value;
    const name = target.name;
    setState({
      [name]: value,
    });
  };

  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(unitAll());
    dispatch(groupAll());
    dispatch(universityAll());
    dispatch(allQuotaList());

    // dispatch(singleAdminssionList(id));
  }, []);

  // console.log('modalShow', modalShow)

  let groupValues = "";
  if (groupAllRed?.data) {
    groupValues = groupAllRed.data.map((group) => (
      <option value={group.id} selected={state.group === group.id}>
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
  let unitValues = "";
  if (unitAllRed?.data) {
    unitValues = unitAllRed.data.map((group) => (
      <option value={group.id}>{group.name}</option>
    ));
  }

  let universityValues = "";
  //   console.log("universityAllRed?.data :>> ", universityAllRed);
  if (universityAllRed?.data) {
    universityValues = universityAllRed.data.map((group) => (
      <option value={group.id} selected={state.university === group.id}>
        {group.name}
      </option>
    ));
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
      quota: state.quota || "",
      service_fee: state.service_fee,
    };

    let res = await AdmissionServices.store(values);
    // console.log("res :>> ", res);
    if (res.status === 200) {
      dispatch(loadingState(false));
      toastifyAlertSuccess("Admission Created", "top-center");
      dispatch(adminssionList(state.pageNo));
      navigate("/admission/index");
    } else {
      dispatch(loadingState(false));
      let errors = Object.values(res?.data?.errors);
      // console.log("errors :>> ", errors);
      errors.forEach((element) => {
        // console.log("element :>> ", element);
        toastifyAlertError(element[0], "top-center");
      });

      // toastifyAlertError("Admission not created", "top-center");
    }
  };
  //   let crossIcon = () => dispatch(modalState(false));

  let module = (
    <div className="profile-details">
      <h4 className="job-h4">Create Admission</h4>

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
            <option disabled selected value={""}>
              Unit
            </option>
            {unitValues}
          </select>
        </div>
        <div className="col-md-6">
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
            min={state.application_start}
            className="modal__input"
            name="application_end"
            onChange={inputChange}
          />
        </div>
        <div className="col-md-6">
          <label className="my-2">Exam Time</label>
          <input
            name="exam_time"
            type="date"
            className="modal__input"
            value={state.exam_time}
            min={state.application_end}
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
            placeholder="Minimum gpa"
            className="modal__input"
            onChange={inputChange}
            name="min_gpa"
            min={1}
            max={5}
            value={state.min_gpa}
          />
        </div>
        <div className="col-md-6">
          <label className="my-2">Min gpa Total</label>
          <input
            type="number"
            name="min_gpa_total"
            min={1}
            max={10}
            placeholder={"Min gpa total"}
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
            placeholder="Seat"
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
            onChange={handleQuotaChange}
          />
        </div> */}

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
          className="btn btn-primary btn__modal w-50 m-auto my-4"
          onClick={handleSubmit}
        >
          {loadingNow ? "Creating........" : "Create"}
        </button>
      </div>
    </div>
  );

  return (
    <Dashboard>
      <div className="university userShow">{module}</div>
      <ToastContainer transition={Zoom} />
    </Dashboard>
  );
}

export default AdmissionCreate;
