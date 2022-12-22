import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserServices from "../../../api/user/UserServices";
import { modalUpdate } from "../../../redux/actions/modalAction";
import { boardAllList } from "../../../redux/actions/university/boardAction";
import { courseDurationAllList } from "../../../redux/actions/university/courseDurationAction";
import { examAllList } from "../../../redux/actions/university/examAction";
import { groupAll } from "../../../redux/actions/university/groupAction";
import { allMajorList } from "../../../redux/actions/university/majorAction";
import { passingYearAllList } from "../../../redux/actions/university/passingYearAction";
import { allSubjectList } from "../../../redux/actions/university/subjectAction";
import { universityAll } from "../../../redux/actions/university/universityAction";
import { singleUser } from "../../../redux/actions/userAction";
import {
  toastifyAlertError,
  toastifyAlertSuccess
} from "../../alert/tostifyALert";

function Education({ type }) {
  const { modalUp } = useSelector((state) => state.modalValue);
  const { id } = useParams();

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      selectResultType: false,
      name: "",
      examination_id: "",
      roll_no: "",
      registration_no: "",
      result: "",
      passing_year_id: "",
      user_id: id,
      board_id: "",
    }
  );
  // let { gradeStoreRed } = useSelector((state) => state.grade);
  let { loadingNow } = useSelector((state) => state.modalValue);

  const { boardData } = useSelector((state) => state.board);
  const { groupAllRed } = useSelector((state) => state.group);

  const { passingYearData } = useSelector((state) => state.passingYear);
  const { universityData } = useSelector((state) => state.university);
  const { subjectData } = useSelector((state) => state.subject);
  const { courseDurationData } = useSelector((state) => state.course);
  const { singleUserRed } = useSelector((state) => state.user);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(universityAll());
    dispatch(allSubjectList());
    dispatch(courseDurationAllList());
    dispatch(allSubjectList());
    dispatch(passingYearAllList());
    dispatch(boardAllList());
    dispatch(examAllList());
    dispatch(allMajorList());
    dispatch(groupAll());
  }, []);

  useEffect(() => {
    // console.log("first", state.examination_id);
    // if (state.examination_id) {
    // console.log('first', singleUserRed?.data.Address)
    if ([1, 2, 3].includes(state.examination_id)) {
      // console.log("3rd", state.examination_id);

      setState({
        roll_no:
          singleUserRed.data?.Education_Under_Graduate[state.examination_id - 1]
            ?.roll_no,
        registration_no:
          singleUserRed.data?.Education_Under_Graduate[state.examination_id - 1]
            ?.registration_no,
        result:
          singleUserRed.data?.Education_Under_Graduate[state.examination_id - 1]
            ?.result,
        passing_year_id:
          singleUserRed.data?.Education_Under_Graduate[state.examination_id - 1]
            ?.passing_year?.id,
        board_id:
          singleUserRed.data?.Education_Under_Graduate[state.examination_id - 1]
            ?.board?.id,
        group_id:
          singleUserRed.data?.Education_Under_Graduate[state.examination_id - 1]
            ?.group?.id,
        // name: singleUserRed.data?.Education_Under_Graduate[
        //   state.examination_id - 1
        // ]?.name ,
      });
    } else if ([4, 5].includes(state.examination_id)) {
      // console.log("3rd", state.examination_id);

      setState({
        roll_no:
          singleUserRed.data?.Education_Post_Graduate[state.examination_id - 1]
            ?.roll_no,
        registration_no:
          singleUserRed.data?.Education_Post_Graduate[state.examination_id - 1]
            ?.registration_no,
        result:
          singleUserRed.data?.Education_Post_Graduate[state.examination_id - 1]
            ?.result,
        passing_year_id:
          singleUserRed.data?.Education_Post_Graduate[state.examination_id - 1]
            ?.passing_year?.id,
        board_id:
          singleUserRed.data?.Education_Post_Graduate[state.examination_id - 1]
            ?.board?.id,
        group_id:
          singleUserRed.data?.Education_Post_Graduate[state.examination_id - 1]
            ?.group?.id,
        // name: singleUserRed.data?.Education_Post_Graduate[
        //   state.examination_id - 1
        // ]?.name,
      });
    }
    // }
  }, [state.examination_id]);

  // console.log("secondz", state.examination_id);

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
    let data = {
      name: state.name,
      examination_id: state.examination_id,
      roll_no: state.roll_no,
      registration_no: state.registration_no,
      result: state.result,
      passing_year_id: state.passing_year_id,
      user_id: id,
      board_id: state.board_id,
      subject_id: state.subject_id,
      course_duration_id: state.course_duration_id,
      type: 0,
      major_id: state.major_id,
      universities_id: state.universities_id,
      result_type:state.selectResultType
    };

    // console.log("data.ex", data);
    //
    if (state.examination_id) {
      let res =
        state.examination_id === 1 || 2 || 3
          ? await UserServices.graduate(data)
          : state.examination_id === 4 || 5
          ? await UserServices.higherGraduate(data)
          : "";
      // console.log("res", res);
      if (res.status === 201) {
        toastifyAlertSuccess("Updated successfully", "top-center");
        dispatch(modalUpdate(false));
        dispatch(singleUser(id));
      } else {
        toastifyAlertError("Not updated", "top-center");
      }
    } else {
      toastifyAlertError("Select examination", "top-center");
    }

    // console.log('data', data)
  };
  let boardValues = "";
  if (boardData?.data) {
    boardValues = boardData.data.map((group, index) => (
      <option key={index} value={group.id}>
        {group.name}
      </option>
    ));
  }

  // console.log('state.board_id', state.board_id)

  let majorValues = "";
  if (subjectData?.data && state.subject_id) {
    // console.log("state.subject_id :>> ", state.subject_id);
    // console.log("object :>> ", subjectData.data);
    majorValues = subjectData.data
      .filter((sub) => sub.id == state.subject_id)
      .map((group, index) =>
        group?.majors.map((maj, index) => (
          <option key={index} value={maj.id}>
            {maj.name}
          </option>
        ))
      );
  }

  let subjectValues = "";
  if (subjectData?.data) {
    subjectValues = subjectData.data.map((group, index) => (
      <option key={index} value={group.id}>
        {group.name}
      </option>
    ));
  }

  let groupDataValues = "";
  // console.log("groupData :>> ", groupData);
  if (groupAllRed?.data) {
    groupDataValues = groupAllRed.data.map((group, index) => (
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

  let passingYearValues = "";
  if (passingYearData?.data) {
    passingYearValues = passingYearData.data.map((group, index) => (
      <option key={index} value={group.id}>
        {group.name}
      </option>
    ));
  }

  let universityValues = "";
  if (universityData?.data) {
    universityValues = universityData.data.map((group, index) => (
      <option key={index} value={group.id}>
        {group.name}
      </option>
    ));
  }
  // console.log('state.name1', state.name)

  let changeValue = (e) => {
    setState({
      name: e.target.value,
      examination_id:
        e.target.value === "JSC"
          ? 1
          : e.target.value === "SSC"
          ? 2
          : e.target.value === "HSC"
          ? 3
          : e.target.value === "GRADUATE"
          ? 4
          : 5,
    });
  };

  // console.log('state.name', state.name)

  let crossIcon = () => dispatch(modalUpdate(false));
  return (
    <div className="modal_items">
      <div
        className={`modal_content ${modalUp ? "animation" : "animationOut"} `}
      >
        <div className="modal_header">
          <h5>{type}</h5>
          <button
            type="button"
            id="crossIcon"
            onClick={crossIcon}
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          <select
            onChange={changeValue}
            className="modal__input my-2"
            name="name"
            value={state.name}
          >
            <option value={""} selected>
              Select level of Education
            </option>
            <option value="JSC">JSC</option>
            <option value="SSC">SSC</option>
            <option value="HSC">HSC</option>
            <option value="GRADUATE">Graduate</option>
            <option value="POST_GRADUATE">Post Graduate</option>
          </select>

          {state.examination_id ? (
            <div>
              <label>Board</label>

              <select
                onChange={inputChange}
                className="modal__input my-2"
                name={"board_id"}
                required

                value={state.board_id}
              >
                <option selected>
                  Board
                </option>
                {boardValues}
              </select>
              <label>Roll no</label>
              <input
                className="modal__input my-2"
                type="text"
                required
                onChange={inputChange}
                name={"roll_no"}
                value={state.roll_no}
                placeholder="Roll*"
              />


              {state.name === "SSC" || state.name === "HSC" ? (
                <>
                <label>Group</label>
                <select
                  onChange={inputChange}
                  className="modal__input my-2"
                  name={"passing_year_id"}
                  value={state.group_id}
                >
                  <option selected>Group</option>
                  {groupDataValues}
                </select>
                
                </>
              ) : (
                ""
              )}

              <label>Registration no</label>

              <input
                className="modal__input my-2"
                type="text"
                onChange={inputChange}
                name={"registration_no"}
                required
                value={state.registration_no}
                placeholder="Registration number*"
              />
              <label>Passing year</label>

              <select
                onChange={inputChange}
                className="modal__input my-2"
                name={"passing_year_id"}
                value={state.passing_year_id}
              >
                <option selected>Passing Year</option>
                {passingYearValues}
              </select>
              <select
                name="selectResultType"
                className="modal__input my-2"
                onChange={handleResult}
              >
                <option selected disabled>
                  Result
                </option>
                <option value="0">Gpa(Out of 5)</option>
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
                onClick={() => setState({ result: 1 })}
                className={state.result === 1 ? "active" : ""}
              >
                First
              </label>
              <label
                onClick={() => setState({ result: 2 })}
                className={state.result === 2 ? "active" : ""}
              >
                Second
              </label>
              <label
                onClick={() => setState({ result: 3 })}
                className={state.result === 3 ? "active" : ""}
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
              {state.name === "GRADUATE" || state.name === "POST-GRADUATE" ? (
                <div>
                  <label>University</label>

                  <select
                    name="universities_id"
                    className="modal__input my-2"
                    // value={state.universities_id}
                    onChange={inputChange}
                  >
                    <option selected disabled>
                      University/Institution
                    </option>
                    {universityValues}
                  </select>

              <label>Subject</label>

                  <select
                    className="modal__input my-2"
                    name="subject_id"
                    // value={state.subject_id}
                    onChange={inputChange}
                  >
                    <option selected disabled>
                      Subject/Degree
                    </option>
                    {subjectValues}
                  </select>
              <label>Major</label>

                  <select
                    name="major_id"
                    className="modal__input my-2"
                    onChange={inputChange}
                  >
                    <option selected disabled>
                      Major
                    </option>
                    {majorValues}
                  </select>

                  <label>Course Duration</label>

                  <select
                    name="course_duration_id"
                    className="modal__input my-2"
                    // value={state.course_duration_id}
                    onChange={inputChange}
                  >
                    <option selected disabled>
                      Course Duration
                    </option>
                    {courseDurationvalues}
                  </select>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
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
            {loadingNow ? "Loading........" : type}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Education;
