import React from 'react';
import axios from "axios";
import ReactDOM from "react-dom";
import { ToastContainer, Zoom } from "react-toastify";
import App from "./App";
import { toastifyAlertError } from "./components/alert/tostifyALert";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { getToken } from "./utils/auth";

// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
// axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

axios.defaults.headers["Accept"] = "application/json";
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// Access-Control-Max-Age: 600

axios.interceptors.request.use((config) => {
  // console.log('config', config)
  // console.log('navigator.onLinewdededded', navigator.onLine)
  if(navigator.onLine){

    // let dispatch = useDispatch();
    // config.baseURL = "http://abedok.ektechnologybd.com/api/";
    config.baseURL = "http://engine.aabedok.com/api/";

   
    config.withCredentials = true;
  
    const access_token = getToken();
    // dispatch(getNotificationCount())
    config.headers.Authorization = access_token ? `Bearer ${access_token}` : "";
    return config;
  }else{
    toastifyAlertError("No internet connection","top-center")
  }
});
ReactDOM.render(
  // <AuthProvider>
  <>
  <App />
  <ToastContainer transition={Zoom}/>
  </>,
  // </AuthProvider>
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
