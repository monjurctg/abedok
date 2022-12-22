import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalState } from "../../../redux/actions/modalAction";
import { singleUser } from "../../../redux/actions/userAction";
import SubLoader from "../../SubLoader";

function ModalUserShow({ name, modalShow, editName, id }) {
  const { modalCurrent } = useSelector((state) => state.modalValue);
  // console.log('modalCurrent', modalCurrent)
  const { singleUserRed } = useSelector((state) => state.user);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(singleUser(id));
  }, [modalShow, id]);
  // console.log('singleUserRed', singleUserRed)


 
  let districtVal = []
  // if(singleUserRed?.district){
  //  singleUserRed?.district.map(districts=>(
  //     districtVal.push(districts.name)
  //   ))
  // }


  let crossIcon = () => dispatch(modalState(false));
  
  let showData = <SubLoader/>;
  if (singleUserRed?.data) {
    // console.log('singleUserRed', singleUserRed.name)
    showData = (
      <div className="modal_content">
        <div className="modal_header">
          <div className="d-flex">

          <div className="image_modal_profile mWidth">
            <img className="radius" src={singleUserRed?.data?.documents?.pp_photos ||singleUserRed?.data?.photo} alt=""/>
          </div>
          <h5 className="align-self-center mx-2">{singleUserRed?.data?.name}</h5>
          </div>
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
            {/* <div className="col-md-6">
              <div className="showItems">
                <label className="my-2">User name:</label>
                <h4>{singleUserRed?.data?.name}</h4>
              </div>
            </div> */}
            <div className="col-md-6 showItems">
              <label className="my-2">Email:</label>
              <h4>{singleUserRed.data?.email || "no email"}</h4>
            </div>

            <div className="col-md-6 showItems">
              <label className="my-2">Phone:</label>
              <h4>{singleUserRed.data?.phone || "No phone"}</h4>
            </div>
          
            <div className="col-md-6 showItems">
              <label className="my-2"> District:</label>
              <h4>{singleUserRed?.data?.Address[0]?.district?.name || "No address"}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2"> Post Office:</label>
              <h4>{singleUserRed?.data?.Address[0]?.post_office?.name || "No post office"}</h4>
            </div>

            <div className="col-md-6 showItems">
              <label className="my-2"> Postal code:</label>
              <h4>{singleUserRed?.data?.Address[0]?.postal_code || "No postal code"}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Present Postal code:</label>
              <h4>{singleUserRed?.data?.Address[0]?.postal_code || "No postal code"}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Present upazila:</label>
              <h4>{singleUserRed?.data?.Address[0]?.upazila?.name || "No upazila"}</h4>
            </div>
            
            <div className="col-md-6 showItems">
              <label className="my-2">Balance:</label>
              <h4>{singleUserRed.data?.balance || 0}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Skills:</label>
              <h4>{singleUserRed.data?.Skills[0]?.name || "No skill"}</h4>
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

export default ModalUserShow;
