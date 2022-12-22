import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, Zoom } from 'react-toastify';

function EditModal({name,inputChange,handleSubmit,type}) {
    let { editValue } = useSelector((state) => state.inputVal);
  return (
    <div
    className="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Edit {name}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div className="modal-body">
          {type ? (
            <textarea
              className="modal__input"
              value={editValue}
              onChange={inputChange}
              name="editValue"
              type="text"
              placeholder={`Edit ${name}`}
            ></textarea>
          ) : (
            <input
              className="modal__input"
              value={editValue}
              onChange={inputChange}
              name="editValue"
              type="text"
              placeholder={`Edit ${name}`}
            />
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary btn_close"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary btn__modal"
          >
            Edit {name}
          </button>
        </div>
      </div>
    </div>
    <ToastContainer transition={Zoom} />
  </div>
  )
}

export default EditModal