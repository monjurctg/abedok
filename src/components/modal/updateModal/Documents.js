import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UniversityServices from "../../../api/adminssion/UniversityServices";
import { loadingState, modalUpdate } from "../../../redux/actions/modalAction";
import { singleUser } from "../../../redux/actions/userAction";
import {
  toastifyAlertError,
  toastifyAlertSuccess
} from "../../alert/tostifyALert";

function Documents({ type }) {
  const { modalUp } = useSelector((state) => state.modalValue);
  let { id } = useParams();
  // let { gradeStoreRed } = useSelector((state) => state.grade);
  let { loadingNow } = useSelector((state) => state.modalValue);
  const { singleUserRed } = useSelector((state) => state.user);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      pp_photos: "",
      nid_photos: "",
      passport_photos: "",
      signature_photos: "",
      nid: "",
      user_id: id,
      certificate_photos_sub:"",
    }
  );

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(singleUser(id));
  }, []);

  

let submitCertificate = async () => {

  let data = {
    user_id: id,
    photos_name: state.photos_name,
    certificate_photos_sub:state.certificate_photos_sub,
  }
  console.log('data', data)
  let formdata = new FormData();
  Object.keys(data).map((key) => {
    formdata.append(key, state[key]);
  });
  const res = await UniversityServices.certificatePhotos(formdata, state.user_id);

  if (res.status === 201) {

    toastifyAlertSuccess("Certificates updated", "top-center");
    dispatch(singleUser(id));
  } else {

    toastifyAlertError("Certificates update error", "top-center");
  }
  // console.log("res :>> ", res);
};
  let handleSubmit = async () => {
    dispatch(loadingState(true));
    let formdata = new FormData();
    Object.keys(state).map((key) => {
      formdata.append(key, state[key]);
    });
    const res = await UniversityServices.photos(formdata, state.user_id);

    if (res.status === 201) {
      dispatch(loadingState(false));

      toastifyAlertSuccess("Documents updated", "top-center");
      dispatch(singleUser(id));
    } else {
      dispatch(loadingState(false));

      toastifyAlertError("Documents update error", "top-center");
    }
    // console.log("res :>> ", res);
  };

  useEffect(() => {
    if (singleUserRed?.data) {
      setState({
        pp_photos: singleUserRed.data.documents?.pp_photos,
        nid_photos: singleUserRed.data.documents?.nid_photos,
        passport_photos: singleUserRed.data.documents?.passport_photos,
        signature_photos: singleUserRed.data.documents?.signature_photos,
        nid: singleUserRed.data.documents?.birth_certificate_photos,
      });
    }
  }, [singleUserRed]);

  let inputChange = (event) => {
    const name = event.target.name;
    const fileUploaded = event.target.files[0];
    setState({ [name]: fileUploaded });
  };

  let crossIcon = () => dispatch(modalUpdate(false));
  return (
    <div className="modal_items">
      <div
        className={`modal_content ${modalUp ? "animation" : "animationOut"} `}
      >
        <div className="modal_header">
          <h5>{type}</h5>
          <button
            type="button"
            id="crossIcon"
            onClick={crossIcon}
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
        {singleUserRed.data ? (
          <div className="modal-body">
            <div>
              <label>Profile Picture</label>

              <input
                className="modal__input my-2"
                // value={state.pp_photos}
                onChange={inputChange}
                name="pp_photos"
                type="file"
              />
            </div>

            <div>
              <label>Nid</label>

              <input
                className="modal__input my-2"
                // value={state.nid_photos}
                onChange={inputChange}
                name="nid_photos"
                type="file"
              />
            </div>
            <div>
              <label>Passport</label>

              <input
                className="modal__input my-2"
                // value={state.passport_photos}
                onChange={inputChange}
                name="passport_photos"
                type="file"
              />
            </div>
            <div>
              <label>Signature</label>

              <input
                className="modal__input my-2"
                // value={state.signature_photos}
                onChange={inputChange}
                name="signature_photos"
                type="file"
              />
            </div>
            <div>
              <label>Birth certificate</label>

              <input
                className="modal__input my-2"
                // value={state.birth_certificate_photos}
                onChange={inputChange}
                name="birth_certificate_photos"
                type="file"
              />
            </div>
            <div>
              <label>Certificate:</label>
              <div className="sss_input">
                <button
                  onClick={() => setState({ photos_name: "J.S.C" })}
                  className={state.photos_name === "J.S.C" ? "active" : ""}
                >
                  J.S.C
                </button>
                <button
                  onClick={() => setState({ photos_name: "S.S.C" })}
                  className={state.photos_name === "S.S.C" ? "active" : ""}
                >
                  S.S.C
                </button>
                <button
                  onClick={() => setState({ photos_name: "H.S.C" })}
                  className={state.photos_name === "H.S.C" ? "active" : ""}
                >
                  H.S.C
                </button>
                <button
                  onClick={() => setState({ photos_name: "GRADUATE" })}
                  className={state.photos_name === "GRADUATE" ? "active" : ""}
                >
                  GRADUATE
                </button>
                <button
                  onClick={() => setState({ photos_name: "POST_GRADUATE" })}
                  className={
                    state.photos_name === "POST_GRADUATE" ? "active" : ""
                  }
                >
                  POST GRADUATE
                </button>
              </div>

              <input
                className="modal__input my-2"
                // value={state.birth_certificate_photos}
                onChange={inputChange}
                name="certificate_photos_sub"
                type="file"
              />

              <button
                type="button"
                onClick={submitCertificate}
                className="btn btn-primary btn__modal"
              >
               Certificates
              </button>
            </div>
            
          </div>
        ) : (
          "Loading......."
        )}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary btn_close"
            data-bs-dismiss="modal"
            onClick={crossIcon}
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary btn__modal"
          >
            {loadingNow ? "Loading........" : type}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Documents;
