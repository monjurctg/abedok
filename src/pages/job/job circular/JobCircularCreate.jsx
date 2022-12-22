import React from 'react';
import { useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { ToastContainer, Zoom } from 'react-toastify';
import JobCircularServices from '../../../api/job/JobCircularServices';
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from '../../../components/alert/tostifyALert';
import Dashboard from '../../../components/layout/Dashboard';
import { AD } from '../../../constants/ad';
import { districtListAll } from '../../../redux/actions/basicInfo/districtAction';
import { departmentList } from '../../../redux/actions/job/departmentAction';
import { gradesList } from '../../../redux/actions/job/gradeAction';
import {
  jobCircularList,
  saveJobCircular,
} from '../../../redux/actions/job/jobCircularAction';
import { postsAllList } from '../../../redux/actions/job/postAction';
import { allQuotaList } from '../../../redux/actions/job/quotaAction';
import { examList } from '../../../redux/actions/university/examAction';
import { groupAll } from '../../../redux/actions/university/groupAction';
import { majorList } from '../../../redux/actions/university/majorAction';
import { subjectList } from '../../../redux/actions/university/subjectAction';

function JobCircularCreate() {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: '',
      editName: '',
      pageNo: 1,

      name: '',
      department_id: '',
      examination_id: '',
      subject_id: '',
      grade_id: '',
      major_id: '',
      group_id: '',
      skill: '',
      experience: '',
      start_time: '',
      end_time: '',
      description: '',
      fee: '',
      min_age: '',
      max_age: '',
      sit: '',
      quota: '',
      experience_deatils: '',
      district_id: [],
      link: '',
      status: '',
      excel_upload: '',
      service_fee: '',
    }
  );
  let navigate = useNavigate();

  const { groupAllRed } = useSelector((state) => state.group);
  const { departmentData } = useSelector((state) => state.departments);
  const { gradeList } = useSelector((state) => state.grade);
  const { majorData } = useSelector((state) => state.major);

  const { subjectData } = useSelector((state) => state.subject);
  const { quotaData } = useSelector((state) => state.quota);

  const { examData } = useSelector((state) => state.exam);
  const { districtData } = useSelector((state) => state.district);
  const { postList } = useSelector((state) => state.post);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(departmentList());
    dispatch(groupAll());
    dispatch(gradesList());
    dispatch(postsAllList());

    dispatch(majorList());
    dispatch(subjectList());
    dispatch(allQuotaList());
    dispatch(examList());
    dispatch(districtListAll());
    // dispatch(singlejobCircularList(id));
  }, []);

  // let examValues = "";
  // if (examData?.data) {
  //   examValues = examData.data.map((group) => (
  //     <option value={group.id}>{group.name}</option>
  //   ));
  // }

  // for exam value
  let examValues = [];
  let val_exam = {};
  if (examData?.data) {
    examValues.push({ label: 'Select All', value: 'select_all' });
    examData.data.map((exam) => {
      val_exam = { label: exam.name, value: exam.id };
      examValues.push(val_exam);
      return examValues;
    });
  }


  // for post list

  let postValues = [];
  let val_post = {};
  if (postList?.data) {
    postValues.push({ label: "Select All", value: "select_all" });    
    postList.data.map((post) => {
      val_post = { label: post.name, value: post.id };
      postValues.push(val_post);
      return postValues;
    });
  }

  //   console.log("quota :>> ", state.quota);
  let districtValues = [];
  let val = {};
  if (districtData?.data) {
    districtValues.push({ label: 'Select All', value: 'select_all' });
    districtData.data.map((district) => {
      val = { label: district.name, value: district.id };
      districtValues.push(val);
      return districtValues;
    });
  }

  let departmentValues = [];
  let val_department = {};
  if (departmentData?.data) {
    departmentValues.push({ label: 'Select All', value: 'select_all' });
    departmentData.data.map((department) => {
      val_department = { label: department.name, value: department.id };
      departmentValues.push(val_department);
      return departmentValues;
    });
  }

  let gradeValues = [];
  let val_grade = {};
  if (gradeList?.data) {
    gradeValues.push({ label: 'Select All', value: 'select_all' });
    gradeList.data.map((grade) => {
      val_grade = { label: grade.name, value: grade.id };
      gradeValues.push(val_grade);
      return gradeValues;
    });
  }

  let quotaValues = [];
  let quotaVal = {};
  if (quotaData?.data) {
    quotaValues.push({ label: 'Select All', value: 'select_all' });
    quotaData.data.map((group) => {
      quotaVal = { label: group.name, value: group.id };
      quotaValues.push(quotaVal);
      return quotaValues;
    });
  }

  let subjectValues = [];
  let val_subject = {};
  if (subjectData?.data) {
    subjectValues.push({ label: 'Select All', value: 'select_all' });
    subjectData.data.map((subject) => {
      val_subject = { label: subject.name, value: subject.id };
      subjectValues.push(val_subject);
      return subjectValues;
    });
  }

  let majorValues = [];
  let val_major = {};
  if (majorData?.data) {
    majorValues.push({ label: 'Select All', value: 'select_all' });
    majorData.data.map((major) => {
      val_major = { label: major.name, value: major.id };
      majorValues.push(val_major);
      return majorValues;
    });
  }

  let groupValues = [];
  let val_group = {};
  if (groupAllRed?.data) {
    groupValues.push({ label: 'Select All', value: 'select_all' });
    groupAllRed.data.map((group) => {
      val_group = { label: group.name, value: group.id };
      groupValues.push(val_group);
      return groupValues;
    });
  }

  // let groupValues = "";
  // if (groupAllRed?.data) {
  //   groupValues = groupAllRed.data.map((group) => (
  //     <option value={group.id}>{group.name}</option>
  //   ));
  // }

  // let majorValues = "";
  // if (majorData?.data) {
  //   majorValues = majorData.data.map((group) => (
  //     <option value={group.id}>{group.name}</option>
  //   ));
  // }

  // let subjectValues = "";
  // if (subjectData?.data) {
  //   subjectValues = subjectData.data.map((group) => (
  //     <option value={group.id}>{group.name}</option>
  //   ));
  // }

  // let postValues = "";
  // if (postList?.data) {
  //   postValues = postList.data.map((group) => (
  //     <option value={group.id}>{group.name}</option>
  //   ));
  // }

  // let departmentValues = "";
  // if (departmentData?.data) {
  //   // console.log("departmentData.data", departmentData.data);
  //   departmentValues = departmentData.data.map((group) => (
  //     <option value={group.id}>{group.name}</option>
  //   ));
  // }

  // let gradeValues = "";
  // if (gradeList?.data) {
  //   gradeValues = gradeList.data.map((group) => (
  //     <option value={group.id}>{group.name}</option>
  //   ));
  // }

  const inputChange = async (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    if (name === 'excel_upload') {
      const fileUploaded = event.target.files[0];
      setState({ [name]: fileUploaded });
    } else {
      setState({
        [name]: value,
      });
    }
  };

  const handleDepartmentChange = (options) => {
    const departmentArray = [];
    options.map((option) => {
      if (option.value == 'select_all') {
        departmentValues = departmentValues.splice(
          1,
          departmentValues.length - 1
        );
        departmentValues.map((option) => departmentArray.push(option));
      } else {
        departmentArray.push(option);
      }
    });

    setState({
      department_id: departmentArray,
    });
  };

  const handleGradeChange = (options) => {
    const gradeArray = [];
    options.map((option) => {
      if (option.value == 'select_all') {
        gradeValues = gradeValues.splice(1, gradeValues.length - 1);
        gradeValues.map((option) => gradeArray.push(option));
      } else {
        gradeArray.push(option);
      }
    });

    setState({
      grade_id: gradeArray,
    });
  };

  // handel change for exam

  const handleExamChange = (options) => {
    const examArray = [];
    options.map((option) => {
      if (option.value == 'select_all') {
        examValues = examValues.splice(1, examValues.length - 1);
        examValues.map((option) => examArray.push(option));
      } else {
        examArray.push(option);
      }
    });

    setState({
      examination_id: examArray,
    });
  };

  const handlePostChange = (options) => {
    const postArray = [];
    options.map((option) => {
      if (option.value == 'select_all') {
        postValues = postValues.splice(1, postValues.length - 1);
        postValues.map((option) => postArray.push(option));
      } else {
        postArray.push(option);
      }
    });

    setState({
      post_id: postArray,
    });
  };

  const handleDistrictChange = (options) => {
    const districtArray = [];
    options.map((option) => {
      if (option.value == 'select_all') {
        districtValues = districtValues.splice(1, districtValues.length - 1);
        districtValues.map((option) => districtArray.push(option));
      } else {
        districtArray.push(option);
      }
    });
    setState({
      district_id: districtArray,
    });
  };

  const handleSubjectChange = (options) => {
    const subjectArray = [];
    options.map((option) => {
      if (option.value == 'select_all') {
        subjectValues = subjectValues.splice(1, subjectValues.length - 1);
        subjectValues.map((option) => subjectArray.push(option));
      } else {
        subjectArray.push(option);
      }
    });
    setState({
      subject_id: subjectArray,
    });
  };

  const handleMajorChange = (options) => {
    const majorArray = [];
    options.map((option) => {
      if (option.value == 'select_all') {
        majorValues = majorValues.splice(1, majorValues.length - 1);
        majorValues.map((option) => majorArray.push(option));
      } else {
        majorArray.push(option);
      }
    });
    setState({
      major_id: majorArray,
    });
  };

  const handleQuotaChange = (options) => {
    const quotaArray = [];
    options.map((option) => {
      if (option.value == 'select_all') {
        quotaValues = quotaValues.splice(1, quotaValues.length - 1);
        quotaValues.map((option) => quotaArray.push(option));
      } else {
        quotaArray.push(option);
      }
    });
    setState({
      quota_id: quotaArray,
    });
  };

  const handleGroupChange = (options) => {
    const groupArray = [];
    options.map((option) => {
      if (option.value == 'select_all') {
        groupValues = groupValues.splice(1, groupValues.length - 1);
        groupValues.map((option) => groupArray.push(option));
      } else {
        groupArray.push(option);
      }
    });
    setState({
      group_id: groupArray,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    let values = {
      name: state.name,
      department_id: state.department_id,
      examination_id: state.examination_id == 4 ? ' ' : state.examination_id,
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
      quota_id: state.quota,
      experience_details: state.experience_deatils,
      district_id: state.district_id,
      link: state.link,
      service_fee: state.service_fee,
      status: state.status,
      post_id: state.post_id || 1,
    
      min_age_check: state.min_age_check ? 0 : 1,
      max_age_check: state.max_age_check ? 0 : 1,
      skill_check: state.skill_check ? 0 : 1,
      experience_check: state.experience_check ? 0 : 1,
      distric_check: state.district_check ? 0 : 1,
      sharing_url: 'test.com',

      // description:state.description
    };
    console.log(values);

    let res = await JobCircularServices.store(values);
    if (res.status === 201) {
      toastifyAlertSuccess(res.data.message, 'top-center');
      setTimeout(() => {
        dispatch(jobCircularList());

        navigate('/job/circular');
        dispatch(saveJobCircular(''));
      }, 2000);
    } else if (res.status === 422) {
      let errors = Object.values(res.data.errors);
      errors.forEach((element) => {
        toastifyAlertError(element[0], 'top-center');
      });
    }
    // console.log("res :>> ", res);

    // dispatch(saveJobCircular(values));
  };

  //   console.log("tate.min_age_check :>> ", state.min_age_check);
  return (
    <Dashboard>
      <div className="university userShow">
        <div className="profile-details">
          <h4 className="job-h4">Create Job circular</h4>
          <form onSubmit={handleSubmit}>
            <div className="inputs row">
              <div className="col-md-6">
                <label className="my-2">Job name</label>

                <input
                  className="modal__input"
                  onChange={inputChange}
                  type="text"
                  value={state.name}
                  required
                  name="name"
                  placeholder={'Job name'}
                />
              </div>

              <div className="col-md-6">
                <label className="my-2">Seat</label>
                <input
                  type="number"
                  name="sit"
                  placeholder="Seat"
                  required
                  value={state.sit}
                  className="modal__input"
                  onChange={inputChange}
                />
              </div>
              <div className="col-md-6">
                <label className="my-2">Application start</label>

                <input
                  type="date"
                  required
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
                  required
                  min={state.start_time}
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
                  required
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
                  min={state.min_age}
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
                  required
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
                  type="text"
                  name="experience"
                  value={state.experience}
                  className="modal__input"
                  required
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

                  {/* old exam selection   */}

                  {/* <select
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
                  </select> */}

                  {/* old exam selection   */}

                  {/* new exam change  */}
                  <Select
                    options={examValues}
                    placeholder={'Select Examination'}
                    className="modal__input"
                    isMulti={true}
                    name={'examination_id'}
                    onChange={handleExamChange}
                    value={state.examination_id}
                  />
                  {/* new exam change  */}
                </div>
                <div className="col-md-6">
                  <label className="my-2">Post</label>

                  {/* <select
                    className="form-select modal__input text-center"
                    aria-label="Default select example"
                    onChange={inputChange}
                    name="post_id"
                  >
                    <option selected disabled>
                      Post
                    </option>
                    <option value={""}>No Post</option>
                    {postValues}
                  </select> */}

                  <Select
                    options={postValues}
                    placeholder={'Select Post'}
                    className="modal__input"
                    isMulti={true}
                    name={'post_id'}
                    onChange={handlePostChange}
                    value={state.post_id}
                  />
                </div>
                {state.examination_id == AD.GRADUATEEXAMID ? (
                  <>
                    <div className="col-md-6">
                      <label className="my-2">Subject</label>

                      {/* <select
                        className="form-selectn modal__input"
                        aria-label="Default select example"
                        onChange={inputChange}
                        name="subject_id"
                      >
                        <option disabled selected>
                          Subject
                        </option>
                        {subjectValues}
                      </select> */}

                      <Select
                        options={subjectValues}
                        placeholder={'Select Subject'}
                        className="modal__input"
                        isMulti={true}
                        name={'subject_id'}
                        onChange={handleSubjectChange}
                        value={state.subject_id}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="my-2">Major</label>

                      {/* <select
                        className="form-selectn modal__input"
                        aria-label="Default select example"
                        onChange={inputChange}
                        name="major_id"
                      >
                        <option disabled selected>
                          Major
                        </option>
                        <option value={""}>No Major</option>
                        {majorValues}
                      </select> */}

                      <Select
                        options={majorValues}
                        placeholder={'Select Major'}
                        className="modal__input"
                        isMulti={true}
                        name={'major_id'}
                        onChange={handleMajorChange}
                        value={state.major_id}
                      />
                    </div>
                  </>
                ) : (
                  ''
                )}

                {state.examination_id != 1 ? (
                  <div className="col-md-6">
                    <label className="my-2">Group</label>

                    {/* <select
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
                    </select> */}

                    <Select
                      options={groupValues}
                      placeholder={'Select Group'}
                      className="modal__input"
                      isMulti={true}
                      name={'group_id'}
                      onChange={handleGroupChange}
                      value={state.group_id}
                    />
                  </div>
                ) : (
                  ''
                )}

                <div className="col-md-6">
                  <label className="my-2">Department</label>

                  {/* <select
                    className="form-select modal__input"
                    aria-label="Default select example"
                    onChange={inputChange}
                    name="department_id"
                    // value={state.department_id}
                  >
                    <option disabled selected>
                      Department
                    </option>
                    <option value={""}>No Department</option>
                    {departmentValues}
                  </select> */}

                  <Select
                    options={departmentValues}
                    placeholder={'Select Department'}
                    className="modal__input"
                    isMulti={true}
                    name={'department_id'}
                    onChange={handleDepartmentChange}
                    value={state.department_id}
                  />
                </div>
                <div className="col-md-12">
                  <label className="my-2 text-center">Grade</label>

                  {/* <select
                    className="form-select modal__input text-center"
                    aria-label="Default select example"
                    onChange={inputChange}
                    name="grade_id"
                  >
                    <option selected disabled>
                      Grade
                    </option>
                    <option value={""}>No Grade</option>
                    {gradeValues}
                  </select> */}

                  <Select
                    options={gradeValues}
                    placeholder={'Select Grade'}
                    className="modal__input"
                    isMulti={true}
                    name={'grade_id'}
                    onChange={handleGradeChange}
                    value={state.grade_id}
                  />
                </div>

                <div className="col-md-6">
                  <label className="my-2">Quota</label>

                  <Select
                    options={quotaValues}
                    placeholder={'Select Quota'}
                    className="modal__input"
                    isMulti={true}
                    name={'quota_id'}
                    onChange={handleQuotaChange}
                    value={state.quota_id}
                  />
                </div>
                <div className="col-md-6">
                  <label className="my-2">District</label>

                  <Select
                    options={districtValues}
                    placeholder={'Select District'}
                    className="modal__input"
                    isMulti={true}
                    name={'district_id'}
                    onChange={handleDistrictChange}
                    value={state.district_id}
                  />
                </div>

                {state.quota ? (
                  <div className="col-md-12 d-flex">
                    <div
                      className={
                        state.min_age_check
                          ? 'smallBtn active mx-2'
                          : 'smallBtn mx-2'
                      }
                      onClick={() =>
                        setState({ min_age_check: !state.min_age_check })
                      }
                    >
                      <button>{'Min age'}</button>
                    </div>

                    <div
                      className={
                        state.district_check
                          ? 'smallBtn active mx-2'
                          : 'smallBtn mx-2'
                      }
                      onClick={() =>
                        setState({ district_check: !state.district_check })
                      }
                    >
                      <button>{'District'}</button>
                    </div>

                    <div
                      className={
                        state.max_age_check
                          ? 'smallBtn active mx-2'
                          : 'smallBtn mx-2'
                      }
                      onClick={() =>
                        setState({ max_age_check: !state.max_age_check })
                      }
                    >
                      <button>{'Max age'}</button>
                    </div>
                    <div
                      className={
                        state.skill_check
                          ? 'smallBtn active mx-2'
                          : 'smallBtn mx-2'
                      }
                      onClick={() =>
                        setState({ skill_check: !state.skill_check })
                      }
                    >
                      <button>{'Skill'}</button>
                    </div>
                    <div
                      className={
                        state.experience_check
                          ? 'smallBtn active mx-2'
                          : 'smallBtn mx-2'
                      }
                      onClick={() =>
                        setState({ experience_check: !state.experience_check })
                      }
                    >
                      <button>{'Experience'}</button>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </div>

              <button
                className="btn btn-primary btn__modal w-50 m-auto"
                onClick={handleSubmit}
              >
                Create Job circular
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer transition={Zoom} />
    </Dashboard>
  );
}

export default JobCircularCreate;
