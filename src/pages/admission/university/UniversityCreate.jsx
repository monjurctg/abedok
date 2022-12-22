import React, { useReducer, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import UniversityServices from "../../../api/adminssion/UniversityServices";
import dlt from "../../../assets/img/icons/delete.svg";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import { loadingState } from "../../../redux/actions/modalAction";
import { universityList } from "../../../redux/actions/university/universityAction";

function UniversityCreate() {
  let dispatch = useDispatch();

  const hiddenFileInput = useRef(null);
  const image = useRef(null);
  let { loadingNow } = useSelector((state) => state.modalValue);

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
    }
  );

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
    dispatch(loadingState(true));
    let inputData = {
      name: state.name,
      location: state.location,
      logo: state.logo,
    };

    // console.log("object :>> ", inputData);

    let formdata = new FormData();
    Object.keys(inputData).map((key) => {
      formdata.append(key, inputData[key]);
    });
    // console.log("formdata :>> ", formdata);

    const res = await UniversityServices.store(formdata);
    // console.log("res :>> ", res);
    if (res.status === 201) {
      dispatch(loadingState(false));
      dispatch(universityList());
      toastifyAlertSuccess(res.data.message, "top-center");
      setTimeout(() => {
        navigate("/admission/university");
      }, 2000);
    } else if (res.status === 422) {
      dispatch(loadingState(false));
      toastifyAlertError(res.data.errors.name[0], "top-center");
    }
  };
  return (
    <div>
      <Dashboard>
        <div className="university create">
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
              {/* ) : (
                ""
              )} */}
              <div className="imageShow" id="imageDiv">
                <img ref={image} id="image" alt="" />
              </div>
            </div>
            <div className="m_top45">
              <label>University name</label>
              <input
                type="text"
                className="w-50"
                onChange={handleChange}
                placeholder="University name"
                name="name"
              />
            </div>
            <div className="m_top45">
              <label>University Location</label>
              <input
                type="text"
                name="location"
                className="w-70"
                onChange={handleChange}
                placeholder="Location"
              />
            </div>

            <div className="my-5 text-center">
              <button className="submit_btn" onClick={handleSubmit}>
                {loadingNow ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
        <ToastContainer transition={Zoom} />
      </Dashboard>
    </div>
  );
}

export default UniversityCreate;
