import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalState } from "../../../redux/actions/modalAction";
import {
  editAdmissionData,
  singleAdminssionList
} from "../../../redux/actions/university/admissionAction";
import { groupAll } from "../../../redux/actions/university/groupAction";
import { unitAll } from "../../../redux/actions/university/unitAction";
import { universityAll } from "../../../redux/actions/university/universityAction";

function ModalEditUserCircular({ name, modalShow, editName, id }) {
  const { singleAdmissionRed } = useSelector((state) => state.admission);

  let stateName = singleAdmissionRed.name
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
      department_id: "",
      examination_id: "",
      subject_id: "",
      grade_id: "",
      major_id: "",
      group_id: "",
      skill: "",
      experience: "",
      start_time: "",
      end_time: "",
      description: "",
      fee: "",
      min_age: "",
      max_age: "",
      sit: "",
      quota: "",
      experience_deatils: "",
      district_id: [],
      link: "",
      post_id: "",

      status: "",
    }
  );


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
    setState({
      [name]: value,
    });
  };
  
  let dispatch = useDispatch();
  
  useEffect(() => {
    console.log('idsadasdas', id)
    dispatch(unitAll());
    dispatch(groupAll());
    dispatch(universityAll());
    dispatch(singleAdminssionList(id));
  }, [id]);
  
  useEffect(() => {
  setState({
    name: singleAdmissionRed.name,
    group: singleAdmissionRed.group,
    unit: singleAdmissionRed.unit?.id,
    university: singleAdmissionRed.university?.id,
    application_start: singleAdmissionRed.application_start,
    application_end: singleAdmissionRed.application_end,
    exam_time: singleAdmissionRed.exam_time,
    application_fee: singleAdmissionRed.application_fee,
    min_gpa: singleAdmissionRed.min_gpa,
    min_gpa_total: singleAdmissionRed.min_gpa_total,
    seat: singleAdmissionRed.seat,
  })
  }, [stateName]);
  // console.log('modalShow', modalShow)
  let headingValue = `Edit ${editName}`;

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

  let handleSubmit = (e) => {
    e.preventDefault();
    // console.log("inputValue :>> ", inputValue);
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
    };

    console.log("values", values);

    dispatch(editAdmissionData({ name: values, id: id }));
  };
  let crossIcon = () => dispatch(modalState(false));

  return (
    <div className={`modal_self ${modalCurrent ? "show" : ""}`} id="main_div">
      <div className="modal_items" style={{ maxWidth: "50%" }}>
        {stateName ? (
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
              <input
                className="modal__input"
                onChange={inputChange}
                type="text"
                value={state.name}
                name="name"
                placeholder={"Admission name"}
              />

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

                <div className="col-md-5">
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btn-check-outlined"
                    autocomplete="off"
                    onChange={inputChange}
                    name="quota"
                  />
                  <label
                    className="btn btn-outline-primary"
                    for="btn-check-outlined"
                  >
                    Quota
                  </label>
                  <br />
                </div>
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
                {headingValue}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ModalEditUserCircular;
