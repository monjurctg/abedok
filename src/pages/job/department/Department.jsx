import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import DepartmentServices from "../../../api/job/DepartmentServices";
import dlt_new from "../../../assets/img/icons/dlt_new.svg";
import edit_new from "../../../assets/img/icons/edit_new.svg";
import { toastifyAlertDelete } from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import PermissionCheck from "../../../components/PermissionCheck";
import { departments } from "../../../constants/rolePermission";
import { departmentList } from "../../../redux/actions/job/departmentAction";
import { modalState } from "../../../redux/actions/modalAction";
import InputDepartment from "./InputDepartment";

function Department() {
  const { departmentData } = useSelector((state) => state.departments);
  // console.log("departmentData:>>",departmentData)
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
    // console.log("state.searchName :>> ", state.searchName,state.search);
    let { data } = departmentData;

    // console.log("data :>> ", data);
    if (state.searchName) {
      let val = data.filter((user) => user?.name == state.searchName);
      // console.log("data :>> ", data);
      setState({ searchValue: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  // console.log("departments", departmentData);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(departmentList());
  }, []);

  let handlePageChange = (pageNo) => {
    setState({ pageNo: pageNo });
    dispatch(departmentList(pageNo));
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
    let res = await DepartmentServices.delete(id);
    if (res.message === "Department Delete Successfully") {
      dispatch(departmentList(departmentList?.meta?.current_page));
      toastifyAlertDelete(res.message, "top-center");
    }
  };

  let departmentShow = "";
  if (departmentData.data && !state.search) {
    departmentShow = departmentData.data.map((exam, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{exam.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div style={{ maxWidth: "100%" }}>
                {/* <im>{exam.image}</im> */}
                <img style={{ width: "150px" }} src={exam?.image} alt="" />
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <PermissionCheck permission={departments.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deleteExam(exam.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={departments.edit}>
                <img
                  className="c_point ml-2"
                  alt="c_point"
                  src={edit_new}
                  onClick={() => editButtonClicked(exam.name, exam.id)}
                />
              </PermissionCheck>
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    departmentShow = state.searchValue.map((exam, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{exam.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                {/* <im>{exam.image}</im> */}
                <img src={exam?.image} alt="" />
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <PermissionCheck permission={departments.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deleteExam(exam.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={departments.edit}>
                <img
                  className="c_point ml-2"
                  alt="c_point"
                  src={edit_new}
                  onClick={() => editButtonClicked(exam.name, exam.id)}
                />
              </PermissionCheck>
            </div>
          </td>
        </tr>
      );
    });
  }
  return (
    <div>
      <Dashboard>
        <PermissionCheck permission={departments.access} module={"departments"}>
          <div className="university">
            <div className="text-end create_btn" onClick={createButtonClicked}>
              <button type="button" className="btn btn-primary">
                <p>+ Create Department</p>
              </button>
            </div>

            <InputDepartment
              modalShow={state.modalShow}
              pageNo={departmentList?.meta?.last_page || state.pageNo}
              editName={state.editName}
              id={state.id}
            />

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="w-50">Department List</h3>
                <div
                  className="university_texts_input d-flex "
                  style={{ columnGap: "10px" }}
                >
                  <input
                    type="search"
                    placeholder="Search by Department"
                    name="name"
                    value={state.searchName}
                    onChange={(e) => {
                      setState({ searchName: e.target.value });
                    }}
                  />
                  <div className="create_btn">
                    <PermissionCheck permission={departments.create}>
                      <button
                        style={{ padding: "10px 25px" }}
                        type="button"
                        className="btn btn-primary smallBtn"
                        onClick={handleSubmit}
                      >
                        <p>Search</p>
                      </button>
                    </PermissionCheck>
                  </div>
                  <div className="image">{/* <img src={search} /> */}</div>
                </div>
              </div>
              <div className="university__details">
                <div className="tb__scroll">
                  <table className="">
                    <tbody>
                      <tr>
                        <th style={{ width: "45%" }}>Department name</th>
                        <th>Image</th>
                        <th>Actions</th>
                      </tr>
                      {departmentShow}
                    </tbody>
                  </table>
                </div>
                <div className="my-5 text-center w-90 pagination justify-content-center">
                  {/* <button className="submit_btn">See more</button> */}
                  {departmentList.meta ? (
                    <Pagination
                      activePage={departmentList.meta.current_page}
                      itemsCountPerPage={departmentList.meta.per_page}
                      totalItemsCount={departmentList.meta.total}
                      pageRangeDisplayed={5}
                      onChange={handlePageChange}
                      itemClass="page-item"
                      linkClass="page-link"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </PermissionCheck>
      </Dashboard>
    </div>
  );
}

export default Department;
