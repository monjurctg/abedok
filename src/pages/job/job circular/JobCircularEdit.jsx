import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, Zoom } from "react-toastify";
import JobCircularServices from "../../../api/job/JobCircularServices";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import SubLoader from "../../../components/SubLoader";
import { AD } from "../../../constants/ad";
import { districtListAll } from "../../../redux/actions/basicInfo/districtAction";
import { departmentList } from "../../../redux/actions/job/departmentAction";
import { gradesList } from "../../../redux/actions/job/gradeAction";
import {
  jobCircularList,
  saveJobCircular,
  singlejobCircularList,
} from "../../../redux/actions/job/jobCircularAction";
import { postsAllList } from "../../../redux/actions/job/postAction";
import { allQuotaList } from "../../../redux/actions/job/quotaAction";
import { loadingState } from "../../../redux/actions/modalAction";
import { examList } from "../../../redux/actions/university/examAction";
import { groupAll } from "../../../redux/actions/university/groupAction";
import { majorList } from "../../../redux/actions/university/majorAction";
import { subjectList } from "../../../redux/actions/university/subjectAction";

export const JobCircularEdit = function () {
  const { id } = useParams();

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
      quota: [],
      experience_deatils: "",
      district_id: [],
      link: "",
      status: "",
      excel_upload: "",
      service_fee: "",
    }
  );
  let navigate = useNavigate();
  // console.log("first", [...new Set(state.district_id)]);
  // uniq = ;
  const { groupAllRed } = useSelector((state) => state.group);
  const { departmentData } = useSelector((state) => state.departments);
  const { gradeList } = useSelector((state) => state.grade);
  const { majorData } = useSelector((state) => state.major);
  let { loadingNow } = useSelector((state) => state.modalValue);

  const { subjectData } = useSelector((state) => state.subject);
  const { quotaData } = useSelector((state) => state.quota);
  // console.log('quotaData', quotaData)
  // let { storeJobRed } = useSelector((state) => state.jobCircular);
  const { singleJobRed } = useSelector((state) => state.jobCircular);

  // console.log("singleJobRed :>> ", singleJobRed);
  // console.log("singleJobRed?.quota[0].id  :>> ", singleJobRed?.quota[0].id);

  const { examData } = useSelector((state) => state.exam);
  const { districtData } = useSelector((state) => state.district);
  const { postList } = useSelector((state) => state.post);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(departmentList());
    dispatch(groupAll());
    dispatch(gradesList());
    dispatch(postsAllList());
    dispatch(singlejobCircularList(id));

    dispatch(majorList());
    dispatch(subjectList());
    dispatch(allQuotaList());
    dispatch(examList());
    dispatch(districtListAll());
    // dispatch(singlejobCircularList(id));
  }, [dispatch, id]);

  let examValues = "";
  if (examData?.data) {
    examValues = examData.data.map((group) => (
      <option value={group.id} selected={state.examination_id === group.id}>
        {group.name}
      </option>
    ));
  }

  useEffect(() => {
    if (singleJobRed?.name) {
      setState({
        name: singleJobRed.name,
        quota: singleJobRed.quota,
        district_id: singleJobRed.district,
        sit: singleJobRed.sit,
        start_time: singleJobRed.start_time,
        end_time: singleJobRed.end_time,
        fee: singleJobRed.fee,
        service_fee: singleJobRed.service_fee,
        max_age: singleJobRed?.max_age,
        min_age: singleJobRed?.min_age,
        link: singleJobRed?.link,
        description: singleJobRed?.description,
        experience: singleJobRed?.experience,
        experience_details: singleJobRed?.experience_details,
        skill: singleJobRed.skill,
        examination_id: singleJobRed?.examination?.id,
        post_id: singleJobRed?.post.id,
        group_id: singleJobRed?.group?.id,
        department_id: singleJobRed?.department?.id,
        grade_id: singleJobRed?.grade?.id,
        // quota: singleJobRed?.quota.map((q) => state.quota.push(name)),
        // district_id:
        distric_check: singleJobRed?.Checks?.distric_check === 0 ? true : false,
        experience_check:
          singleJobRed?.Checks?.experience_check === 0 ? true : false,
        max_age_check: singleJobRed?.Checks?.max_age_check === 0 ? true : false,
        min_age_check: singleJobRed?.Checks?.min_age_check === 0 ? true : false,
        skill_check: singleJobRed?.Checks?.skill_check === 0 ? true : false,
      });
    }
  }, [singleJobRed]);

  let districtValues = [];
  let val = {};
  if (districtData?.data) {
    districtData.data.map((district) => {
      val = { label: district.name, value: district.id };
      districtValues.push(val);
      return districtValues;
    });
  }

  let nonAppliedSubmit = async (e) => {
    e.preventDefault();
    let inputData = {
      job_id: id,
      type: state.type,
      excel_upload: state.excel_upload,
    };
    let formdata = new FormData();
    Object.keys(inputData).map((key) => formdata.append(key, inputData[key]));

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

  // let selectedQuota = [];
  // // if (singleJobRed?.quota?.length > 0) {
  // //   selectedQuota.push({
  // //     label: singleJobRed?.quota[0].name,
  // //     value: singleJobRed?.quota[0].id,
  // //   });
  // // }

  // console.log("state.quota :>> ", state.quota);
  const handleQuotaChange = (options) => {
    const districtArray = [];
    // console.log("options", options);
    options.map((option) =>
      // selectedQuota.push(option);
      districtArray.push({ id: option.value, name: option.label })
    );
    setState({
      quota: districtArray,
    });
  };

  const handleDistrictChange = (options) => {
    // console.log(options);
    const districtArray = [];
    options.map((option) =>
      districtArray.push({ id: option.value, name: option.label })
    );
    setState({
      district_id: districtArray,
    });
  };

  // console.log("selectedQuota :>> ", selectedQuota);

  // console.log("quotaValues :>> ", state.quota);

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
  // console.log("state.quota", state.quota);

  let handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loadingState(true));

    let values = {
      name: state.name,
      department_id: state.department_id,
      examination_id: state.examination_id == 4 ? " " : state.examination_id,
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
      quota_id: state.quota.map((q) => q.id),
      experience_details: state.experience_deatils,
      district_id: state.district_id.map((q) => q.id),
      link: state.link,
      service_fee: state.service_fee,
      status: state.status,
      post_id: state.post_id || 1,
      min_age_check: state.min_age_check ? 0 : 1,
      max_age_check: state.max_age_check ? 0 : 1,
      skill_check: state.skill_check ? 0 : 1,
      experience_check: state.experience_check ? 0 : 1,
      distric_check: state.district_check ? 0 : 1,
      id: id,

      // description:state.description
    };
    // console.log("values :>> ", values);

    let res = await JobCircularServices.update(values);

    if (res.status === 201) {
      dispatch(loadingState(false));
      toastifyAlertSuccess(res.data.message, "top-center");
      setTimeout(() => {
        dispatch(jobCircularList());

        navigate("/job/circular");
        dispatch(saveJobCircular(""));
      }, 2000);
    } else if (res.status === 422) {
      dispatch(loadingState(false));
      let errors = Object.values(res.data.errors);
      errors.forEach((element) => {
        toastifyAlertError(element[0], "top-center");
      });
    }
    // console.log("res :>> ", res);

    // dispatch(saveJobCircular(values));
  };

  //   console.log("tate.min_age_check :>> ", state.min_age_check);

  let module = <SubLoader />;
  if (singleJobRed?.name) {
    module = (
      <div className="profile-details">
        <h4 className="job-h4">Update {singleJobRed.name}</h4>

        <div className="inputs row">
          <div className="col-md-6">
            <label className="my-2">Job name</label>

            <input
              className="modal__input"
              onChange={inputChange}
              type="text"
              value={state.name}
              name="name"
              placeholder={"Job name"}
            />
          </div>

          <div className="col-md-6">
            <label className="my-2">Seat</label>
            <input
              type="number"
              name="sit"
              placeholder="Seat"
              value={state.sit}
              className="modal__input"
              onChange={inputChange}
            />
          </div>
          <div className="col-md-6">
            <label className="my-2">Application start</label>
            <input
              type="date"
              className="modal__input"
              name="start_time"
              placeholder="Application start"
              value={state.start_time}
              onChange={inputChange}
            />
          </div>
          <div className="col-md-6">
            <label className="my-2">Application End</label>
            <input
              type="date"
              className="modal__input"
              name="end_time"
              placeholder="Application end"
              value={state.end_time}
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
              placeholder="Application fee"
              onChange={inputChange}
            />
          </div>

          <div className="col-md-6">
            <label className="my-2">Min age</label>
            <input
              type="number"
              className="modal__input"
              onChange={inputChange}
              placeholder="Min age"
              name="min_age"
              value={state.min_age}
            />
          </div>
          <div className="col-md-6">
            <label className="my-2">Max age</label>
            <input
              type="number"
              name="max_age"
              placeholder="Max age"
              className="modal__input"
              onChange={inputChange}
              value={state.max_age}
            />
          </div>

          <div className="col-md-6">
            <label className="my-2">Service Fee</label>
            <input
              type="number"
              name="service_fee"
              value={state.service_fee}
              className="modal__input"
              placeholder="Service fee"
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
              placeholder="Link"
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
              placeholder="Description"
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
              placeholder="Experience"
              onChange={inputChange}
            />
          </div>
          <div className="col-md-6">
            <label className="my-2">Skills</label>
            <input
              type="text"
              name="skill"
              placeholder="Skills"
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
              placeholder="Experience Details"
              onChange={inputChange}
            ></textarea>
          </div>

          <div className="row my-4 gy-3">
            <div className="col-md-6">
              <label className="my-2">Examination</label>

              <select
                className="form-selectn modal__input text-center"
                aria-label="Default select example"
                onChange={inputChange}
                name="examination_id"
                value={state.examination_id}
              >
                <option disabled selected>
                  Examination
                </option>
                {/* <option value={AD.GRADUATEEXAMID}>Graduate</option> */}
                {examValues}
              </select>
            </div>
            <div className="col-md-6">
              <label className="my-2">Post</label>

              <select
                className="form-select modal__input text-center"
                aria-label="Default select example"
                onChange={inputChange}
                name="post_id"
                value={state.post_id}
              >
                <option selected disabled>
                  Post
                </option>
                {postValues}
              </select>
            </div>
            {state.examination_id == AD.GRADUATEEXAMID ? (
              <>
                <div className="col-md-6">
                  <label className="my-2">Subject</label>

                  <select
                    className="form-selectn modal__input"
                    aria-label="Default select example"
                    onChange={inputChange}
                    name="subject_id"
                    value={state.subject_id}
                  >
                    <option disabled selected>
                      Subject
                    </option>
                    {subjectValues}
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="my-2">Major</label>

                  <select
                    className="form-selectn modal__input"
                    aria-label="Default select example"
                    onChange={inputChange}
                    name="major_id"
                    value={state.major_id}
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

            {state.examination_id != 1 ? (
              <div className="col-md-6">
                <label className="my-2">Group</label>

                <select
                  className="form-selectn modal__input"
                  aria-label="Default select example"
                  onChange={inputChange}
                  name="group_id"
                  value={state.group_id}
                >
                  <option disabled selected>
                    Group
                  </option>
                  {groupValues}
                </select>
              </div>
            ) : (
              ""
            )}

            <div className="col-md-6">
              <label className="my-2">Department</label>

              <select
                className="form-select modal__input"
                aria-label="Default select example"
                onChange={inputChange}
                name="department_id"
                value={state.department_id}
              >
                <option disabled selected>
                  Department
                </option>
                {departmentValues}
              </select>
            </div>
            <div className="col-md-12">
              <label className="my-2 text-center">Grade</label>

              <select
                className="form-select modal__input text-center"
                aria-label="Default select example"
                onChange={inputChange}
                name="grade_id"
                value={state.grade_id}
              >
                <option selected disabled>
                  Grade
                </option>
                {gradeValues}
              </select>
            </div>

            <div className="col-md-6">
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
            </div>
            <div className="col-md-6">
              <label className="my-2">District</label>

              <Select
                options={districtValues}
                placeholder={"Select District"}
                className="modal__input"
                isMulti={true}
                isClearable={true}
                // selected={}
                value={
                  state.district_id?.length > 0
                    ? state.district_id.map((q) => ({
                        label: q.name,
                        value: q.id,
                      }))
                    : ""
                }
                name={"district_id"}
                onChange={handleDistrictChange}
              />
            </div>

            {state.quota?.length > 0 ? (
              <div className="col-md-12 d-flex">
                <div
                  className={
                    state.min_age_check
                      ? "smallBtn active mx-2"
                      : "smallBtn mx-2"
                  }
                  onClick={() =>
                    setState({ min_age_check: !state.min_age_check })
                  }
                >
                  <button>{"Min age"}</button>
                </div>

                <div
                  className={
                    state.district_check
                      ? "smallBtn active mx-2"
                      : "smallBtn mx-2"
                  }
                  onClick={() =>
                    setState({ district_check: !state.district_check })
                  }
                >
                  <button>{"District"}</button>
                </div>

                <div
                  className={
                    state.max_age_check
                      ? "smallBtn active mx-2"
                      : "smallBtn mx-2"
                  }
                  onClick={() =>
                    setState({ max_age_check: !state.max_age_check })
                  }
                >
                  <button>{"Max age"}</button>
                </div>
                <div
                  className={
                    state.skill_check ? "smallBtn active mx-2" : "smallBtn mx-2"
                  }
                  onClick={() => setState({ skill_check: !state.skill_check })}
                >
                  <button>{"Skill"}</button>
                </div>
                <div
                  className={
                    state.experience_check
                      ? "smallBtn active mx-2"
                      : "smallBtn mx-2"
                  }
                  onClick={() =>
                    setState({ experience_check: !state.experience_check })
                  }
                >
                  <button>{"Experience"}</button>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="my-5">
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
          </div>

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
};

export const MemoJobCircularEdit = React.memo(JobCircularEdit);
