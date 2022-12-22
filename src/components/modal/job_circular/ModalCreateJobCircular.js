import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { ToastContainer, Zoom } from "react-toastify";
import JobCircularServices from "../../../api/job/JobCircularServices";
import { AD } from "../../../constants/ad";
import { districtList } from "../../../redux/actions/basicInfo/districtAction";
import { departmentList } from "../../../redux/actions/job/departmentAction";
import { gradesList } from "../../../redux/actions/job/gradeAction";
import {
  editJobCircularData,
  saveJobCircular,
  singlejobCircularList
} from "../../../redux/actions/job/jobCircularAction";
import { postsAllList } from "../../../redux/actions/job/postAction";
import { allQuotaList } from "../../../redux/actions/job/quotaAction";
import { modalState } from "../../../redux/actions/modalAction";
import { examList } from "../../../redux/actions/university/examAction";
import { groupAll } from "../../../redux/actions/university/groupAction";
import { majorList } from "../../../redux/actions/university/majorAction";
import { subjectList } from "../../../redux/actions/university/subjectAction";
import {
  toastifyAlertError,
  toastifyAlertSuccess
} from "../../alert/tostifyALert";

function ModalCreateJobCircular({ name, modalShow, editName, id }) {
  // console.log("id", id);
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
      status: "",
      excel_upload: "",
      service_fee: "",
    }
  );

  let dispatch = useDispatch();
  const { modalCurrent } = useSelector((state) => state.modalValue);
  const { groupAllRed } = useSelector((state) => state.group);
  const { departmentData } = useSelector((state) => state.departments);
  const { gradeList } = useSelector((state) => state.grade);
  const { majorData } = useSelector((state) => state.major);

  const { subjectData } = useSelector((state) => state.subject);
  const { quotaData } = useSelector((state) => state.quota);
  // console.log('quotaData', quotaData)
  const { singleJobRed } = useSelector((state) => state.jobCircular);
  const { examData } = useSelector((state) => state.exam);
  const { districtData } = useSelector((state) => state.district);
  const { postList } = useSelector((state) => state.post);

  let stateName = singleJobRed.name;
  const inputChange = async (event) => {
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

  // console.log("singleJobRed", singleJobRed);
  // console.log("stateName", stateName);

  const handleDistrictChange = (options) => {
    // console.log(options);
    const districtArray = [];
    options.map((option) => districtArray.push(option.value));
    setState({
      district_id: districtArray,
    });
  };
  const handleQuotaChange = (options) => {
    // console.log(options);
    const districtArray = [];
    options.map((option) => districtArray.push(option.value));
    setState({
      quota: districtArray,
    });
  };
  
  useEffect(() => {
    dispatch(departmentList());
    dispatch(groupAll());
    dispatch(gradesList());
    dispatch(postsAllList());

    dispatch(majorList());
    dispatch(subjectList());
    dispatch(allQuotaList());
    dispatch(examList());
    dispatch(districtList());
    dispatch(singlejobCircularList(id));

    setState({
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
      status: "",
      post_id: "",
    });
  }, [id, modalShow]);
  useEffect(() => {
    if (stateName) {
      setState({
        name: singleJobRed.name,
        department_id: singleJobRed?.department?.id,
        post_id: singleJobRed?.post?.id,
        examination_id: singleJobRed?.examination?.id,
        subject_id: singleJobRed?.subject?.id,
        grade_id: singleJobRed?.grade?.id,
        major_id: singleJobRed?.major?.id,
        group_id: singleJobRed?.group_id,
        skill: singleJobRed?.skill,
        experience: singleJobRed?.experience,
        start_time: singleJobRed?.start_time,
        end_time: singleJobRed?.end_time,
        description: singleJobRed?.description,
        fee: singleJobRed?.fee,
        min_age: singleJobRed?.min_age,
        max_age: singleJobRed?.max_age,
        sit: singleJobRed?.sit,
        service_fee: singleJobRed?.service_fee,
        quota: singleJobRed?.quota,
        experience_deatils: singleJobRed?.experience_deatils,
        district_id:
          singleJobRed?.district.map((district) =>
            state.district_id.push(district.id)
          ) || "",
        link: singleJobRed?.link,
        status: singleJobRed?.status,
      });
    }
  }, [stateName]);
  // console.log("modalShow", modalShow);
  let headingValue = "";
  if (modalShow === "create") {
    headingValue = `Add ${name}`;
  } else if (modalShow === "edit") {
    headingValue = `Edit ${editName}`;
  }

  let examValues = "";
  if (examData?.data) {
    examValues = examData.data.map((group) => (
      <option value={group.id}>{group.name}</option>
    ));
  }

  let districtValues = [];
  let val = {};
  if (districtData?.data) {
    districtData.data.map((district) => {
      val = { label: district.name, value: district.id };
      districtValues.push(val);
      return districtValues;
    });
  }

  let groupValues = "";
  if (groupAllRed?.data) {
    groupValues = groupAllRed.data.map((group) => (
      <option value={group.id}>{group.name}</option>
    ));
  }

  let departmentValues = "";
  if (departmentData?.data) {
    // console.log("departmentData.data", departmentData.data);
    departmentValues = departmentData.data.map((group) => (
      <option value={group.id}>{group.name}</option>
    ));
  }

  let gradeValues = "";
  if (gradeList?.data) {
    gradeValues = gradeList.data.map((group) => (
      <option value={group.id}>{group.name}</option>
    ));
  }

  let postValues = "";
  if (postList?.data) {
    postValues = postList.data.map((group) => (
      <option value={group.id}>{group.name}</option>
    ));
  }

  let majorValues = "";
  if (majorData?.data) {
    majorValues = majorData.data.map((group) => (
      <option value={group.id}>{group.name}</option>
    ));
  }

  let subjectValues = "";
  if (subjectData?.data) {
    subjectValues = subjectData.data.map((group) => (
      <option value={group.id}>{group.name}</option>
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
  // console.log("state.examination_id", state.examination_id);
  let handleSubmit = () => {
    let values = {
      name: state.name,
      department_id: state.department_id,
      examination_id: state.examination_id == 4 ? " " :state.examination_id,
      subject_id: state.subject_id,
      grade_id: state.grade_id,
      major_id: state.major_id,
      group_id: state.group_id,
      skill: state.skill,
      experience: state.experience,
      start_time: state.start_time,
      end_time: state.end_time,
      description: state.description,
      fee: state.fee,
      min_age: state.min_age,
      max_age: state.max_age,
      sit: state.sit,
      quota: state.quota,
      experience_details: state.experience_deatils,
      district_id: state.district_id,
      link: state.link,
      service_fee: state.service_fee,
      status: state.status,
      post_id: state.post_id || 1,
      // description:state.description
    };
    modalShow === "create"
      ? dispatch(saveJobCircular(values))
      : dispatch(editJobCircularData({ name: values, id: id }));
  };
  let crossIcon = () => dispatch(modalState(false));

  let nonAppliedSubmit = async (e) => {
    e.preventDefault();
    let inputData = {
      job_id: id,
      type: state.type,
      excel_upload: state.excel_upload,
    };
    let formdata = new FormData();
    Object.keys(inputData).map((key) => {
      formdata.append(key, inputData[key]);
    });

    let res = await JobCircularServices.csvUpload(formdata);
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
  // console.log('editName', editName)
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
            <input
              className="modal__input"
              onChange={inputChange}
              type="text"
              value={state.name}
              name="name"
              placeholder={"Job name"}
            />

            <div className="row my-4 gy-3">
              <div className="col-md-12">
                <select
                  className="form-selectn modal__input text-center"
                  aria-label="Default select example"
                  onChange={inputChange}
                  name="examination_id"
                >
                  <option disabled selected>
                    Examination
                  </option>
                  <option value={AD.GRADUATEEXAMID}>Graduate</option>
                  {examValues}
                </select>
              </div>
              {state.examination_id == AD.GRADUATEEXAMID ? (
                <>
                  <div className="col-md-6">
                    <select
                      className="form-selectn modal__input"
                      aria-label="Default select example"
                      onChange={inputChange}
                      name="subject_id"
                    >
                      <option disabled selected>
                        Subject
                      </option>
                      {subjectValues}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-selectn modal__input"
                      aria-label="Default select example"
                      onChange={inputChange}
                      name="major_id"
                    >
                      <option disabled selected>
                        Major
                      </option>
                      {majorValues}
                    </select>
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="col-md-6">
              <Select
                  options={quotaValues}
                  placeholder={"Select Quota"}
                  className="modal__input"
                  isMulti={true}
                  name={"quota"}
                  onChange={handleQuotaChange}
                />

              </div>
              <div className="col-md-6">
                <Select
                  options={districtValues}
                  placeholder={"Select District"}
                  className="modal__input"
                  isMulti={true}
                  name={"district_id"}
                  onChange={handleDistrictChange}
                />
              </div>

              <div className="col-md-6">
                <select
                  className="form-selectn modal__input"
                  aria-label="Default select example"
                  onChange={inputChange}
                  name="group_id"
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
                  name="department_id"
                  // value={state.department_id}
                >
                  <option disabled selected>
                    Department
                  </option>
                  {departmentValues}
                </select>
              </div>
              <div className="col-md-6">
                <select
                  className="form-select modal__input"
                  aria-label="Default select example"
                  onChange={inputChange}
                  name="grade_id"
                >
                  <option selected disabled>
                    Grade
                  </option>
                  {gradeValues}
                </select>
              </div>
              <div className="col-md-12">
                <select
                  className="form-select modal__input text-center"
                  aria-label="Default select example"
                  onChange={inputChange}
                  name="post_id"
                >
                  <option selected disabled>
                    Post
                  </option>
                  {postValues}
                </select>
              </div>
              <div className="col-md-6">
                <label className="my-2">Application start</label>
                <input
                  type="date"
                  className="modal__input"
                  name="start_time"
                  value={state.start_time}
                  onChange={inputChange}
                />
              </div>

              <div className="col-md-6">
                <label className="my-2">Application end</label>
                <input
                  value={state.end_time}
                  type="date"
                  className="modal__input"
                  name="end_time"
                  onChange={inputChange}
                />
              </div>

              <div className="col-md-6">
                <label className="my-2">Application fee</label>
                <input
                  value={state.fee}
                  type="number"
                  name="fee"
                  className="modal__input"
                  onChange={inputChange}
                />
              </div>

              <div className="col-md-6">
                <label className="my-2">Min age</label>
                <input
                  type="number"
                  className="modal__input"
                  onChange={inputChange}
                  name="min_age"
                  value={state.min_age}
                />
              </div>
              <div className="col-md-6">
                <label className="my-2">Max age</label>
                <input
                  type="number"
                  name="max_age"
                  className="modal__input"
                  onChange={inputChange}
                  value={state.max_age}
                />
              </div>

              <div className="col-md-6">
                <label className="my-2">Seat</label>
                <input
                  type="number"
                  name="sit"
                  value={state.sit}
                  className="modal__input"
                  onChange={inputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="my-2">Service Fee</label>
                <input
                  type="number"
                  name="service_fee"
                  value={state.service_fee}
                  className="modal__input"
                  onChange={inputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="my-2">Link</label>
                <input
                  type="text"
                  name="link"
                  value={state.link}
                  className="modal__input"
                  onChange={inputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="my-2">Description</label>
                <input
                  type="text"
                  name="description"
                  value={state.description}
                  className="modal__input"
                  onChange={inputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="my-2">Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={state.experience}
                  className="modal__input"
                  onChange={inputChange}
                />
              </div>
              <div className="col-md-10">
                <label className="my-2">Skills</label>
                <input
                  type="text"
                  name="skill"
                  value={state.skill}
                  className="modal__input"
                  onChange={inputChange}
                />
              </div>
         

              <div className="col-md-12">
                <label className="my-2">Experience Details</label>
                <textarea
                  name="experience_deatils"
                  value={state.experience_deatils}
                  className="modal__input"
                  onChange={inputChange}
                ></textarea>
              </div>
              {modalShow === "edit" ? (
                <div>
                  <h5>Job Applicants status update</h5>
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
              {headingValue}
            </button>
          </div>
        </div>

        <ToastContainer transition={Zoom} />
      </div>
    </div>
  );
}

export default ModalCreateJobCircular;
