import React from 'react';
import { useReducer } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import UserServices from "../../../../api/user/UserServices";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../../components/alert/tostifyALert";

function Graduate({
  majorData,
  subjectData,
  universityData,
  courseDurationData,
  passingYearData,
}) {
  const { id } = useParams();

  // console.log("objeuniversityDatact :>> ", universityData);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "Honurs",
      subject_id: "",
      roll_no: "",
      registration_no: "",
      result: "",
      passing_year_id: "",
      course_duration_id: "",
      major_id: "",
    }
  );

  const inputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    setState({
      [name]: value,
    });
  };

  const handleResult = (e) => {
    setState({ selectResultType: e.target.value });
  };

  const handleSubmit = async () => {
    let values = {
      name: state.name,
      subject_id: state.subject_id,
      roll_no: state.roll_no,
      registration_no: state.registration_no,
      result: state.result,
      passing_year_id: state.passing_year_id,
      course_duration_id: state.course_duration_id,
      user_id: id,
      major_id: state.major_id,
      universities_id: state.universities_id,
      type: 0,
      result_type: state.selectResultType,
      // userCurrent
    };
    let res = await UserServices.higherGraduate(values);
    if (res.status === 201) {
      toastifyAlertSuccess("Higher Graduate create Successfully", "top-center");
    } else {
      let errors = Object.values(res?.data?.errors);
      // console.log("errors :>> ", errors);
      errors.forEach((element) => {
        // console.log("element :>> ", element);
        toastifyAlertError(element[0], "top-center");
      });
      // toastifyAlertError(res.data?.message, "top-center");
    }
    // console.log("res :>> ", res.data);
  };

  let universityValues = "";
  if (universityData?.data) {
    universityValues = universityData.data.map((group, index) => (
      <option key={index} value={group.id}>
        {group.name}
      </option>
    ));
  }

  let passingYearValues = "";
  if (passingYearData?.data) {
    passingYearValues = passingYearData.data.map((group, index) => (
      <option key={index} value={group.id}>
        {group.name}
      </option>
    ));
  }

  let majorValues = "";
  if (subjectData?.data && state.subject_id) {
    // console.log("state.subject_id :>> ", state.subject_id);
    // console.log("object :>> ", subjectData.data[0].id);
    majorValues = subjectData.data
      .filter((sub) => sub.id == state.subject_id)
      .map((group, index) =>
        group?.majors.map((maj) => (
          <option key={index} value={maj.id}>
            {maj.name}
          </option>
        ))
      );
  }

  let subjectValues = "";
  if (subjectData?.data) {
    subjectValues = subjectData.data
      .filter((group) => group.name[0] !== "M")
      .map((group, index) => (
        <option key={index} value={group.id}>
          {group.name}
        </option>
      ));
  }

  let courseDurationvalues = "";
  if (courseDurationData?.data) {
    courseDurationvalues = courseDurationData.data.map((group, index) => (
      <option key={index} value={group.id}>
        {group.name}
      </option>
    ));
  }

  return (
    <div className="jsc">
      <div className="student__header d-flex justify-content-between">
        <div className="header__level">
          <span>Graduate</span>
        </div>
        <div>
          {/* <button className="upload__btn mr-4" style={{ marginRight: "66px" }}>
            Edit
          </button> */}
          <button
            type="submit"
            className="submit_btn small"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>

      <div className="inputs row gy-5">
        <div className="col-md-6">
          <select
            name="subject_id"
            // value={state.subject_id}
            onChange={inputChange}
          >
            <option selected disabled>
              Subject/Degree
            </option>
            {subjectValues}
          </select>
        </div>
        <div className="col-md-6">
          <select
            name="universities_id"
            // value={state.universities_id}
            onChange={inputChange}
          >
            <option selected disabled>
              University/Institution
            </option>
            {universityValues}
          </select>
        </div>
      </div>

      <div className="inputs row gy-5">
        <div className="col-md-6">
          <input
            name="roll_no"
            value={state.roll_no}
            onChange={inputChange}
            className=""
            type="number"
            placeholder="Roll*"
          />
        </div>
        <div className="col-md-6">
          <input
            className=""
            onChange={inputChange}
            name="registration_no"
            value={state.registration_no}
            type="number"
            placeholder="Registration number*"
          />
        </div>
        <div className="col-md-6">
          <select name="selectResultType" onChange={handleResult}>
            <option selected>Result</option>
            <option value="0">Gpa(Out of 4)</option>
            <option value="1">Division</option>
          </select>
          {state.selectResultType === "0" ? (
            <div className="d-flex my-2" style={{ columnGap: "10px" }}>
              <input
                className=""
                style={{ flexBasis: "50%" }}
                type="number"
                max={4}
                min={1}
                onChange={inputChange}
                name={"result"}
                value={state.result}
                placeholder={state.selectResultType + "*"}
              />
              <div className="btn__select align-self-center">
                <button
                  className=""
                  onClick={() => setState({ selectResultType: "" })}
                >
                  Clear
                </button>
              </div>
            </div>
          ) : state.selectResultType === "1" ? (
            <div className="d-flex my-2 division" style={{ columnGap: "10px" }}>
              <label
                onClick={() => setState({ result: "1" })}
                className={state.result === "1" ? "active" : ""}
              >
                First
              </label>
              <label
                onClick={() => setState({ result: "2" })}
                className={state.result === "2" ? "active" : ""}
              >
                Second
              </label>
              <label
                onClick={() => setState({ result: "3" })}
                className={state.result === "3" ? "active" : ""}
              >
                Third
              </label>
              <div className="btn__select align-self-center">
                <button
                  className=""
                  onClick={() => setState({ selectResultType: "" })}
                >
                  Clear
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6">
          <select name="major_id" onChange={inputChange}>
            <option selected>Major</option>
            {majorValues}
          </select>
        </div>
        <div className="col-md-6">
          <select
            name="passing_year_id"
            // value={state.passing_year_id}
            onChange={inputChange}
          >
            <option selected disabled>
              Passing Year
            </option>
            {passingYearValues}
          </select>
        </div>
        <div className="col-md-6">
          <select
            name="course_duration_id"
            // value={state.course_duration_id}
            onChange={inputChange}
          >
            <option selected disabled>
              Course Duration
            </option>
            {courseDurationvalues}
          </select>

          <ToastContainer transition={Zoom} />
        </div>
      </div>
    </div>
  );
}

export default Graduate;
