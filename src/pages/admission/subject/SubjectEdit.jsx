import React, { useEffect, useMemo, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import MajorServices from "../../../api/adminssion/MajorServices";
import dlt_new from "../../../assets/img/icons/dlt_new.svg";
import edit_new from "../../../assets/img/icons/edit_new.svg";
import {
  toastifyAlertDelete,
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import ModalDesign from "../../../components/modal/ModalDesign";
import PermissionCheck from "../../../components/PermissionCheck";
import SubLoader from "../../../components/SubLoader";
import { major } from "../../../constants/rolePermission";
import { inputV } from "../../../redux/actions/inputAction";
import { loadingState, modalState } from "../../../redux/actions/modalAction";
import { groupAll } from "../../../redux/actions/university/groupAction";
import {
  editMajor,
  majorList,
  saveMajor,
} from "../../../redux/actions/university/majorAction";
import {
  editSubject,
  singleSubjectList,
} from "../../../redux/actions/university/subjectAction";

function SubjectEdit() {
  const { singleSubject, subjectEditRed } = useSelector(
    (state) => state.subject
  );
  const { majorData, storeMajor, majorEdit } = useSelector(
    (state) => state.major
  );

  let { inputValue } = useSelector((state) => state.inputVal);
  let { groupAllRed } = useSelector((state) => state.group);

  // console.log("groupAllRed :>> ", groupAllRed);
  let { id, pageNo } = useParams();
  let dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      pageNo: 1,
      modalShow: false,
      majorid: "",
      group_id: "",
    }
  );

  useEffect(() => {
    dispatch(singleSubjectList(id));
    dispatch(groupAll());
  }, []);

  useMemo(() => {
    // console.log("SubjectEdit :>> ", subjectEditRed);
    if (subjectEditRed.status === 201) {
      dispatch(singleSubjectList(id));
      toastifyAlertSuccess(subjectEditRed.data.message, "top-center");
      setState({ name: "" });
      dispatch(editSubject());
    } else if (subjectEditRed.status === 422) {
      toastifyAlertError(subjectEditRed.data.errors.name[0], "top-center");
    }
  }, [subjectEditRed]);

  useMemo(() => {
    dispatch(loadingState(false));
    if (storeMajor?.message === "Major create Successfully") {
      dispatch(singleSubjectList(id));
      toastifyAlertSuccess(SubjectEdit.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (storeMajor?.errors) {
      // console.log("storeMajor :>> ", storeMajor.errors.name);

      toastifyAlertError(storeMajor?.errors.name[0], "top-center");
    }
  }, [storeMajor]);

  useMemo(() => {
    // console.log("majorEdit :>> ", majorEdit);
    if (majorEdit?.message === "Major update Successfully") {
      dispatch(singleSubjectList(id));
      toastifyAlertSuccess(majorEdit.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (majorEdit?.errors) {
      toastifyAlertError(majorEdit.errors.name[0], "top-center");
    }
  }, [majorEdit]);

  useEffect(() => {
    dispatch(majorList());
  }, []);
  // console.log("singleSubject :>> ", singleSubject);
  let handleSubmit = () => {
    dispatch(loadingState(true));
    if (state.modalShow === "create") {
      dispatch(saveMajor({ name: inputValue, subject_id: id }));
    } else {
      dispatch(
        editMajor({ name: inputValue, id: state.majorid, subject_id: id })
      );
    }
  };

  let editSubjectValue = () => {
    // setState({ modalState: editSubject });
    dispatch(
      editSubject({ name: state.name, id: id, group_id: state.group_id })
    );
  };

  let inputChange = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setState({ [name]: value });
    dispatch(inputV(value));
  };

  let groupOptions = <SubLoader />;
  if (groupAllRed?.data) {
    groupOptions = groupAllRed?.data.map((group, index) => (
      <option value={group.id} key={index}>
        {group.name}
      </option>
    ));
  }
  /////major crud
  let createButtonClicked = () => {
    setState({ modalShow: "create" });
    dispatch(modalState(true));
  };

  let editButtonClickedMajor = (majorid, editName) => {
    // console.log("object :>> ", editName);
    setState({ modalShow: "edit", majorid: majorid, editName: editName });
    dispatch(modalState(true));
  };
  let deletepassingYear = async (majorid) => {
    let res = await MajorServices.delete(majorid);
    // console.log("res :>> ", res);
    if (res.message === "Major Delete Successfully") {
      // console.log("examData", examData);
      dispatch(singleSubjectList(id));
      toastifyAlertDelete(res.message, "top-center");
    }
  };

  /////major crud finished

  let majorTable = <SubLoader />;
  if (singleSubject?.data?.majors) {
    majorTable = singleSubject?.data?.majors.map((majorss) => (
      <tr>
        <td>
          <div className="td_details">
            <div>
              <h4 className="text-center">{majorss.name}</h4>
            </div>
          </div>
        </td>

        <td>
          <div className="d-flex justify-content-around">
            <PermissionCheck permission={major.delete}>
              <img
                src={dlt_new}
                className="c_point"
                onClick={() => deletepassingYear(majorss.id)}
                alt=""
              />
            </PermissionCheck>
            <PermissionCheck permission={major.edit}>
              <img
                src={edit_new}
                className="c_point"
                alt=""
                onClick={() => {
                  editButtonClickedMajor(majorss.id, majorss.name);
                }}
              />
            </PermissionCheck>
          </div>
        </td>
      </tr>
    ));
  }
  return (
    <div>
      <Dashboard>
        <PermissionCheck permission={major.access} module={"Majore"}>
          <div className="university create">
            <div className="inputs__university">
              <div>
                <label>Subject name</label>
                <input
                  type="text"
                  className="w-50"
                  onChange={inputChange}
                  value={state.name}
                  name={"name"}
                  placeholder={`Edit ${singleSubject?.data?.name}`}
                />
                <div>
                  <select
                    className="w-50 mt-4"
                    style={{ padding: "16px", border: "none" }}
                    name={"group_id"}
                    onChange={inputChange}
                  >
                    <option disabled selected>
                      Group
                    </option>
                    {groupOptions}
                  </select>
                </div>
              </div>

              <div className="my-4 w-50 text-center" onClick={editSubjectValue}>
                <button className="submit_btn">Edit Changes</button>
              </div>
            </div>

            <div className="university__list my-4 w-50">
              <div className="my-3 university_texts">
                <h3 className="w-50">Major List</h3>
                <div className="text-end create_btn">
                  <PermissionCheck permission={major.create}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={createButtonClicked}
                    >
                      <p>+ Create Major</p>
                    </button>
                  </PermissionCheck>
                </div>

                <ModalDesign
                  name={"Major"}
                  id={id}
                  handleSubmit={handleSubmit}
                  inputChange={inputChange}
                  modalShow={state.modalShow}
                  editName={state.editName}
                />
              </div>
              <div className="university__details">
                <table className="">
                  <tr>
                    <th className="text-center" style={{ width: "45%" }}>
                      Major name
                    </th>

                    <th className="text-center" style={{ width: "10%" }}>
                      Actions
                    </th>
                  </tr>
                  {majorTable}
                </table>
              </div>
            </div>
            <ToastContainer transition={Zoom} />
          </div>
        </PermissionCheck>
      </Dashboard>
    </div>
  );
}

export default SubjectEdit;
