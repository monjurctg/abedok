import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import UniversityServices from "../../../api/adminssion/UniversityServices";
import dlt from "../../../assets/img/icons/delete.svg";
import { toastifyAlertSuccess } from "../../../components/alert/tostifyALert";

function UploadDocument() {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      pp_photos: "",
      signature_photos: "",
      birth_certificate_photos: "",
      nid_photos: "",
      photos_name: "",
      passport_photos: "",
      certificate_photos_sub: "",
      names: [
        "Profile Photo",
        "Signature",
        "Birth Certificate",
        "Nid",
        "S.S.C",
      ],
    }
  );

  let { id } = useParams();
  let handleClick = (type) => {
    let btn_main = document.getElementById("btn_main" + type);
    btn_main.click();
  };

  let handleChange = (event, type) => {
    let image = document.getElementById("image_main" + type);
    const name = event.target.name;
    // console.log("name", name);
    image.style.visibility = "visible";
    const fileUploaded = event.target.files[0];
    // console.log("fileUploaded", fileUploaded);
    setState({ [name]: fileUploaded });
    var imageDiv = document.getElementById("imageDiv" + type);
    let btn__div = document.getElementById("btn__div" + type);
    image.src = URL.createObjectURL(fileUploaded);
    imageDiv.style.zIndex = "0";
    btn__div.style.opacity = "0";
  };

  let dropFunction = (e, type, name) => {
    e.preventDefault();
    console.log("e", name);
    let file;
    var imageDiv = document.getElementById("imageDiv" + type);
    let btn__div = document.getElementById("btn__div" + type);
    let image = document.getElementById("image_main" + type);
    file = e.dataTransfer.files[0];
    let url = URL.createObjectURL(file);
    image.src = url;
    imageDiv.style.zIndex = "0";
    btn__div.style.opacity = "0";
    let nowVal =
      name === "Profile Photo"
        ? "pp_photos"
        : name === "Signature"
        ? "signature_photos"
        : name === "Birth Certificate"
        ? "birth_certificate_photos"
        : name === "Nid"
        ? "nid_photos"
        : name === "Passport"
        ? "passport_photos"
        : name === "S.S.C"
        ? "certificate_photos_sub"
        : "";
    setState({ [nowVal]: file });
  };

  let deleteImg = (index) => {
    let image = document.getElementById("image_main" + index);
    let btn__div = document.getElementById("btn__div" + index);
    image.style.zIndex = "-1";
    image.style.visibility = "hidden";
    btn__div.style.opacity = "1";
  };

  let handleSubmit = async (name) => {
    // console.log('state.passport_photos', state.passport_photos)
    
    if (state.photos_name) {
      // console.log("state.photos_name", state.photos_name);
      let inputData = {
        user_id: id,
        photos_name: state.photos_name,
        certificate_photos_sub: state.certificate_photos_sub,
      };

      // console.log('inputData', inputData)

      let formdata = new FormData();
      Object.keys(inputData).map((key) => {
        formdata.append(key, inputData[key]);
      });
      const res = await UniversityServices.certificatePhotos(formdata);
      // console.log('res.data', res.data)
      if (res.status === 201) {
        toastifyAlertSuccess(res?.data?.message, "top-center");
      } else if (res?.data?.message === "Photo  Update Successfully") {
        toastifyAlertSuccess("Photo Updated Successfully", "top-center");
      }
      // console.log("inputData :>> ", inputData);
    } else if(!state.certificate_photos_sub) {
      let nowVal =
        name === "Profile Photo"
          ? "pp_photos"
          : name === "Signature"
          ? "signature_photos"
          : name === "Birth Certificate"
          ? "birth_certificate_photos"
          : name === "Nid"
          ? "nid_photos"
          : name === "Passport"
          ? "passport_photos"
          : name === "S.S.C"
          ? state.photos_name
          : "";
      // console.log("nowVal", nowVal);

      let inputData = {
        user_id: id,
        // photos_name:state.photos_name,
        [nowVal]:
          nowVal === "pp_photos"
            ? state.pp_photos
            : nowVal === "signature_photos"
            ? state.signature_photos
            : nowVal === "birth_certificate_photos"
            ? state.birth_certificate_photos
            : nowVal === "nid_photos"
            ? state.passport_photos
            : nowVal === "passport_photos",
      };

      let formdata = new FormData();
      Object.keys(inputData).map((key) => {
        formdata.append(key, inputData[key]);
      });
      const res = await UniversityServices.photos(formdata);
      // console.log('res.data', res.data)
      if (res.status === 201) {
        toastifyAlertSuccess(res?.data?.message, "top-center");
        setState({photos_name:""})
      } else if (res?.data?.message === "Photo  Update Successfully") {
        setState({photos_name:""})
        toastifyAlertSuccess("Photo Updated Successfully", "top-center");
      }
    }
    // console.log("res", res);
  };

  let documents = "";
  if (state.names) {
    let inputName;
    documents = state.names.map((name, index) => {
      // console.log("name", name);
      inputName =
        name === "Profile Photo"
          ? "pp_photos"
          : name === "Signature"
          ? "signature_photos"
          : name === "Birth Certificate"
          ? "birth_certificate_photos"
          : name === "Nid"
          ? "nid_photos"
          : name === "S.S.C"
          ? "certificate_photos_sub"
          : "";

      return (
        <div key={index} className="col-md-6">
          <div className="upload__border">
            {name === "S.S.C" ? (
              <div className="sss_input">
                {/* <input
                  type={"text"}
                  name={"photos_name"}
                  value={state.photos_name}
                  placeholder="Certificate"
                  onChange={(e) => setState({ photos_name: e.target.value })}
                /> */}
                <button onClick={()=>setState({photos_name:"J.S.C"})} className={state.photos_name === 'J.S.C'? "active":""}>J.S.C</button>
                <button onClick={()=>setState({photos_name:"S.S.C"})} className={state.photos_name === 'S.S.C'? "active":""}>S.S.C</button>
                <button onClick={()=>setState({photos_name:"H.S.C"})} className={state.photos_name === 'H.S.C'? "active":""}>H.S.C</button>
                <button onClick={()=>setState({photos_name:"GRADUATE"})} className={state.photos_name === 'GRADUATE'? "active":""}>GRADUATE</button> 
                <button onClick={()=>setState({photos_name:"POST_GRADUATE"})} className={state.photos_name === 'POST_GRADUATE'? "active":""}>POST GRADUATE</button> 
              </div>
            ) : (
              <h2 className="py-3">{name}</h2>
            )}
            <div
              className="inner py-3"
              id={`imageDiv${index + 1}`}
              draggable="true"
              // id="drop_zone"
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => dropFunction(e, index + 1, name)}
            >
              <div
                className="text-center my-3 relative"
                id={`btn__div${index + 1}`}
              >
                <p>Drag & Drop your photo here</p>
                <h5>OR</h5>
                <button onClick={() => handleClick(index + 1)}>
                  <h4>Browse FIle</h4>
                </button>
                <input
                  type="file"
                  name={inputName}
                  id={`btn_main${index + 1}`}
                  onChange={(e) => handleChange(e, index + 1)}
                  // value={state.logo}
                  style={{ display: "none" }}
                />
              </div>
              <div className="image">
                <img id={`image_main${index + 1}`} />
                <img
                  onClick={() => deleteImg(index + 1)}
                  className="dlt__icon"
                  id="dlt__icon"
                  src={dlt}
                  alt="dlt"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                className="upload__btn my-4"
                onClick={() => handleSubmit(name)}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="upload__document">
      <div className="row gy-5">{documents}</div>
      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default UploadDocument;
