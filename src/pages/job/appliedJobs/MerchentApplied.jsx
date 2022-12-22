import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dashboard from "../../../components/layout/Dashboard";
import Index from "../../../components/modal/updateModal/Index";
import { MemoUserEditModal } from "../../../components/modal/UserEditModal";
import SubLoader from "../../../components/SubLoader";
import {
  appliedJobsList,
  appliedJobsListMerchents,
} from "../../../redux/actions/job/jobs";
import { modalState, modalUpdate } from "../../../redux/actions/modalAction";
import InputJobCircular from "../job circular/InputJobCircular";

function MerchentApplied() {
  const { jobMerchents } = useSelector((state) => state.jobCircular);
  // console.log("departments", unitData);
  let dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      appliedJobId: "",
      editName: "",
      pageNo: 1,
      searchName: "",
      searchValue: [],
      search: false,
      type: "Payment",
    }
  );

  useEffect(() => {
    dispatch(appliedJobsListMerchents());
  }, []);

  let style = {
    borderRadius: "5px",
    width: "100%",
    background: "linear-gradient(42deg, #e90d0d 0%, #7d00ac 100%)",
    color: "white",
    padding: "5px",
    boxShadow: "-6px 2px 16px 0px #9e9e9ead",
    cursor: "pointer",
    textAlign: "center",
  };

  // console.log("state.fee", state.fee);
  let showModalPaid = (status, id, fee, user_id, payment_id) => {
    // state.type("Job Apply");
    // console.log("status :>> ", status);
    setState({
      appliedJobId: id,
      fee: fee,
      userId: user_id,
      payment_id: payment_id,
    });
    status === 0 ? dispatch(modalUpdate(true)) : dispatch(modalUpdate(false));
  };

  let showModal = (data, id) => {
    setState({ modalShow: data, id: id });
    dispatch(modalState(true));
  };

  let createButtonClicked = () => {
    setState({ modalShow: "create" });
    dispatch(modalState(true));
  };

  let handlePageChange = (pageNo) => {
    dispatch(appliedJobsList(pageNo));
  };

  let handleSubmit = async () => {
    // console.log("state.searchName :>> ", state.searchName, state.search);
    let { data } = jobMerchents;

    console.log("data :>> ", data[0].user.email);
    if (state.searchName) {
      let val = data.filter(
        (user) =>
          user?.user.email.toLowerCase() == state.searchName.toLowerCase() ||
          user?.job_name == state.searchName
      );
      // console.log("data :>> ", data);
      setState({ searchValue: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  // console.log("state.appliedJobId", state.appliedJobId);
  let unitShow = "";
  if (jobMerchents?.data && !state.search) {
    unitShow = jobMerchents?.data.map((unit, index) => {
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
              {unit.payments?.length > 0 &&
              unit.payments[0]?.payement_status !== 0 ? (
                <div style={style}>
                  <h4
                    onClick={() =>
                      showModalPaid(
                        unit.status,
                        unit.id,
                        unit.fee,
                        unit.user.id,
                        unit.payments[0]?.id
                      )
                    }
                  >
                    {unit.status === 0 ? "Not paid" : "Paid"}
                  </h4>
                </div>
              ) : (
                <div style={style}>
                  <h4
                    onClick={() =>
                      showModalPaid(
                        unit.status,
                        unit.id,
                        unit.fee,
                        unit.user.id
                        // unit.payments[0]?.id
                      )
                    }
                  >
                    Pay
                  </h4>
                </div>
              )}
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
              <Link to={`/job/circular/status/${unit.id}`}>
                <button className="btn btn-primary smallBtn c_point btn-show ">
                  Status
                </button>
              </Link>

              <Link to={`/user-show/${unit?.user?.id}`}>
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
    unitShow = state.searchValue?.map((unit, index) => {
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
              <div style={style}>
                <h4
                  onClick={() =>
                    showModalPaid(
                      unit.status,
                      unit.id,
                      unit.fee,
                      unit.user.id,
                      unit.payments[0]?.id
                    )
                  }
                >
                  {unit.status === 0 ? "Not paid" : "Paid"}
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
              <Link to={`/job/circular/status/${unit.id}`}>
                <button className="btn btn-primary smallBtn c_point btn-show ">
                  Status
                </button>
              </Link>

              <Link to={`/user-show/${unit?.user?.id}`}>
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
  if (jobMerchents?.data) {
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
                <th>Payment</th>
                <th>Roll</th>

                {/* <th style={{ width: "45%" }}>Location</th> */}
                <th style={{ width: "20%" }}>Actions</th>
              </tr>

              {unitShow}
            </tbody>
          </table>
        </div>
        <div className="my-5 text-center w-90 pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {jobMerchents.meta ? (
            <Pagination
              activePage={jobMerchents.meta.current_page}
              itemsCountPerPage={jobMerchents.meta.per_page}
              totalItemsCount={jobMerchents.meta.total}
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
          <MemoUserEditModal
            appliedJobId={state.appliedJobId}
            type={state.type}
            fee={state.fee}
          >
            <Index
              type={state.type}
              appliedJobId={state.appliedJobId}
              fee={state.fee}
              user_id={state.userId}
              payment_id={state.payment_id}
            />
          </MemoUserEditModal>
        )}

        {/* <ModalUserShow /> */}
        <div className="university">
          <div className="text-end create_btn" onClick={createButtonClicked}>
            <button type="button" className="btn btn-primary">
              <p>+ Add roll</p>
            </button>
          </div>
          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Merchents applied job Lists</h3>
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
            {unitModal}
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export default MerchentApplied;
