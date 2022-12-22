import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalState } from "../../../redux/actions/modalAction";
import { singleAdminssionList } from "../../../redux/actions/university/admissionAction";

function ModalAdmissionShow({ name, modalShow, editName, id }) {
  const { modalCurrent } = useSelector((state) => state.modalValue);
  const { singleAdmissionRed } = useSelector((state) => state.admission);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(singleAdminssionList(id));
  }, [modalShow, id]);
  let crossIcon = () => dispatch(modalState(false));
  
  let singleModule = "";
  if (singleAdmissionRed) {
    console.log("modalShow", singleAdmissionRed.name);
    singleModule = (
      <div className="modal_content">
        <div className="modal_header">
          <h5>{singleAdmissionRed?.name}</h5>
          <button
            type="button"
            id="crossIcon"
            onClick={crossIcon}
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal_body">
          <div className="row my-4 gy-1">
            <div className="col-md-6">
              <div className="showItems">
                <label className="my-2">Admission name:</label>
                <h4>{singleAdmissionRed?.name}</h4>
              </div>
            </div>

            {/* <div className="col-md-6 showItems">
              <label className="my-2">University:</label>
              <h4>{singleAdmissionRed?.university}</h4>
            </div> */}
            {/* <div className="col-md-6 showItems">
              <label className="my-2">Status:</label>
              <h4>{singleAdmissionRed?.status}</h4>
            </div> */}
            <div className="col-md-6 showItems">
              <label className="my-2">Application start:</label>
              <h4>{singleAdmissionRed?.application_start}</h4>
            </div>

            <div className="col-md-6 showItems">
              <label className="my-2">Application end:</label>
              <h4>{singleAdmissionRed?.application_end}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Exam Time:</label>
              <h4>{singleAdmissionRed?.exam_time}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Application fee:</label>
              <h4>{singleAdmissionRed?.application_fee}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Min gpa:</label>
              <h4>{singleAdmissionRed?.min_gpa}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Min gpa total:</label>

              <h4>{singleAdmissionRed?.min_gpa_total}</h4>
            </div>

            <div className="col-md-6 showItems">
              <label className="my-2">Seat:</label>

              <h4>{singleAdmissionRed?.seat}</h4>
            </div>

            {/* <div className="col-md-5">
              <label class="btn btn-outline-primary" for="btn-check-outlined">
                Quota
              </label>
              <br />
            </div> */}
          </div>

          {/* )} */}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary btn_close"
            data-bs-dismiss="modal"
            onClick={crossIcon}
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className={`modal_self ${modalCurrent ? "show" : ""}`} id="main_div">
      <div className="modal_items" style={{ maxWidth: "50%" }}>
        {singleModule}
      </div>
    </div>
  );
}

export default ModalAdmissionShow;
