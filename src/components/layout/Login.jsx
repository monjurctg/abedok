import React from 'react';
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthServices from "../../api/AuthServices";
import human from "../../assets/img/human.svg";
import logo from "../../assets/img/logo.svg";
import right from "../../assets/img/right_arrow.svg";
import { useAuth } from "../../context/auth";
import { loginFunction } from "../../redux/actions/authAction";
import { loadingState } from "../../redux/actions/modalAction";
import { getSideBar, setSideBar } from "../../utils/auth";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../alert/tostifyALert";

function Login() {
  const dispatch = useDispatch();
  let { isAuthenticated, user } = useSelector((state) => state.auth);
  let { loadingNow } = useSelector((state) => state.modalValue);
  // console.log("loadingNow :>> ", loadingNow);

  let { authenticated, setToken, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  // console.log("authenticated in login :>> ", authenticated);
  // console.log("isAuthenticated :>> ", isAuthenticated);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: "",
      logedIn: false,
      load1: true,
      load2: false,
    }
  );

  let userData = async () => {
    let res = await AuthServices.user();
    setCurrentUser(res);
    // navigate("/dashboard");
  };

  useEffect(() => {
    // console.log("isAuthenticated", isAuthenticated);
    // let count = 0;
    if (isAuthenticated) {
      dispatch(loadingState(false));
      toastifyAlertSuccess("Login successfull", "top-center");
      setToken(user.token);
      userData();
    }
  }, [isAuthenticated]);

  //input value change and submit
  useEffect(() => {
    // console.log("authenticated", authenticated);
    let url = getSideBar();
    // console.log("url", url);
    if (authenticated) {
      navigate(url);
      setSideBar(getSideBar());
    }
  }, [authenticated]);

  const inputChange = (e) => {
    const target = e.target;
    const name = target.name;
    let value = target.value;
    setState({
      [name]: value,
    });
  };

  const inputSubmit = async (e) => {
    // console.log("asdasdasaad", navigator.onLine);
    dispatch(loadingState(true));
    e.preventDefault();
    let data = {
      email: state.email,
      password: state.password,
    };
    if (navigator.onLine) {
      const res = await AuthServices.login(data);
      if (res?.status === 201) {
        dispatch(loadingState(false));
        // console.log("resasdfsadfsdfse 201 :>> ", res);

        // console.log("res", res);
        dispatch(loginFunction(res.data));
      } else if (res?.status === 422) {
        dispatch(loadingState(false));
        // console.log("resasdfsadfsdfse :>> 422 ", res);

        let errors = Object.values(res?.data?.errors);
        // console.log("errors :>> ", errors);
        errors.forEach((element) => {
          // console.log("element :>> ", element);
          toastifyAlertError(element[0], "top-center");
        });
        // dispatch({ type: ActionTypes.LOGIN, payload: res, val: false });
      } else {
        // console.log("resasdfsadfsdfse :>> ", res);

        dispatch(loadingState(false));

        toastifyAlertError(
          "Server issue!!!! Ask your server provider",
          "top-center"
        );
      }
    } else {
      dispatch(loadingState(false));

      toastifyAlertError("You don't have internet connection", "top-center");
    }
  };

  return (
    <div className="wrapper">
      <div className="left__side">
        <div className="logo">
          <img className="logo__image" src={logo} alt="logo" />
        </div>

        <div className="human__img__part">
          <div className="human__img">
            <img src={human} alt="human" />
          </div>
          <div className="human__text">
            <h3>Job Search</h3>
            <p>Get real time search and get new jobs</p>
          </div>

          <div className="carousel__button">
            <span className="active mx-3"></span>
            <span className="active inactive mx-3"></span>
          </div>
        </div>
      </div>

      <div className="right__side">
        <div className="right__slide__box">
          <div className="logo responsive__logo mb-4">
            <img className="logo__image" src={logo} alt="logo" />
          </div>
          <div className="welcome">
            <h3>Welcome Back</h3>
          </div>
          <div className="phone__input">
            <input
              type="email"
              name="email"
              onChange={inputChange}
              placeholder="Email"
              autoComplete="off"
            />
          </div>
          <div className="phone__input">
            <input
              type="password"
              name="password"
              onChange={inputChange}
              placeholder="Password"
              autoComplete="off"
            />
          </div>
          {/* <p>By Continue you may recieve an SMS for verification.</p> */}
          <div className="con__btn mt-3" onClick={inputSubmit}>
            <h4>{loadingNow ? "Signing in..." : "Continue"}</h4>
            <img src={right} alt="right" />
          </div>
        </div>
        <ToastContainer transition={Zoom} />
      </div>
    </div>
  );
}

export default Login;
