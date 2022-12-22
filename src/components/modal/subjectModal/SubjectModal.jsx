import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import { loadingState, modalState } from "../../../redux/actions/modalAction";
import { groupAll } from "../../../redux/actions/university/groupAction";
import {
  editSubject,
  saveSubject,
} from "../../../redux/actions/university/subjectAction";
import { toastifyAlertError } from "../../alert/tostifyALert";

function SubjectModal({ name, modalShow, editName, id }) {
  const { modalCurrent } = useSelector((state) => state.modalValue);
  const { groupAllRed } = useSelector((state) => state.group);
  let { storeSubject } = useSelector((state) => state.subject);
  // let { subjectEdit } = useSelector((state) => state.subject);
  let { loadingNow } = useSelector((state) => state.modalValue);

  // console.log("storeSubject :>> ", storeSubject);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      group_id: "",
    }
  );

  let dispatch = useDispatch();
  // console.log("modalShow", modalShow);
  useEffect(() => {
    dispatch(groupAll());
  }, [storeSubject]);

  let headingValue = "";
  if (modalShow === "create") {
    headingValue = `Add ${name}`;
  } else if (modalShow === "edit") {
    headingValue = `Edit ${editName}`;
  }
  let crossIcon = () => dispatch(modalState(false));

  let inputChange = (e) => {
    // e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    setState({ [name]: value });
  };
  let handleSubmit = (e) => {
    dispatch(loadingState(true));

    e.preventDefault();
    let values = {
      name: state.name,
      group_id: state.group_id,
      id: id || null,
    };
    if (values.group_id) {
      modalShow === "create"
        ? dispatch(saveSubject(values))
        : dispatch(editSubject(values));
    } else {
      toastifyAlertError("You didn't selected group", "top-center");
    }
    // console.log("values :>> ", values);
  };

  let groupSelect = "";

  if (groupAllRed?.data) {
    groupSelect = groupAllRed.data.map((group, index) => (
      <option value={group.id} key={index}>
        {group.name}
      </option>
    ));
  }

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
              value={state.name}
              onChange={inputChange}
              name="name"
              type="text"
              placeholder={headingValue}
            />

            <select
              className="modal__input mt-3"
              onChange={inputChange}
              name="group_id"
            >
              <option disabled selected>
                Group
              </option>
              {groupSelect}
            </select>
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
              {loadingNow ? "Saving..." : headingValue}
            </button>
          </div>
          <ToastContainer transition={Zoom} />
        </div>
      </div>
    </div>
  );
}

export default SubjectModal;
