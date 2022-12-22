import React from 'react';
import { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import Swal from "sweetalert2";
import RoleServices from "../../../api/RoleServices";
import UserServices from "../../../api/user/UserServices";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import SubLoader from "../../../components/SubLoader";
import { roleList } from "../../../redux/actions/roleAction";
import { userList, userMerchentList } from "../../../redux/actions/userAction";
import InputUser from "./InputUser";

function UserIndex() {
  const { userListRed } = useSelector((state) => state.user);
  const { roleListRed } = useSelector((state) => state.role);

  // console.log("userListRed :>> ", userListRed);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      searchName: "",
      modalShow: "",
      searchData: [],
      search: false,
    }
  );
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(userMerchentList());
    dispatch(roleList());
  }, []);

  const handleRoleChange = (options) => {
    console.log("options", options);
    // const districtArray = [];
    // options.map((option) => districtArray.push(option.value));
    setState({
      roles: options.value,
    });
  };

  let roleValues = [];
  let val = {};
  if (roleListRed?.role_permission) {
    roleListRed.role_permission.map((district) => {
      val = { label: district.name, value: district.name };
      roleValues.push(val);
      return roleValues;
    });
  }

  // console.log("roleValues :>> ", roleValues);
  const inputChange = async (e, id) => {
    let data = {
      roles: e.target.value,
      user: id,
    };

    let res = await RoleServices.assignRole(data);
    if (res.status === 201) {
      toastifyAlertSuccess(res.data.message, "top-center");
      dispatch(userList());
      dispatch(roleList());
    } else {
      toastifyAlertError(res.data.message, "top-center");
    }
    // console.log("data :>> ", res);
  };

  let handlePageChange = (pageNo) => {
    // console.log("pageNo :>> ", pageNo);
    let search = null;
    dispatch(userList(search, pageNo));
  };

  // let showModal = (id) => {
  //   setState({ modalShow: "userShow", id: id });
  //   dispatch(modalState(true));
  // };

  let handleSubmit = () => {
    let { data } = userListRed;

    // console.log("data :>> ", data[0].email);
    if (state.searchName) {
      // data.filter((f) => console.log(f.email));
      let val = data.filter(
        (filterData) =>
          filterData?.email?.toLowerCase() == state.searchName.toLowerCase() ||
          filterData?.phone == state.searchName
      );
      // console.log("data :>> ", val);
      setState({ searchData: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  let deleteOption = async (id) => {
    let res = await UserServices.userDelete(id);

    if (res.status === 200) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      dispatch(userList());
    } else {
      Swal.fire("Error!", "Not deleted.", "error");
    }
    // console.log("res :>> ", res);
  };
  const deleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // console.log("result :>> ", result);
      if (result.isConfirmed) {
        deleteOption(id);
      }
    });
  };

  let examShow = "";
  if (userListRed?.data && !state.search) {
    // console.log("first");
    examShow = userListRed.data
      .filter((exam) => exam.type == 0)
      .map((exam, index) => {
        return (
          <tr index={index} key={index}>
            <td>
              <div className="d-flex td_details">
                <div>
                  <h5>
                    {exam.name
                      ? exam.name
                      : exam?.Basic_Info?.full_name || "From mobile"}
                  </h5>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex td_details">
                <div>
                  <h5>
                    {exam.email
                      ? exam.email
                      : exam?.Basic_Info?.email || "No email"}
                  </h5>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex td_details">
                <div>
                  <h5>{exam.phone}</h5>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex td_details">
                <div>
                  <h5>{exam?.comissiion}%</h5>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex td_details">
                <div>
                  <h5>{exam.Profile_Strength}</h5>
                </div>
              </div>
            </td>
            <td style={{ width: "30%" }}>
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ gap: "10px" }}
              >
                <select
                  name="role"
                  onChange={(e) => inputChange(e, exam.id)}
                  className="modal__input small"
                  style={{ width: "150px", flex: 1 }}
                >
                  <option selected disabled>
                    Select role
                  </option>
                  {roleValues.map((roles) => (
                    <option
                      style={{ backgroud: "red" }}
                      value={roles.value}
                      selected={roles.value === exam?.roles[0]?.name}
                      disabled={roles.value === exam?.roles[0]?.name}
                    >
                      {roles.value}
                    </option>
                  ))}
                </select>
                <Link to={"/role/index"}>
                  <button
                    className="btn btn-primary smallBtn c_point"
                    style={{ flex: 1 }}
                  >
                    Permissions
                  </button>
                </Link>
              </div>
              {/* {assignRoles} */}
            </td>
            <td>
              {/* <button className="btn btn-primary smallBtn c_point btn-show red mx-2">
              Edit
            </button> */}
              <div className="d-flex">
                <Link to={`/user-show/${exam.id}`}>
                  <button
                    className="btn btn-primary smallBtn c_point mx-2"
                    // onClick={() => showModal(exam.id)}
                  >
                    Show
                  </button>
                </Link>

                {/* <button
                className="btn btn-primary smallBtn c_point "
                onClick={() => showModal(exam.id)}
              >
                Edit
              </button> */}

                <button
                  className="btn btn-primary smallBtn c_point"
                  onClick={() => deleteUser(exam.id)}
                >
                  Delete
                </button>
                {/* <Link to={`/user/index/${exam.id}/transfer/user`}>
                  <button className="btn btn-primary smallBtn c_point mx-2">
                    Transfer
                  </button>
                </Link> */}
              </div>
            </td>
          </tr>
        );
      });
  } else if (state.search) {
    // console.log("2nd");

    examShow = state.searchData
      .filter((exam) => exam.type == 0)
      .map((exam, index) => {
        return (
          <tr index={index} key={index}>
            <td>
              <div className="d-flex td_details">
                <div>
                  <h5>
                    {exam.name
                      ? exam.name
                      : exam?.Basic_Info?.full_name || "From mobile"}
                  </h5>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex td_details">
                <div>
                  <h5>
                    {exam.email
                      ? exam.email
                      : exam?.Basic_Info?.email || "No email"}
                  </h5>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex td_details">
                <div>
                  <h5>{exam.phone}</h5>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex td_details">
                <div>
                  <h5>{exam?.comissiion}%</h5>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex td_details">
                <div>
                  <h5>{exam.Profile_Strength}</h5>
                </div>
              </div>
            </td>
            <td style={{ width: "30%" }}>
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ gap: "10px" }}
              >
                <select
                  name="role"
                  onChange={(e) => inputChange(e, exam.id)}
                  className="modal__input small"
                  style={{ width: "150px", flex: 1 }}
                >
                  <option selected disabled>
                    Select role
                  </option>
                  {roleValues.map((roles) => (
                    <option
                      style={{ backgroud: "red" }}
                      value={roles.value}
                      selected={roles.value === exam?.roles[0]?.name}
                      disabled={roles.value === exam?.roles[0]?.name}
                    >
                      {roles.value}
                    </option>
                  ))}
                </select>
                <Link to={"/role/index"}>
                  <button
                    className="btn btn-primary smallBtn c_point"
                    style={{ flex: 1 }}
                  >
                    Permissions
                  </button>
                </Link>
              </div>
              {/* {assignRoles} */}
            </td>
            <td>
              {/* <button className="btn btn-primary smallBtn c_point btn-show red mx-2">
              Edit
            </button> */}
              <div className="d-flex">
                <Link to={`/user-show/${exam.id}`}>
                  <button
                    className="btn btn-primary smallBtn c_point mx-2"
                    // onClick={() => showModal(exam.id)}
                  >
                    Show
                  </button>
                </Link>

                {/* <button
                className="btn btn-primary smallBtn c_point "
                onClick={() => showModal(exam.id)}
              >
                Edit
              </button> */}

                <button
                  className="btn btn-primary smallBtn c_point"
                  onClick={() => deleteUser(exam.id)}
                >
                  Delete
                </button>
                {/* <Link to={`/user/index/${exam.id}/transfer/user`}>
                  <button className="btn btn-primary smallBtn c_point mx-2">
                    Transfer
                  </button>
                </Link> */}
              </div>
            </td>
          </tr>
        );
      });
  }

  let userModule = <SubLoader />;
  if (userListRed?.data) {
    userModule = (
      <div className="university__details">
        <div>
          <div className="tb__scroll">
            <table className="">
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Email</th>

                  <th>Phone</th>
                  <th>Comission</th>

                  <th>Profile Strength</th>
                  <th>Assign roles</th>
                  <th>Actions</th>
                </tr>
                {examShow}
              </tbody>
            </table>
          </div>
        </div>
        <div className="my-5 text-center pagination justify-content-center">
          {userListRed?.meta ? (
            <Pagination
              activePage={userListRed?.meta.current_page}
              itemsCountPerPage={userListRed?.meta.per_page}
              totalItemsCount={userListRed?.meta.total}
              pageRangeDisplayed={10}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
  return (
    <div>
      <Dashboard>
        <InputUser
          modalShow={state.modalShow}
          pageNo={userListRed?.meta?.last_page || state.pageNo}
          editName={state.editName}
          id={state.id}
        />

        <div className="university">
          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Merchents Lists</h3>
              <div
                className="university_texts_input d-flex"
                style={{ columnGap: "10px" }}
              >
                <input
                  type={"search"}
                  placeholder="Search"
                  name="search"
                  value={state.searchName}
                  className="mr-4"
                  onChange={(e) => {
                    setState({ searchName: e.target.value });
                    // handleSubmit();
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
              </div>
            </div>
            {userModule}
          </div>
        </div>
        <ToastContainer transition={Zoom} />
      </Dashboard>
    </div>
  );
}

UserIndex.displayName = "UserIndex";

export default UserIndex;
