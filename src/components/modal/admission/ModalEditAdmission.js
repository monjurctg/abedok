import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdmissionServices from "../../../api/adminssion/AdmissionServices";
import { modalState } from "../../../redux/actions/modalAction";
import {
  editAdmissionData,
  singleAdminssionList
} from "../../../redux/actions/university/admissionAction";
import { groupAll } from "../../../redux/actions/university/groupAction";
import { unitAll } from "../../../redux/actions/university/unitAction";
import { universityAll } from "../../../redux/actions/university/universityAction";
import { toastifyAlertError, toastifyAlertSuccess } from "../../alert/tostifyALert";

function ModalEditAdmission({ name, modalShow, editName, id }) {
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

      name:"",
      group:"",
      unit: "",
      university:"",
      application_start:"",
      application_end:"",
      exam_time:"",
      application_fee:"",
      min_gpa:"",
      min_gpa_total: "",
      seat:"",
      quota: "",
    }
  );

// console.log('state.name', state.name)
  const { modalCurrent } = useSelector((state) => state.modalValue);
  const { groupAllRed } = useSelector((state) => state.group);
  const { universityAllRed } = useSelector((state) => state.university);

  // console.log("singleAdmissionRed", singleAdmissionRed.unit);
  console.log('modalShow', modalShow)

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
  
  useEffect(() => {

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

    // console.log("values", values);

    dispatch(editAdmissionData({ name: values, id: id }));
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
                {modalShow === "edit" ? (
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
              ) : (
                ""
              )}

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

export default ModalEditAdmission;
