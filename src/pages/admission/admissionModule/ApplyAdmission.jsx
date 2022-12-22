import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import user from "../../../assets/img/icons/user.svg";
import railway from "../../../assets/img/railway.svg";
import Dashboard from "../../../components/layout/Dashboard";
import SubLoader from "../../../components/SubLoader";
import { departmentList } from "../../../redux/actions/job/departmentAction";
import { gradesList } from "../../../redux/actions/job/gradeAction";
import {
  activeJobCircularList,
  jobCircularList,
} from "../../../redux/actions/job/jobCircularAction";
import { postsList } from "../../../redux/actions/job/postAction";
import { activeAdminssionList } from "../../../redux/actions/university/admissionAction";

function ApplyAdmission() {
  const { admissionData, admissionStatusRed } = useSelector(
    (state) => state.admission
  );

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      departmentName: "",
      gradeName: "",
      postName: "",
    }
  );
  const { gradeList } = useSelector((state) => state.grade);
  const { departmentData } = useSelector((state) => state.departments);
  const { postList } = useSelector((state) => state.post);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(activeAdminssionList(state.pageNo));
    dispatch(departmentList());
    dispatch(postsList());
    dispatch(gradesList());
  }, []);

  let handlePageChange = (pageNo) => {
    // console.log("pageNo :>> ", pageNo);
    // setState({ pageNo: pageNo });
    dispatch(jobCircularList(pageNo));
  };

  let departmentValues = "";
  if (departmentData?.data) {
    departmentValues = departmentData.data.map((d) => (
      <option value={d.name}>{d.name}</option>
    ));
  }

  let gradeValues = "";
  if (gradeList?.data) {
    gradeValues = gradeList.data.map((d) => (
      <option value={d.name}>{d.name}</option>
    ));
  }

  let clearValues = () => {
    setState({ departmentName: "", gradeName: "", postName: "" });
  };
  let postValues = "";
  if (postList?.data) {
    postValues = postList.data.map((d) => (
      <option value={d.name}>{d.name}</option>
    ));
  }

  let departmentChange = (e) => {
    setState({ departmentName: e.target.value });
  };

  // console.log("state.departmentName", state.departmentName);

  let jobs = <SubLoader />;
  if (admissionData?.data && !state.departmentName && !state.gradeName) {
    jobs = admissionData?.data.map((jobs, index) => {
      return (
        <div key={index} className="col-lg-9 col-md-12 offset-lg-1">
          <div className="circular_1 d-flex">
            <div className="first__div">
              <div>
                <img src={railway} alt="railway" />
              </div>
              <div className="middle__div">
                <h3>{jobs.name}</h3>
                <h4>{jobs.department.name}</h4>
                <p>{jobs.grade.name}</p>
              </div>
            </div>
            <div className="last_div">
              <div className="user_icon">
                <div>
                  {/* eligible_users */}
                  <img src={user} alt="user" />
                </div>
                <p>{jobs.eligible_users}</p>
              </div>
              <p style={{ color: "#ffff" }}>${jobs.fee}</p>
              <Link to={`/job/application/${jobs.id}`}>
                <button className="active">Apply</button>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  } else if (admissionData?.data && state.departmentName) {
    //    ||
    // state.gradeName ||
    // state.postName
    jobs = admissionData?.data
      .filter((d) => d.department.name === state.departmentName)
      .map((jobs, index) => {
        return (
          <div key={index} className="col-lg-9 col-md-12 offset-lg-1">
            <div className="circular_1 d-flex">
              <div className="first__div">
                <div>
                  <img src={railway} alt="railway" />
                </div>
                <div className="middle__div">
                  <h3>{jobs.name}</h3>
                  <h4>{jobs.department.name}</h4>
                  <p>{jobs.grade.name}</p>
                </div>
              </div>
              <div className="last_div">
                <div className="user_icon">
                  <div>
                    {/* eligible_users */}
                    <img src={user} alt="user" />
                  </div>
                  <p>{jobs.eligible_users}</p>
                </div>
                <p>${jobs.fee}</p>
                <Link to={`/job/application/${jobs.id}`}>
                  <button className="active">Apply</button>
                </Link>
              </div>
            </div>
          </div>
        );
      });
  } else if (admissionData?.data && state.gradeName) {
    //    ||
    // state.gradeName ||
    // state.postName
    jobs = admissionData?.data
      .filter((d) => d.grade.name === state.gradeName)
      .map((jobs, index) => {
        return (
          <div key={index} className="col-lg-9 col-md-12 offset-lg-1">
            <div className="circular_1 d-flex">
              <div className="first__div">
                <div>
                  <img src={railway} alt="railway" />
                </div>
                <div className="middle__div">
                  <h3>{jobs.name}</h3>
                  <h4>{jobs.department.name}</h4>
                  <p>{jobs.grade.name}</p>
                </div>
              </div>
              <div className="last_div">
                <div className="user_icon">
                  <div>
                    {/* eligible_users */}
                    <img src={user} alt="user" />
                  </div>
                  <p>{jobs.eligible_users}</p>
                </div>
                <p>${jobs.fee}</p>
                <Link to={`/job/application/${jobs.id}`}>
                  <button className="active">Apply</button>
                </Link>
              </div>
            </div>
          </div>
        );
      });
  }
  return (
    <div>
      <Dashboard>
        <div className="job__application">
          <h5>Filter By</h5>

          {/* <div className="time d-flex">
            <div className="start">
              <label>Start Date</label>
              <input type="date" />
            </div>
            <div className="end">
              <label>End Date</label>
              <input type="date" />
            </div>
          </div> */}

          <div className="filter__inputs">
            <select
              name="postName"
              // value={state.postName}
              onChange={(e) => setState({ postName: e.target.value })}
            >
              <option disabled selected>
                Post
              </option>
              {postValues}
            </select>
            <select
              className="big"
              // value={state.departmentName}
              name="departmentName"
              onChange={departmentChange}
            >
              <option selected disabled>
                Department
              </option>
              {departmentValues}
            </select>
            <select
              value={state.gradeName}
              name="gradeName"
              onChange={(e) => setState({ gradeName: e.target.value })}
            >
              <option disabled selected>
                Grade
              </option>
              {gradeValues}
            </select>
            {/* <select className="big">
              <option>Status</option>
            </select> */}
            <div className="btn__select">
              <button className="" onClick={clearValues}>
                Clear
              </button>

              <button
                className="active"
                onClick={() => dispatch(activeJobCircularList())}
              >
                Apply
              </button>
            </div>
          </div>

          <div className="job_circulars">
            <div className="row gy-5">{jobs}</div>

            <div className="my-5 text-center w-90 pagination justify-content-center">
              {/* <button className="submit_btn">See more</button> */}
              {admissionData?.meta ? (
                <Pagination
                  activePage={admissionData?.meta.current_page}
                  itemsCountPerPage={admissionData?.meta.per_page}
                  totalItemsCount={admissionData?.meta.total}
                  pageRangeDisplayed={10}
                  onChange={handlePageChange}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              ) : (
                ""
              )}
            </div>

            {/* <div className="my-5 text-center">
              <button className="submit_btn">See more</button>
            </div> */}
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export default ApplyAdmission;
