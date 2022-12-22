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

function Experience() {
  // let { userCurrent } = useSelector((state) => state.inputVal);
  const { id } = useParams();

  const { singleUserRed } = useSelector((state) => state.user);
  let { loadingNow } = useSelector((state) => state.modalValue);



  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      type: "",

      location: "",
      duration: "",
      designation: "",
      start_date: "",
      end_date: "",
    }
  );

  let dispatch = useDispatch();
  const inputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    setState({
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(loadingState(true));

    let values = {
      type: state.type,
      designation: state.designation,
      location: state.location,
      duration: state.duration,
      start_date: state.start_date,
      end_date: state.end_date,
      user_id: id,
      company_name: state.company_name,
      salary: state.salary,
      currently_working: state.currently_working ? 1 : 0,
    };
    // console.log("values", values);
    let res = await UserServices.experience(values);
    // console.log("res :>> ", res.data);
    if (res.data?.message === "Experience create Successfully") {
    dispatch(loadingState(false));
    dispatch(singleUser(id));
    setState({

      type: "",
      designation: "",
      location: "",
      duration: "",
      start_date: "",
      end_date: "",
      company_name: "",
      salary: "",
      currently_working: ""

    })
      toastifyAlertSuccess(res.data?.message, "top-center");
    } else {
    dispatch(loadingState(false));
    let errors = Object.values(res?.data?.errors);
    // console.log("errors :>> ", errors);
    errors.forEach((element) => {
      // console.log("element :>> ", element);
      toastifyAlertError(element[0], "top-center");
    });
      // toastifyAlertError(res.data?.message, "top-center");
    }
  };

  const working = () => {
    setState({ currently_working: !state.currently_working });
  };

  useEffect(() => {
    dispatch(singleUser(id));
  }, []);

  let skillsData = ""
  // console.log('singleUserRed', singleUserRed.data)
  if(singleUserRed?.data?.Experience){

    skillsData =  singleUserRed?.data?.Experience.map(skill=>(
      <div className="skills">
        <p style={{color:"white"}}>{skill.company_name}</p>

      </div>
      )
    )
  }

  return (
    <div className="jsc">

      <div className="userShow">

      <div className="row mb-5">
            <h5 style={{borderBottom: "1px solid #e91e63"}}>{singleUserRed?.data?.Experience?.length>0 ? "Your Experiences:":""}</h5>
            <div className="d-flex">
            {skillsData}
            </div>

          
          </div>
          <form onSubmit={handleSubmit}>

        <div className="row">
          <h5 style={{borderBottom: "1px solid #e91e63"}}> Add Experience:</h5>
          <div className="my-3">
          <button
            className={
              state.currently_working
                ? "upload__btn active mr-4"
                : "upload__btn mr-4"
            }
            onClick={working}
            style={{ marginRight: "66px" }}
          >
            Currently Working
          </button>
        </div>
          <div className="col-md-6">
            <label>Job type</label>
              
            <select className="modal__input" name="type" onChange={inputChange} required>
              
              <option disabled selected>
                Job type
              </option>
              <option value={"2"}>Private</option>
              <option value={"1"}>Public</option>
            </select>
          </div>
          <div className="col-md-6">
            <label>Company name</label>
            <input
              className="modal__input"
              name="company_name"
              value={state.company_name}
              type="text"
              required

              onChange={inputChange}
              placeholder="Company name*"
            />
          </div>

          <div className="col-md-6">
            <label>Disagnation</label>
            <input
              className="modal__input"
              name="designation"
              value={state.designation}
              onChange={inputChange}
              type="text"
              required
              placeholder="Designation*"
            />
          </div>
          <div className="col-md-6">
            <label>Salary</label>
            <input
              className="modal__input"
              type="number"
              name="salary"
              
              value={state.salary}
              onChange={inputChange}
              placeholder="Present Salary*"
            />
          </div>

          <div className="col-md-6">
            <label>Location</label>
            <input
              className="modal__input"
              name="location"
              required
              value={state.location}
              onChange={inputChange}
              type="text"
              placeholder="Location*"
            />
          </div>
          <div className="col-md-6">
            <label>Duration</label>
            <input
              className="modal__input"
              name="duration"
              value={state.duration}
              onChange={inputChange}
              type="text"
              placeholder="Duration*"
            />
          </div>
          <div className="col-md-6">
            <label className="my-2"> Start date</label>
            <input
              className="modal__input"
              type="date"
              placeholder="Start Date*"
              name="start_date"
              onChange={inputChange}
              value={state.start_date}
            />
          </div>
          <div className="col-md-6">
            <label className="my-2">End Date</label>

            <input
              className="modal__input"
              type="date"
              placeholder="End Date*"
              name="end_date"
              min={state.start_date}
              onChange={inputChange}
              value={state.end_date}
              // max={}
            />
          </div>

       

          <div className="text-center py-3">
          <input type="submit" className="submit_btn" value={loadingNow ? "Saving.......":singleUserRed?.data?.Experience?.length > 0
                    ? "Add new Experience"
                    : "Add Experience"} />
        </div>

          <ToastContainer transition={Zoom} />
        </div>
          </form>
      </div>
    </div>
  );
}

export default Experience;
