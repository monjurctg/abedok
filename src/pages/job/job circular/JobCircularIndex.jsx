import React from 'react';
import { useEffect, useMemo, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import JobCircularServices from "../../../api/job/JobCircularServices";
import dlt_new from "../../../assets/img/icons/dlt_new.svg";
import edit_new from "../../../assets/img/icons/edit_new.svg";
import view from "../../../assets/img/icons/view.svg";
import {
  toastifyAlertDelete,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import PermissionCheck from "../../../components/PermissionCheck";
import SubLoader from "../../../components/SubLoader";
import { jobs } from "../../../constants/rolePermission";
import {
  activeJobCircularList,
  changeJobCircularStatus,
  jobCircularList,
} from "../../../redux/actions/job/jobCircularAction";
import { modalState } from "../../../redux/actions/modalAction";
import InputJobCircular from "./InputJobCircular";
import { JobType } from "./jobTypes";

function JobCircularIndex() {
  const { jobCircularData, jobStatusRed } = useSelector(
    (state) => state.jobCircular
  );
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      pageNo: 1,
      active: false,
      searchName: "",
      searchValue: [],
      search: false,
    }
  );

  let getType = (type) => {
    let jobT = "";
    Object.keys(JobType).map((job) => {
      if (job === type) {
        jobT = JobType[job];
      }
    });

    return jobT;
  };

  let handleSubmit = async () => {
    // console.log("state.searchName :>> ", state.searchName, state.search);
    let { data } = jobCircularData;

    // console.log("data :>> ", data);
    if (state.searchName) {
      let val = data.filter((user) => user?.name == state.searchName);
      // console.log("data :>> ", data);
      setState({ searchValue: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  let deleteExam = async (id) => {
    let res = await JobCircularServices.delete(id);
    // console.log("res :>> ", res);
    if (res.message === "Job Deleted Successfully") {
      // console.log("examData", examData);
      state.active
        ? dispatch(activeJobCircularList(jobCircularData?.meta.current_page))
        : dispatch(jobCircularList(jobCircularData?.meta.current_page));
      toastifyAlertDelete(res.message, "top-center");
    }
  };

  let dispatch = useDispatch();

  let activeAdmission = () => {
    dispatch(activeJobCircularList(state.pageNo));
    setState({ active: true });
  };

  let changeStatusOfExam = (id) => {
    dispatch(changeJobCircularStatus(id));
  };

  useMemo(() => {
    toastifyAlertSuccess(jobStatusRed.message, "top-center");
    state.active
      ? dispatch(activeJobCircularList(state.pageNo))
      : dispatch(jobCircularList(state.pageNo));
  }, [jobStatusRed]);

  let deactiveAdmission = () => {
    dispatch(jobCircularList(state.pageNo));
    setState({ active: false });
  };

  useEffect(() => {
    dispatch(jobCircularList(state.pageNo));
  }, [dispatch, state.pageNo]);

  let handlePageChange = (pageNo) => {
    // console.log("pageNo :>> ", pageNo);
    setState({ pageNo: pageNo });
    dispatch(jobCircularList(pageNo));
  };

  let showModal = (id) => {
    setState({ modalShow: "show", id: id });
    dispatch(modalState(true));
  };
  let jobCircularShow = "";
  if (jobCircularData?.data && !state.search) {
    jobCircularShow = jobCircularData?.data?.map((exam, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam?.department?.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.start_time}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.end_time}</h5>
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex td_details">
              <div>
                <h5>
                  {exam.current_status?.type
                    ? getType(exam.current_status?.type)
                    : "No status"}
                </h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.fee}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div className=" create_btn">
                <button type="button" className="btn btn-primary smallBtn">
                  {exam.status === "Active" ? (
                    <p onClick={() => changeStatusOfExam(exam.id)}>Active</p>
                  ) : (
                    <p onClick={() => changeStatusOfExam(exam.id)}>Disabled</p>
                  )}
                </button>
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex">
              <PermissionCheck permission={jobs.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deleteExam(exam.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={jobs.edit}>
                <Link to={`/job/circular/edit/${exam.id}`}>
                  <img
                    className="c_point ml-2"
                    alt="c_point"
                    src={edit_new}
                    // onClick={() => editButtonClicked(exam.name, exam.id)}
                  />
                </Link>
              </PermissionCheck>
              {/* <PermissionCheck permission={jobs.view}> */}
              <img
                className="c_point ml-2"
                alt="c_point"
                style={{ width: "30px" }}
                src={view}
                onClick={() => showModal(exam.id)}
              />
              {/* </PermissionCheck> */}
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    jobCircularShow = state.searchValue.map((exam, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.department.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.start_time}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.end_time}</h5>
              </div>
            </div>
          </td>
          <h5>
            {exam.current_status?.type
              ? getType(exam.current_status?.type)
              : "No status"}
          </h5>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.fee}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div className=" create_btn">
                <button type="button" className="btn btn-primary smallBtn">
                  {exam.status === "Active" ? (
                    <p onClick={() => changeStatusOfExam(exam.id)}>Active</p>
                  ) : (
                    <p onClick={() => changeStatusOfExam(exam.id)}>Disabled</p>
                  )}
                </button>
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex">
              <img
                className="c_point"
                src={dlt_new}
                alt="c_point"
                onClick={() => deleteExam(exam.id)}
              />
              <Link to={`/job/circular/edit/${exam.id}`}>
                <img
                  className="c_point ml-2"
                  alt="c_point"
                  src={edit_new}
                  // onClick={() => editButtonClicked(exam.name, exam.id)}
                />
              </Link>
              <img
                className="c_point ml-2"
                alt="c_point"
                style={{ width: "30px" }}
                src={view}
                onClick={() => showModal(exam.id)}
              />
            </div>
          </td>
        </tr>
      );
    });
  }

  let jobTable = <SubLoader />;
  if (jobCircularData?.data) {
    jobTable = (
      <div className="university__details">
        <div className="tb__scroll">
          <table className="">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Application start</th>
                <th>Application End</th>
                <th>Current Status</th>

                <th>Fee</th>
                <th>Status</th>

                {/* <th style={{ width: "45%" }}>Location</th> */}
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
              {jobCircularShow}
            </tbody>
          </table>
        </div>
        <div className="my-5 text-center pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {jobCircularData?.meta ? (
            <Pagination
              activePage={jobCircularData?.meta.current_page}
              itemsCountPerPage={jobCircularData?.meta.per_page}
              totalItemsCount={jobCircularData?.meta.total}
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
        <div className="university">
          <div className="text-end create_btn">
            <Link to={"/job/circular/create"}>
              <button type="button" className="btn btn-primary">
                <p>+ Create Job Circular</p>
              </button>
            </Link>
          </div>
          {state.id ? (
            <InputJobCircular
              modalShow={state.modalShow}
              pageNo={jobCircularData?.meta?.last_page || state.pageNo}
              // editName={state.editName}
              id={state.id}
            />
          ) : (
            ""
          )}

          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Job Circular List</h3>
              <div
                className="university_texts_input d-flex"
                style={{ columnGap: "10px" }}
              >
                <input
                  type="search"
                  placeholder="Search by Circular Name"
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
              {state.active ? (
                <div
                  className="text-end create_btn"
                  onClick={deactiveAdmission}
                >
                  <button type="button" className="btn btn-primary">
                    <p>Actived</p>
                  </button>
                </div>
              ) : (
                <div className="text-end create_btn" onClick={activeAdmission}>
                  <button type="button" className="btn btn-primary">
                    <p>Active</p>
                  </button>
                </div>
              )}
            </div>
            {jobTable}
          </div>
        </div>
        <ToastContainer transition={Zoom} />
      </Dashboard>
    </div>
  );
}

export default JobCircularIndex;
