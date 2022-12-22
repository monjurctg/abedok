import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalState } from "../../redux/actions/modalAction";

function MainModal({ name, modalShow, inputChange, handleSubmit,editName, }) {
  let { inputValue } = useSelector((state) => state.inputVal);
  const { modalCurrent } = useSelector((state) => state.modalValue);


  let dispatch = useDispatch();
// console.log('modalShow', modalShow)

  let crossIcon = () => dispatch(modalState(false));
  
  return (
    <div className={`modal_self ${modalCurrent ? "show" : ""}`} id="main_div">
      <div className="modal_items">
        <div className="modal_content">
          <div className="modal_header">
            <h5>ROll</h5>
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
              placeholder={"Add roll"}
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
             Add roll
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainModal;
