import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singlejobCircularList } from "../../../redux/actions/job/jobCircularAction";
import { modalState } from "../../../redux/actions/modalAction";
import SubLoader from "../../SubLoader";

function ModalJobCircularShow({ name, modalShow, editName, id }) {
  const { modalCurrent } = useSelector((state) => state.modalValue);
  const { singleJobRed } = useSelector((state) => state.jobCircular);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(singlejobCircularList(id));
  }, [modalShow, id]);
  // console.log('singleJobRed', singleJobRed)


 
  let districtVal = []
  // if(singleJobRed?.district){
  //  singleJobRed?.district.map(districts=>(
  //     districtVal.push(districts.name)
  //   ))
  // }


  let crossIcon = () => dispatch(modalState(false));
  
  let showData = <SubLoader/>;
  if (singleJobRed?.name) {
    // console.log('singleJobRed', singleJobRed.name)
    showData = (
      <div className="modal_content">
        <div className="modal_header">
          <h5>{singleJobRed?.name}</h5>
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
                <label className="my-2">Job name:</label>
                <h4>{singleJobRed.name}</h4>
              </div>
            </div>

            <div className="col-md-6 showItems">
              <label className="my-2">District:</label>
              <h4>{districtVal}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Status:</label>
              <h4>{singleJobRed.status}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Application start:</label>
              <h4>{singleJobRed.start_time}</h4>
            </div>

            <div className="col-md-6 showItems">
              <label className="my-2">Application end:</label>
              <h4>{singleJobRed.end_time}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Department name:</label>
              <h4>{singleJobRed.department.name}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Grade name:</label>
              <h4>{singleJobRed.grade.name}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Application fee:</label>
              <h4>{singleJobRed.fee}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Age:</label>
              <h4>{singleJobRed.min_age ? `${singleJobRed.min_age}-${singleJobRed.max_age}`: singleJobRed.max_age}</h4>
            </div>

            <div className="col-md-6 showItems">
              <label className="my-2">Seat:</label>

              <h4>{singleJobRed.sit}</h4>
            </div>

            <div className="col-md-6 showItems">
              <label className="my-2">Post:</label>

              <h4>{singleJobRed?.post?.name || "No post"}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Skill:</label>

              <h4>{singleJobRed?.skill || "No Skill"}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Experience:</label>

              <h4>{singleJobRed?.experience+"year" || "No Experience"}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Service fee:</label>

              <h4>{singleJobRed?.service_fee || "No Fee"}</h4>
            </div>
            
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
        {showData}
      </div>
    </div>
  );
}

export default ModalJobCircularShow;
