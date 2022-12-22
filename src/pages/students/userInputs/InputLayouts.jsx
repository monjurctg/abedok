import React, { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import UserServices from "../../../api/user/UserServices";
import { toastifyAlertSuccess } from "../../../components/alert/tostifyALert";
import { AD } from "../../../constants/ad";
import { loadingState } from "../../../redux/actions/modalAction";
import RoleInputs from "./RoleInputs";

function InputLayouts() {
  let { type } = useParams();
  let navigate = useNavigate();
  let { loadingNow } = useSelector((state) => state.modalValue);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      password: "",
      con_password: "",
      mobile: "",
      errors: { email: "", password: "", phone: "" },
    }
  );

  let dispatch = useDispatch();

  let role = <RoleInputs />;
  const inputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    setState({
      [name]: value,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loadingState(true));
    let registarValue = {
      name: state.name,

      // phone: `+880${state.mobile}` old codeblocks,

      phone: `0${state.mobile}`, // after fixed 

      // phone: `${state.mobile}`,

      password: state.password,
      password_confirmation: state.con_password,
      email: state.email,
      type: type === AD.USER_TYPE_MERCHENTS ? 0 : 1,
      commission: state.comission_percentage,
    };
    console.log("first", registarValue);

    let registerRes = await UserServices.store(registarValue);
    if (registerRes.status === 422) {
      dispatch(loadingState(false));
     

      setState({
        errors: {
          email: registerRes.data.errors?.email
            ? registerRes.data.errors?.email[0]
            : "",
          password: registerRes.data.errors?.password
            ? registerRes.data.errors.password[0]
            : "",
          phone: registerRes.data.errors?.phone
            ? registerRes.data.errors?.phone[0]
            : "",
        },
      });
    } else {
      toastifyAlertSuccess(registerRes?.message, "top-center");
      dispatch(loadingState(false));

      setState({
        errors: {
          email: "",
          password: "",
          phone: "",
        },
        name: "",
        email: "",
        password: "",
        con_password: "",
        mobile: "",
      });
      if (type === AD.USER_TYPE_MERCHENTS) {
        setTimeout(() => {
          navigate(`/dashboard`);
        }, 1000);
      } else {
        setTimeout(() => {
          navigate(`/user/create/student/${registerRes.user}/basic`);
        }, 1000);
      }
    }
    // console.log("registerRes :>> ", registerRes);
  };

  return (
    <>
      <div className="row gy-5">
        <div className="col-md-6">
          <label className="">Name</label>
          <input
            // className=""
            type="text"
            className="modal__input"
            value={state.name}
            onChange={inputChange}
            name="name"
            required={true}
            placeholder="Name*"
          />
        </div>
        <div className="col-md-6">
          <label>Email</label>

          <input
            className="modal__input"
            type="email"
            required={true}
            value={state.email}
            onChange={inputChange}
            name="email"
            placeholder="Email*"
          />
          <span className="error_show">{state.errors.email}</span>
        </div>
        <div className="col-md-6 ">
          <label className="">Phone</label>

          <div className="position-relative">
            <input
              style={{ padding: "15px 80px" }}
              className="modal__input"
              type={"tel"}
              required={true}
              name="mobile"
              value={state.mobile}
              onChange={inputChange}
              minLength={10}
              maxLength={10}
              placeholder="Mobile*"
            />
            <div className="addPhone">+880</div>
          </div>
          <span className="error_show">{state.errors.phone}</span>
        </div>

        <div className="col-md-6">
          <label className="">Password</label>

          <input
            className="modal__input"
            onChange={inputChange}
            required={true}
            name="password"
            value={state.password}
            type="password"
            placeholder="Password*"
          />
          <span className="error_show">{state.errors.password}</span>
        </div>
        <div className="col-md-6">
          <label className="">Confirm Password</label>

          <input
            className="modal__input"
            onChange={inputChange}
            name="con_password"
            required={true}
            value={state.con_password}
            type="password"
            placeholder="Confirm Password*"
          />
        </div>
        {type === AD.USER_TYPE_MERCHENTS ? (
          <div className="col-md-6 ">
            <label>Comission</label>
            <input
              className="modal__input"
              type="number"
              required={true}
              name="comission_percentage"
              onChange={inputChange}
              value={state.comission_percentage}
              placeholder="Comission Percentage*"
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {type === AD.USER_TYPE_SUPER_ADMIN ? role : ""}

      <div className="text-center py-3">
        <input
          type="submit"
          className="submit_btn"
          value={loadingNow ? "Creating..." : "Save User"}
          onClick={handleSubmit}
        />
      </div>
    </>
  );
}

export default InputLayouts;
