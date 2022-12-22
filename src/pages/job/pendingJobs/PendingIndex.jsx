import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dlt_new from "../../../assets/img/icons/dlt_new.svg";
import edit_new from "../../../assets/img/icons/edit_new.svg";
import Dashboard from "../../../components/layout/Dashboard";
import { appliedJobsPendingList } from "../../../redux/actions/job/jobs";

function PendingIndex() {
  const { pendingJobList } = useSelector((state) => state.jobCircular);
  console.log("pendingJobList", pendingJobList);
  let dispatch = useDispatch();
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
    let { data } = pendingJobList;

    console.log("data :>> ", data);
    if (state.searchName) {
      let val = data.filter((user) => user?.job_name == state.searchName);
      // console.log("data :>> ", data);
      setState({ searchValue: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  useEffect(() => {
    dispatch(appliedJobsPendingList());
  }, []);

  let unitShow = "";
  if (pendingJobList && !state.search) {
    unitShow = pendingJobList.map((unit, index) => {
      // console.log("unit :>> ", unit);
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit.job_name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit.Department}</h4>
              </div>
            </div>
          </td>{" "}
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit.current_status || "Pending"}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>
                  {unit.user.name
                    ? unit.user.name
                    : unit.user.Basic_Info.full_name || "Mobile user"}
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>
                  {unit.user.email
                    ? unit.user.email
                    : unit.user.Basic_Info.email || "Mobile user"}
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <img
                src={dlt_new}
                className="c_point"
                alt="sfd"
                // onClick={() => deleteExam(unit.id)}
              />
              <Link to={`/job/circular/status/${unit.id}`}>
                <img
                  src={edit_new}
                  alt="edit"
                  className="c_point"
                  // onClick={() => editButtonClicked(unit.name, unit.id)}
                />
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    unitShow = state.searchValue.map((unit, index) => {
      // console.log("unit :>> ", unit);
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit.job_name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit.Department}</h4>
              </div>
            </div>
          </td>{" "}
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit.current_status || "Pending"}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>
                  {unit.user.name
                    ? unit.user.name
                    : unit.user.Basic_Info.full_name || "Mobile user"}
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>
                  {unit.user.email
                    ? unit.user.email
                    : unit.user.Basic_Info.email || "Mobile user"}
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <img
                src={dlt_new}
                className="c_point"
                alt="sfd"
                // onClick={() => deleteExam(unit.id)}
              />
              <Link to={`/job/circular/status/${unit.id}`}>
                <img
                  src={edit_new}
                  alt="edit"
                  className="c_point"
                  // onClick={() => editButtonClicked(unit.name, unit.id)}
                />
              </Link>
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
          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Pending job List</h3>
              <div
                className="university_texts_input d-flex"
                style={{ columnGap: "10px" }}
              >
                <input type={"search"} placeholder="Search" />
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
              <table className="">
                <tbody>
                  <tr>
                    <th>Job name</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>User</th>
                    <th>Email</th>

                    {/* <th style={{ width: "45%" }}>Location</th> */}
                    <th style={{ width: "10%" }}>Actions</th>
                  </tr>

                  {unitShow}
                </tbody>
              </table>
              <div className="my-5 text-center w-90 pagination justify-content-center">
                {/* <button className="submit_btn">See more</button> */}
                {pendingJobList.meta ? (
                  <Pagination
                    activePage={pendingJobList.meta.current_page}
                    itemsCountPerPage={pendingJobList.meta.per_page}
                    totalItemsCount={pendingJobList.meta.total}
                    pageRangeDisplayed={5}
                    // onChange={handlePageChange}
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
      </Dashboard>
    </div>
  );
}

export default PendingIndex;
