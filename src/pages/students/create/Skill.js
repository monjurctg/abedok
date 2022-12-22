import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import UserServices from "../../../api/user/UserServices";
import {
  toastifyAlertError,
  toastifyAlertSuccess
} from "../../../components/alert/tostifyALert";
import { loadingState } from "../../../redux/actions/modalAction";
import { singleUser } from "../../../redux/actions/userAction";

function Skill() {
  const { id } = useParams();
  const { singleUserRed } = useSelector((state) => state.user);
  let { loadingNow } = useSelector((state) => state.modalValue);

  let dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",

      institute_name: "",
      duration: "",
      result: "",
    }
  );

  useEffect(() => {
    dispatch(singleUser(id));
  }, []);

  const inputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    setState({
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    dispatch(loadingState(true));
    let values = {
      skill: [
        {
          name: state.name,
          result: state.result,
          institute_name: state.institute_name,
          duration: state.duration,
          user_id: id,
        },
      ],
    };

    let res = await UserServices.skill(values);
    // console.log('res', res)
    if (res.status === 201) {
      dispatch(loadingState(false));
      toastifyAlertSuccess(res.data?.message, "top-center");
      dispatch(singleUser(id));
      setState({ name: "", institute_name: "", duration: "", result: "" });
    } else {
      dispatch(loadingState(false));

      toastifyAlertError(res.data?.message, "top-center");
    }
  };

  let skillsData = "";
  // console.log('singleUserRed', singleUserRed.data)
  if (singleUserRed?.data?.Skills) {
    skillsData = singleUserRed?.data?.Skills.map((skill) => (
      <div className="skills">
        <h5 style={{ color: "white" }}>{skill.name}</h5>
      </div>
    ));
  }

  return (
    <div>
      <div className="jsc">
        <div className="userShow">
          <div className="row mb-5">
            <h5 style={{borderBottom: "1px solid #e91e63"}}>{singleUserRed?.data?.Skills ? "Your Skills:" :""}</h5>
            <div className="d-flex">{skillsData}</div>
          </div>

          <div className="row ">
            <div className="skills_h5">
            <h5 style={{borderBottom: "1px solid #e91e63"}}>Skills:</h5>

            </div>
            <div className="col-md-6">
              <label>SKill name</label>
              <input
                className="modal__input"
                name="name"
                value={state.name}
                onChange={inputChange}
                type="text"
                placeholder="Skill name*"
              />
            </div>
            <div className="col-md-6">
              <label>Institution name</label>
              <input
                className="modal__input"
                name="institute_name"
                type="text"
                value={state.institute_name}
                onChange={inputChange}
                placeholder="Institution name*"
              />
            </div>

            <div className="col-md-6">
              <label>Duration</label>
              <input
                className="modal__input"
                name="duration"
                type="number"
                value={state.duration}
                onChange={inputChange}
                placeholder="Duration*"
              />
            </div>

            <div className="col-md-6">
              <label>Result</label>
              <input
                name="result"
                className="modal__input"
                value={state.result}
                onChange={inputChange}
                type="number"
                placeholder="Result*"
              />
            </div>

            <div className="text-center py-3">
              <input
                type="submit"
                className="submit_btn"
                value={
                  loadingNow
                    ? "Saving..."
                    : singleUserRed?.data?.Skills?.length > 0
                    ? "Add new skill"
                    : "Add Skill"
                }
                onClick={handleSubmit}
              />
            </div>

            <ToastContainer transition={Zoom} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Skill;
