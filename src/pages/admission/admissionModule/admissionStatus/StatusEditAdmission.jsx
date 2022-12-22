import React from 'react';
import { useEffect, useReducer, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import AdmissionServices from "../../../../api/adminssion/AdmissionServices";
import dlt from "../../../../assets/img/icons/delete.svg";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../../components/alert/tostifyALert";
import Dashboard from "../../../../components/layout/Dashboard";
import SubLoader from "../../../../components/SubLoader";
import { singleAppliedAdmissionList } from "../../../../redux/actions/university/admissionAction";

function StatusEditAdmission() {
  let dispatch = useDispatch();
  const { singleAppliedAdmission } = useSelector((state) => state.admission);

  // console.log("appliedAdmissionListRed :>> ", singleAppliedAdmission.Status);

  const hiddenFileInput = useRef(null);
  const image = useRef(null);
  const { applied, id } = useParams();

  console.log("applied :>> ", applied);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      pageNo: 1,
      image: "",
      logo: "",
      name: "",
      location: "",
      data: null,
    }
  );

  // let style = state.logo ? "1" : "";

  useEffect(() => {
    dispatch(singleAppliedAdmissionList(applied));
  }, []);

  useEffect(() => {
    if (singleAppliedAdmission?.admisssionStatus) {
      let values = singleAppliedAdmission?.admisssionStatus.filter(
        (statusJob) => statusJob.id == id
      );

      // console.log("values :>> ", values);

      setState({
        data: values,
        short_name: values[0].Status_Name,
        description: values[0].Details,
      });
    }
  }, [singleAppliedAdmission]);

  console.log("state.data :>> ", state.data);

  let navigate = useNavigate();
  let dropFunction = (e) => {
    e.preventDefault();
    let file;
    var imageDiv = document.getElementById("imageDiv");
    file = e.dataTransfer.files[0];

    let url = URL.createObjectURL(file);
    image.current.src = url;
    imageDiv.style.zIndex = "0";
  };

  let handleClick = () => {
    hiddenFileInput.current.click();
  };

  let handleChange = (event) => {
    // console.log('hi')
    const target = event.target;
    let value = target.value;
    const name = target.name;
    // image.current.style.visibility = "visible";
    if (name === "logo") {
      const fileUploaded = event.target.files[0];
      // console.log("fileUploaded :>> ", fileUploaded);
      var imageDiv = document.getElementById("imageDiv");
      image.current.src = URL.createObjectURL(fileUploaded);
      imageDiv.style.zIndex = "0";
      setState({ [name]: fileUploaded });
    } else {
      setState({ [name]: value });
    }
  };

  let deleteImg = () => {
    let image = document.getElementById("imageDiv");
    image.style.zIndex = "-1";
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    let inputData = {
      // applied_job_id: status,
      status_name: state.short_name,
      details: state.description,
      file: state.logo,
      // id: id,
    };

    let formdata = new FormData();
    Object.keys(inputData).map((key) => {
      formdata.append(key, inputData[key]);
    });

    const res = await AdmissionServices.updateStatus(formdata, id);
    // console.log("res :>> ", res);
    if (res.status === 200) {
      dispatch(singleAppliedAdmissionList(applied));

      toastifyAlertSuccess(res.data.message, "top-center");
      setTimeout(() => {
        navigate(`/admission/applied/${applied}/status/`);
      }, 2000);
    } else if (res.status === 500) {
      toastifyAlertError(res.data.message, "top-center");
    }
  };

  let module = <SubLoader />;
  if (state.data) {
    // console.log("state.data :>> ", state.data);
    module = (
      <div className="inputs__university">
        <div
          className="image"
          draggable="true"
          id="drop_zone"
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={dropFunction}
        >
          <div className="dlt_image_icon w-100 text-end c_point">
            <img
              onClick={deleteImg}
              className="dlt__icon"
              id="dlt__icon"
              src={dlt}
              alt="dlt"
            />
          </div>

          <div className="text-center my-3">
            <p>Drag & Drop your photo here</p>
            <h5>OR</h5>
            <button onClick={handleClick}>
              <h4>Browse FIle</h4>
            </button>
            <input
              type="file"
              name="logo"
              ref={hiddenFileInput}
              onChange={handleChange}
              // value={state.logo}
              style={{ display: "none" }}
            />
          </div>
          <div className="imageShow" id="imageDiv">
            <img ref={image} id="image" alt="" />
          </div>
        </div>
        {/* <div className="m_top45">
          <label>Status shortxzcsfsdf name</label>
          <input
            type="text"
            className="w-50"
            onChange={handleChange}
            placeholder="Short name"
            value={state.short_name}
            name="short_name"
          />
        </div> */}
        {/* <div className="m_top45">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="w-70"
            value={state.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div> */}
        <div className="my-5">
          <button className="submit_btn" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Dashboard>
        <div className="university create">{module}</div>
        <ToastContainer transition={Zoom} />
      </Dashboard>
    </div>
  );
}

export default StatusEditAdmission;
