import React from 'react';
import { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import UserServices from "../../../../api/user/UserServices";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../../components/alert/tostifyALert";

function Hsc({ boardData, passingYearData, examData, groupData }) {
  // let { userCurrent } = useSelector((state) => state.inputVal);
  const { id } = useParams();

  // graduate
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      examination_id: 3,
      roll_no: "",
      registration_no: "",
      result: "",
      passing_year_id: "",
      board_id: "",
      staticValue: ["HSC", "ALIM"],
    }
  );

  // let dispatch = useDispatch();

  useEffect(() => {
    // dispatch(singleUser(id));
  }, []);
  const handleResult = (e) => {
    setState({ selectResultType: e.target.value });
  };

  const inputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    setState({
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    let values = {
      name: state.name,
      examination_id: state.examination_id,
      roll_no: state.roll_no,
      registration_no: state.registration_no,
      result: state.result,
      passing_year_id: state.passing_year_id,
      board_id: state.board_id,
      user_id: id,
      result_type: state.selectResultType,
      group_id: state.group_id,

      // userCurrent
    };
    let res = await UserServices.graduate(values);
    if (res.status === 201) {
      toastifyAlertSuccess("Hsc added Successfully", "top-center");
      setState({
        name: "",
        examination_id: "",
        roll_no: "",
        registration_no: "",
        result: "",
        passing_year_id: "",
        board_id: "",
        group_id: "",
      });
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

  let boardValues = "";
  if (boardData?.data) {
    boardValues = boardData.data.map((group, index) => (
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

  let examValues = "";
  if (state.staticValue) {
    examValues = state.staticValue.map((group, index) => (
      <option key={index} value={group}>
        {group}
      </option>
    ));
  }

  let groupDataValues = "";
  // console.log("groupData :>> ", groupData);
  if (groupData?.data) {
    groupDataValues = groupData.data.map((group, index) => (
      <option key={index} value={group.id}>
        {group.name}
      </option>
    ));
  }

  return (
    <div className="jsc">
      <div className="student__header d-flex justify-content-between">
        <div className="header__level">
          <span>H.S.C or Equivalent Level</span>
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
          <select onChange={inputChange} name={"name"}>
            <option selected>Examination</option>
            {examValues}
          </select>
        </div>
        <div className="col-md-6">
          <select onChange={inputChange} name={"board_id"}>
            <option selected>Board</option>
            {boardValues}
          </select>
        </div>
      </div>

      <div className="inputs row gy-5">
        <div className="col-md-6">
          <input
            className=""
            type="number"
            onChange={inputChange}
            name={"roll_no"}
            value={state.roll_no}
            placeholder="Roll*"
          />
        </div>
        <div className="col-md-6">
          <input
            className=""
            type="number"
            onChange={inputChange}
            name={"registration_no"}
            value={state.registration_no}
            placeholder="Registration number*"
          />
        </div>

        <div className="col-md-6">
          <select name="selectResultType" onChange={handleResult}>
            <option selected>Result</option>
            <option value="0">Gpa(Out of 5)</option>
            <option value="1">Division</option>
          </select>
          {state.selectResultType === "0" ? (
            <div className="d-flex my-2" style={{ columnGap: "10px" }}>
              <input
                className=""
                style={{ flexBasis: "50%" }}
                type="number"
                max={5}
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
        </div>

        <div className="col-md-6">
          <select onChange={inputChange} name={"passing_year_id"}>
            <option disabled selected>
              Passing Year
            </option>
            {passingYearValues}
          </select>
        </div>

        <div className="col-md-6">
          <select onChange={inputChange} name={"group_id"}>
            <option disabled selected>
              Group
            </option>
            {groupDataValues}
          </select>
        </div>
        <ToastContainer transition={Zoom} />
      </div>
      {/* <div className="text-center ">
        <Link to="/user/create/student/basic">
          <button className="addEducation__btn">
            <p>+ Add Education</p>
          </button>
        </Link>
      </div> */}
    </div>
  );
}

export default Hsc;
