import React, { memo, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import DepartmentServices from "../../api/job/DepartmentServices";
import {
  editDepartment,
  saveDepartment,
} from "../../redux/actions/job/departmentAction";
import { loadingState, modalState } from "../../redux/actions/modalAction";

export const DepartmentModal = ({ name, modalShow, editName, id }) => {
  const { modalCurrent } = useSelector((state) => state.modalValue);

  // let { gradeStoreRed } = useSelector((state) => state.grade);
  let { loadingNow } = useSelector((state) => state.modalValue);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      image: "",
    }
  );

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    if (name === "image") {
      const fileUploaded = e.target.files[0];
      setState({ [name]: fileUploaded });
      //   dispatch(inputV(fileUploaded));
    } else {
      setState({ [name]: value });
    }
  };

  useEffect(() => {
    setState({ name: editName });
  }, [editName]);

  let handleSubmit = async () => {
    dispatch(loadingState(true));
    // console.log("inputValue :>> ", inputValue);
    let data = { name: state.name, image: state.image };
    // console.log("data :>> ", data);
    let formdata = new FormData();
    Object.keys(data).map((key) => {
      formdata.append(key, data[key]);
    });

    if (modalShow === "create") {
      dispatch(loadingState(false));
      let res = await DepartmentServices.store(formdata);
      if (res.status === 201) {
        dispatch(saveDepartment(res.data));
        setState({ name: "", image: "" });
      }
      //
      else {
        dispatch(saveDepartment(res.data));
      }
    } else if (modalShow === "edit") {
      let res = await DepartmentServices.update(formdata, id);
      if (res.status === 201) {
        dispatch(loadingState(false));
        dispatch(editDepartment(res.data));
        setState({ name: "", image: "" });
      }
      //
      else {
        dispatch(editDepartment(res.data));
      }
    }
    // console.log("data :>> ", formdata);
    // modalShow === "create"
    //   ? dispatch(saveDepartment(formdata))
    //   : dispatch(editDepartment({ formdata }));
  };
  // console.log('inputValue', inputValue)

  let dispatch = useDispatch();
  // console.log('modalShow', modalShow)
  let headingValue = "";
  if (modalShow === "create") {
    headingValue = `Add ${name}`;
  } else if (modalShow === "edit") {
    headingValue = `Edit ${editName}`;
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
              value={state.name}
              onChange={inputChange}
              name="name"
              type="text"
              placeholder={headingValue}
            />
            {/* {name === "Department" ? ( */}
            <input
              className="modal__input"
              //   value={state.image}
              onChange={inputChange}
              name="image"
              type="file"
              //   placeholder={headingValue}
            />
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
};

// export const DepartmentModal;

export const MemoDepartmentModal = memo(DepartmentModal);
