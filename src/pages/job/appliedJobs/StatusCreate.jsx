import React, { useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import JobApplyServices from "../../../api/job/JobApplied";
import fileSuccess from "../../../assets/img/fileSuccess.png";
import dlt from "../../../assets/img/icons/delete.svg";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";

function StatusCreate() {
  const hiddenFileInput = useRef(null);
  const image = useRef(null);
  const { status } = useParams();

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

  let dropFunction = (e) => {
    e.preventDefault();
    let file;
    var imageDiv = document.getElementById("imageDiv");
    file = e.dataTransfer.files[0];
    let fileExtension = file.name.split(".").pop();
    if (fileExtension === "pdf") {
      // console.log("file :>> ", file);
    } else {
      let url = URL.createObjectURL(file);
      image.current.src = url;
      imageDiv.style.zIndex = "0";
    }
    setState({ logo: file });
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
      let fileExtension = fileUploaded.name.split(".").pop();
      let createUrl = URL.createObjectURL(fileUploaded);
      var imageDiv = document.getElementById("imageDiv");

      if (fileExtension === "pdf") {
        image.current.src = fileSuccess;
        imageDiv.style.zIndex = "0";
      } else {
        image.current.src = createUrl;
        imageDiv.style.zIndex = "0";
      }
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
      short_name: state.short_name,
      map: state.map,
      description: state.description,
      file: state.logo,
      // id: id,
    };

    let formdata = new FormData();
    Object.keys(inputData).map((key) => {
      formdata.append(key, inputData[key]);
    });

    const res = await JobApplyServices.storeStatus(formdata, status);
    // console.log("res :>> ", res);
    if (res.status === 201) {
      // dispatch(universityList());
      toastifyAlertSuccess(res.data.message, "top-center");
      // setTimeout(() => {
      //   navigate("/admission/university");
      // }, 2000);
    } else if (res.status === 500) {
      toastifyAlertError(res.data.message, "top-center");
    }
  };

  let module = (
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
      <div className="m_top45">
        <label>Status short name</label>
        <input
          type="text"
          className="w-50"
          onChange={handleChange}
          placeholder="Short name"
          value={state.short_name}
          name="short_name"
        />
      </div>
      <div className="m_top45">
        <label>Description</label>
        <input
          type="text"
          name="description"
          className="w-70"
          value={state.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>
      <div className="m_top45">
        <label>Map</label>
        <input
          type="text"
          name="map"
          className="w-70"
          value={state.map}
          onChange={handleChange}
          placeholder="Map"
        />
      </div>
      <div className="my-5 text-center">
        <button className="submit_btn" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Dashboard>
        <div className="university create">{module}</div>
        <ToastContainer transition={Zoom} />
      </Dashboard>
    </div>
  );
}

export default StatusCreate;
