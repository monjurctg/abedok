import React, { useEffect, useMemo, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { modalState } from "../../redux/actions/modalAction";
import {
  editRoleData,
  roleList,
  roleSave,
  singleRoleList,
} from "../../redux/actions/roleAction";

function RoleDesign({ name, modalShow, editName, id }) {
  const { modalCurrent } = useSelector((state) => state.modalValue);
  const { roleListRed, singleRoleRed } = useSelector((state) => state.role);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: "",
      permissions: [],
      id: "",
      editName: "",
      pageNo: 1,
    }
  );

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(roleList());
  }, []);

  useMemo(() => {
    if (id) {
      dispatch(singleRoleList(id));
    }
  }, [id]);

  useMemo(() => {
    let permissionData = [];
    if (singleRoleRed) {
      singleRoleRed.role_permission.permissions.map((permission) => {
        return permissionData.push(permission.id);
      });
      setState({
        name: singleRoleRed.role_permission.name,
        permissions: permissionData,
      });
    }
  }, [singleRoleRed]);
  // console.log("singleRoleRed", singleRoleRed);

  let headingValue = "";
  if (modalShow === "create") {
    headingValue = `Add ${name}`;
  } else if (modalShow === "edit") {
    headingValue = `Edit ${editName}`;
  }
  let crossIcon = () => dispatch(modalState(false));

  let roleValues = [];
  let val = {};
  if (roleListRed?.permissions_all) {
    roleListRed.permissions_all.map((district) => {
      val = { label: district.name, value: district.id };
      roleValues.push(val);
      return roleValues;
    });
  }
  let inputChange = (e) => {
    e.preventDefault();
    let name = e.target.name;

    let value = e.target.value;
    setState({ [name]: value });
  };

  const handleRoleChange = (options) => {
    // console.log(options);
    const districtArray = [];
    options.map((option) => districtArray.push(option.value));
    setState({
      permissions: districtArray,
    });
  };

  let handleSubmit = () => {
    modalShow === "create"
      ? dispatch(roleSave({ name: state.name, permissions: state.permissions }))
      : dispatch(
          editRoleData({
            name: state.name,
            permissions: state.permissions,
            id: id,
          })
        );
  };

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
          {id ? (
            <div className="modal-body">
              <input
                className="modal__input mb-3"
                value={state.name}
                onChange={inputChange}
                name="name"
                type="text"
                placeholder={headingValue}
              />
              <Select
                options={roleValues}
                placeholder={"Select Permissions"}
                //   className="modal__input"
                isMulti={true}
                name={"permissions"}
                onChange={handleRoleChange}
              />
              {/* )} */}
            </div>
          ) : (
            <div className="modal-body">
              <input
                className="modal__input mb-3"
                value={state.name}
                onChange={inputChange}
                name="name"
                type="text"
                placeholder={headingValue}
              />
              <Select
                options={roleValues}
                placeholder={"Select Permissions"}
                //   className="modal__input"
                isMulti={true}
                name={"permissions"}
                onChange={handleRoleChange}
              />
              {/* )} */}
            </div>
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
              {headingValue}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleDesign;
