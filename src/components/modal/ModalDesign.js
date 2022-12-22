import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalState } from "../../redux/actions/modalAction";

function ModalDesign({ name, modalShow, inputChange, handleSubmit,editName, }) {
  const { modalCurrent } = useSelector((state) => state.modalValue);
  // let { gradeStoreRed } = useSelector((state) => state.grade);
  let { loadingNow } = useSelector((state) => state.modalValue);
  // console.log('loadingNow', loadingNow)


  // console.log('gradeStoreRed', gradeStoreRed)
  let { inputValue } = useSelector((state) => state.inputVal);
  // console.log('inputValue', inputValue)



  let dispatch = useDispatch();
// console.log('modalShow', modalShow)
let headingValue = ""
if(modalShow === "create"){
  headingValue = `Add ${name}`
}else if(modalShow === "edit"){
  headingValue = `Edit ${editName}`
}
  let crossIcon = () => dispatch(modalState(false));
  
  return (
    <div className={`modal_self ${modalCurrent ? "show" : ""}`} id="main_div">
      <div className="modal_items">
        <div className="modal_content">
          <div className="modal_header">
            <h5>{headingValue}</h5>
            <button
              type="button"
              id="crossIcon"
              onClick={crossIcon}
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <input
              className="modal__input"
              value={inputValue}
              onChange={inputChange}
              name="text"
              type="text"
              placeholder={headingValue}
            />
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
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary btn__modal"
            >
             {loadingNow ? "Loading........" : headingValue}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDesign;
