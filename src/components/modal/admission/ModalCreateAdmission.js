import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingState, modalState } from "../../../redux/actions/modalAction";
import {
  editAdmissionData,
  saveAdmission,
  singleAdminssionList
} from "../../../redux/actions/university/admissionAction";
import { groupAll } from "../../../redux/actions/university/groupAction";
import { unitAll } from "../../../redux/actions/university/unitAction";
import { universityAll } from "../../../redux/actions/university/universityAction";

function ModalCreateAdmission({ name, modalShow, editName, id }) {
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
      errors: {
        name: "",
        university: "",
        unit: "",
        application_start: "",
        application_end: "",
        application_fee: "",
      },
    }
  );

  const { modalCurrent } = useSelector((state) => state.modalValue);
  const { groupAllRed } = useSelector((state) => state.group);
  const { universityAllRed } = useSelector((state) => state.university);
  const { singleAdmissionRed } = useSelector((state) => state.admission);
  let { loadingNow } = useSelector((state) => state.modalValue);


  const { unitAllRed } = useSelector((state) => state.unit);
  const inputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    setState({
      [name]: value,
    });
  };

  let dispatch = useDispatch();

  useEffect(() => {
   
  }, []);
  useEffect(() => {
    dispatch(unitAll());
    dispatch(groupAll());
    dispatch(universityAll());

    if (modalShow === "edit") {
      dispatch(singleAdminssionList(id));

      setState({
        name: singleAdmissionRed.name,
        seat: singleAdmissionRed.seat,
        application_start: singleAdmissionRed.application_start,
        application_end: singleAdmissionRed.application_end,
        min_gpa_total: singleAdmissionRed.min_gpa,
        exam_time: singleAdmissionRed.exam_time,
      });
    }
    setState({
      name: "",
      seat: "",
      application_start: "",
      application_end: "",
      min_gpa_total: "",
      exam_time: "",
    });
  }, [modalShow]);
  // console.log('modalShow', modalShow)
  let headingValue = "";
  if (modalShow === "create") {
    headingValue = `Add ${name}`;
  } else if (modalShow === "edit") {
    headingValue = `Edit ${editName}`;
  }

  let groupValues = "";
  if (groupAllRed?.data) {
    groupValues = groupAllRed.data.map((group) => (
      <option value={group.id}>{group.name}</option>
    ));
  }

  let unitValues = "";
  if (unitAllRed?.data) {
    unitValues = unitAllRed.data.map((group) => (
      <option value={group.id}>{group.name}</option>
    ));
  }

  let universityValues = "";
  if (universityAllRed?.data) {
    universityValues = universityAllRed.data.map((group) => (
      <option value={group.id}>{group.name}</option>
    ));
  }

  let handleSubmit = () => {
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
      quota: state.quota,
    };

    // console.log("values", values);
    modalShow === "create"
      ? dispatch(saveAdmission(values))
      : dispatch(editAdmissionData({ name: values, id: id }));
  };
  let crossIcon = () => dispatch(modalState(false));

  return (
    <div className={`modal_self ${modalCurrent ? "show" : ""}`} id="main_div">
      <div className="modal_items" style={{ maxWidth: "50%" }}>
        <div className="modal_content">
          <div className="modal_header">
            <h5>{headingValue}</h5>
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
              <input
                className="modal__input"
                onChange={inputChange}
                type="text"
                value={state.name}
                name="name"
                placeholder={"Admission name"}
              />
              <span>{state.errors.name}</span>
            </div>

            <div className="row my-4 gy-3">
              <div className="col-md-6">
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
              <div className="col-md-12">
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
                  min={state.application_start}
                  onChange={inputChange}
                />
              </div>
              <div className="col-md-12">
                <label className="my-2">Exam Time</label>
                <input
                  name="exam_time"
                  type="date"
                  min={state.application_end}
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
                  className="modal__input"
                  min={1}
                  max={10}
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
            

              {/* <div className="col-md-5">
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
            </div>

            {/* )} */}
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
              {loadingNow ? "Saving...":headingValue}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCreateAdmission;
