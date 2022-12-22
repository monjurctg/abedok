import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoleServices from "../../api/RoleServices";
import dlt_new from "../../assets/img/icons/dlt_new.svg";
import edit_new from "../../assets/img/icons/edit_new.svg";
import { toastifyAlertDelete } from "../../components/alert/tostifyALert";
import Dashboard from "../../components/layout/Dashboard";
import { modalState } from "../../redux/actions/modalAction";
import { roleList } from "../../redux/actions/roleAction";
import InputRole from "./InputRole";

function RoleIndex() {
  const { roleListRed } = useSelector((state) => state.role);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      pageNo: 1,
      searchName: "",
      searchValue: [],
      search: false,
    }
  );

  let handleSubmit = async () => {
    console.log("state.searchName :>> ", state.searchName, state.search);
    let { role_permission } = roleListRed;

    console.log("data :>> ", role_permission);
    if (state.searchName) {
      let val = role_permission.filter(
        (user) => user?.name == state.searchName
      );
      // console.log("data :>> ", data);
      setState({ searchValue: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  // console.log("departments", roleListRed);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(roleList());
  }, []);

  let handlePageChange = (pageNo) => {
    setState({ pageNo: pageNo });
    dispatch(roleList(pageNo));
  };

  let createButtonClicked = () => {
    setState({ modalShow: "create" });
    dispatch(modalState(true));
  };

  let editButtonClicked = (editName, id) => {
    setState({ modalShow: "edit", id: id, editName: editName });
    dispatch(modalState(true));
  };

  let deleteExam = async (id) => {
    let res = await RoleServices.delete(id);
    if (res?.message === "Role & Permission Delete Successfully") {
      dispatch(roleList(roleList?.meta?.current_page));
      toastifyAlertDelete(res.message, "top-center");
    }
  };

  let roleShow = "";
  if (roleListRed?.role_permission && !state.search) {
    roleShow = roleListRed?.role_permission.map((exam, index) => {
      // console.log("exam :>> ", exam.permissions);w
      let permissions = "";
      if (exam?.permissions) {
        permissions = exam?.permissions.map((permission, index) => {
          return (
            <div key={index} className=" td_details">
              <div className="permissions">
                <h4>{permission.name}</h4>
              </div>
            </div>
          );
        });
      }
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{exam.name}</h4>
              </div>
            </div>
          </td>

          <td className="d-flex ">{permissions}</td>

          <td>
            <div className="d-flex">
              <img
                className="c_point"
                src={dlt_new}
                alt="c_point"
                onClick={() => deleteExam(exam.id)}
              />
              <img
                className="c_point ml-2"
                alt="c_point"
                src={edit_new}
                onClick={() => editButtonClicked(exam.name, exam.id)}
              />
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    roleShow = state.searchValue.map((exam, index) => {
      // console.log("exam :>> ", exam.permissions);w
      let permissions = "";
      if (exam?.permissions) {
        permissions = exam?.permissions.map((permission, index) => {
          return (
            <div key={index} className=" td_details">
              <div className="permissions">
                <h4>{permission.name}</h4>
              </div>
            </div>
          );
        });
      }
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{exam.name}</h4>
              </div>
            </div>
          </td>

          <td className="d-flex ">{permissions}</td>

          <td>
            <div className="d-flex">
              <img
                className="c_point"
                src={dlt_new}
                alt="c_point"
                onClick={() => deleteExam(exam.id)}
              />
              <img
                className="c_point ml-2"
                alt="c_point"
                src={edit_new}
                onClick={() => editButtonClicked(exam.name, exam.id)}
              />
            </div>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <Dashboard>
        <div className="university">
          <div className="text-end create_btn" onClick={createButtonClicked}>
            <button type="button" className="btn btn-primary">
              <p>+ Create Role</p>
            </button>
          </div>

          <InputRole
            modalShow={state.modalShow}
            pageNo={roleList?.last_page || state.pageNo}
            editName={state.editName}
            id={state.id}
          />

          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Role List</h3>
              <div
                className="university_texts_input d-flex"
                style={{ columnGap: "10px" }}
              >
                <input
                  type="search"
                  placeholder="Search by Name"
                  name="name"
                  value={state.searchName}
                  onChange={(e) => {
                    setState({ searchName: e.target.value });
                  }}
                />
                <div className=" create_btn">
                  <button
                    style={{ padding: "10px 25px" }}
                    type="button"
                    className="btn btn-primary smallBtn"
                    onClick={handleSubmit}
                  >
                    <p>Search</p>
                  </button>
                </div>
                <div className="image">{/* <img src={search} /> */}</div>
              </div>
            </div>
            <div className="university__details">
              <div className="tb__scroll">
                <table className="">
                  <tbody>
                    <tr>
                      <th style={{ width: "45%" }}>Role name</th>
                      <th style={{ width: "45%" }}>Permissions</th>
                      <th style={{ width: "10%" }}>Actions</th>
                    </tr>
                    {roleShow}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export default RoleIndex;
