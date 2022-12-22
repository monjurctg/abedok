import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dashboard from "../../../components/layout/Dashboard";
import SubLoader from "../../../components/SubLoader";
import { appliedJobsList } from "../../../redux/actions/job/jobs";
import { modalState } from "../../../redux/actions/modalAction";
import InputJobCircular from "../job circular/InputJobCircular";
import AddRoll from "./AddRoll";

function AppliedJobStatus() {
  const { appliedJobList } = useSelector((state) => state.jobCircular);
  // console.log("appliedJoblist", appliedJobList)
  // console.log("departments", unitData);
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
      filterData: [],
      search: false,
    }
  );
  // console.log(state.searchName);
  let style = {
    borderRadius: "5px",
    width: "100%",
    background: "crimson",
    color: "white",
    padding: "10px",
    boxShadow: "-6px 2px 16px 0px #9e9e9ead",
    cursor: "pointer",
    textAlign: "center",
  };

  let style1 = {
    background: "linear-gradient(42deg, #e90d0d 0%, #7d00ac 100%)",
    borderRadius: "5px",
    textAlign: "center",
  };
  // search task

  let handleSubmit = async () => {
    // console.log("state.searchName :>> ", state.searchName, state.search);
    let { data } = appliedJobList;

    // console.log("data :>> ", data);
    if (state.searchName) {
      let val = data.filter(
        (user) => (user?.user.email) == state.searchName || (user?.job_name) == state.searchName
      );
      // console.log("data :>> ", data);
      setState({ filterData: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  useEffect(() => {
    dispatch(appliedJobsList());
  }, []);

  let showModal = (data, id) => {
    setState({ modalShow: data, id: id });
    dispatch(modalState(true));
  };

  let handlePageChange = (pageNo) => {
    dispatch(appliedJobsList(pageNo));
  };

  let unitShow = "";
  if (appliedJobList?.data && !state.search) {
    unitShow = appliedJobList?.data.map((unit, index) => {
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
            <div className="" style={style1}>
              <div>
                <h4
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  {unit.current_status || "Pending"}
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>
                  {unit.user.name
                    ? unit.user.name
                    : unit.user.Basic_Info?.full_name || "Mobile user"}
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>
                  {unit.user.email
                    ? unit.user?.email
                    : unit.user.Basic_Info?.email || "Mobile user"}
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit.roll || "null"}</h4>
              </div>
            </div>
          </td>
          <td>
            <div
              className="d-flex align-items-center"
              style={{ columnGap: "10px" }}
            >
              <button
                className="btn btn-primary smallBtn c_point btn-show red gx-2"
                onClick={() => showModal("addRoll", unit?.id)}
              >
                Roll
              </button>

              <Link to={`/job/circular/status/${unit.id}`}>
                <button className="btn btn-primary smallBtn c_point btn-show ">
                  Status
                </button>
              </Link>

              <Link to={`/applied-job/user-show/${unit?.user?.id}`}>
                <button
                  className="btn btn-primary smallBtn c_point btn-show red gx-2"
                  // onClick={() => showModal("userShow", unit?.user?.id)}
                >
                  User
                </button>
              </Link>

              <button
                className="btn btn-primary smallBtn c_point"
                onClick={() => showModal("show", unit.job_id)}
              >
                Show job
              </button>
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    unitShow = state.filterData?.map((unit, index) => {
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
                    : unit.user.Basic_Info?.full_name || "Mobile user"}
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>
                  {unit.user.email
                    ? unit.user?.email
                    : unit.user.Basic_Info?.email || "Mobile user"}
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <Link
                to={
                  unit.status === 0 ? `/user/index/${unit.id}/payment/job` : ""
                }
              >
                <div style={style}>
                  <h5>{unit.status === 0 ? "Not done" : "Done"}</h5>
                </div>
              </Link>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div style={style}>
                <h5>{unit.send === 0 ? "Not send" : "Sended"}</h5>
              </div>
              {/* </Link> */}
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit.roll || "null"}</h4>
              </div>
            </div>
          </td>
          <td>
            <div
              className="d-flex align-items-center"
              style={{ columnGap: "10px" }}
            >
              <button
                className="btn btn-primary smallBtn c_point btn-show red gx-2"
                onClick={() => showModal("addRoll", unit?.id)}
              >
                Roll
              </button>

              <Link to={`/job/circular/status/${unit.id}`}>
                <button className="btn btn-primary smallBtn c_point btn-show ">
                  Status
                </button>
              </Link>

              <Link to={`/applied-job/user-show/${unit?.user?.id}`}>
                <button
                  className="btn btn-primary smallBtn c_point btn-show red gx-2"
                  // onClick={() => showModal("userShow", unit?.user?.id)}
                >
                  User
                </button>
              </Link>

              <button
                className="btn btn-primary smallBtn c_point"
                onClick={() => showModal("show", unit.job_id)}
              >
                Show job
              </button>
            </div>
          </td>
        </tr>
      );
    });
  }

  let unitModal = <SubLoader />;
  if (appliedJobList?.data) {
    unitModal = (
      <div className="university__details">
        <div className="tb__scroll">
          <table className="">
            <tbody>
              <tr>
                <th>Job name</th>
                <th>Department</th>
                <th>Status</th>
                <th>User</th>
                <th>Email</th>
                <th>Roll</th>
                <th>Actions</th>
              </tr>

              {unitShow}
            </tbody>
          </table>
        </div>
        <div className="my-5 text-center w-90 pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {appliedJobList.meta ? (
            <Pagination
              activePage={appliedJobList.meta.current_page}
              itemsCountPerPage={appliedJobList.meta.per_page}
              totalItemsCount={appliedJobList.meta.total}
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
    );
  }
  return (
    <div>
      <Dashboard>
        {state.modalShow == "show" ? (
          <InputJobCircular
            modalShow={state.modalShow}
            editName={state.editName}
            id={state.id}
          />
        ) : (
          <AddRoll modalShow={state.modalShow} id={state.id} />
        )}

        {/* // : (
        //   <InputUser */}
        {/* //     modalShow={state.modalShow}
        //     editName={state.editName}
        //     id={state.id}
        //   />
        // )
        
        // } */}

        {/* <ModalUserShow /> */}
        <div className="university">
          {/* <div className="text-end create_btn" onClick={createButtonClicked}>
            <button type="button" className="btn btn-primary">
              <p>+ Add roll</p>
            </button>
          </div> */}
          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Applied job status</h3>
              <div
                className="university_texts_input d-flex"
                style={{ columnGap: "10px" }}
              >
                <input
                  type="search"
                  placeholder="Search by name"
                  name="name"
                  value={state.searchName}
                  onChange={(e) => {
                    setState({ searchName: e.target.value });
                  }}
                />
                <div className=" create_btn">
                  <button
                    style={{ padding: "16px 27px" }}
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
            {unitModal}
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export default AppliedJobStatus;
