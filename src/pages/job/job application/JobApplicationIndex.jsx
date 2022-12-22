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

function JobApplicationIndex() {
  const { jobCircularData, jobStatusRed } = useSelector(
    (state) => state.jobCircular
  );

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      departmentName: "",
      gradeName: "",
      postName: "",
      filterValue: {},
    }
  );
  const { gradeList } = useSelector((state) => state.grade);
  const { departmentData } = useSelector((state) => state.departments);
  const { postList } = useSelector((state) => state.post);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(activeJobCircularList());
    dispatch(departmentList());
    dispatch(postsList());
    dispatch(gradesList());
  }, []);

  let searchFilter = () => {
    let data = {
      post: state.postName,
      department: state.departmentName,
      grade: state.gradeName,
    };

    setState({ filterValue: data });

    dispatch(activeJobCircularList());
  };

  console.log("state. :>> ", state.filterValue);

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
  console.log(jobCircularData);
  let departmentChange = (e) => {
    setState({ departmentName: e.target.value });
  };

  // console.log("state.departmentName", state.departmentName);

  let jobs = <SubLoader />;
  
  if (
    jobCircularData?.data &&
    !state.filterValue.post &&
    !state.filterValue.department &&
    !state.filterValue.grade
  ) {
    jobs = jobCircularData?.data?.map((jobs, index) => {
      console.log("jobs without :>> ", jobs);
      return (
        <div key={index} className="col-lg-6 col-md-6">
          <div className="circular_1 d-flex">
            <div className="first__div">
              <div className="image">
                <img src={jobs?.department?.image} alt="railway" />
              </div>
              <div className="middle__div">
                <h3>{jobs?.name}</h3>
                <h4>{jobs?.department?.name}</h4>
                <p>{jobs?.grade?.name}</p>
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
  } else if (
    jobCircularData?.data &&
    (state.filterValue.post ||
      state.filterValue.department ||
      state.filterValue.grade)
  ) {
    //    ||
    // state.gradeName ||
    // state.postName
    jobs = jobCircularData?.data
      ?.filter(
        (d) =>
          d.department.name === state.filterValue.department ||
          d.grade.name === state.filterValue.grade
      )
      ?.map((jobs, index) => {
        // console.log("jobs :>> ", jobs);
        return (
          <div key={index} className="col-lg-9 col-md-12 offset-lg-1">
            <div className="circular_1 d-flex">
              <div className="first__div">
                <div className="image">
                  <img src={jobs?.department?.image} alt="railway" />
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
                <Link to={`/job/application/${jobs?.id}`}>
                  <button className="active">Apply</button>
                </Link>
              </div>
            </div>
          </div>
        );
      });
  } else if (jobCircularData?.data && state?.gradeName) {
   
    //    ||
    // state.gradeName ||
    // state.postName
    jobs = jobCircularData?.data
      .filter((d) => d?.grade?.name === state?.gradeName)
      ?.map((jobs, index) => {
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
              // value={state.gradeName}
              name="gradeName"
              onChange={(e) => setState({ gradeName: e.target.value })}
            >
              <option disabled selected>
                Grade
              </option>
              {gradeValues}
            </select>
            <div className="btn__select">
              <button className="" onClick={clearValues}>
                Clear
              </button>

              <button
                className="active"
                // onClick={() => dispatch(activeJobCircularList())}
                onClick={searchFilter}
              >
                Apply
              </button>
            </div>
          </div>

          <div className="job_circulars">
            <div className="row gy-5">{jobs}</div>

            <div className="my-5 text-center w-90 pagination justify-content-center">
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

            {/* <div className="my-5 text-center">
              <button className="submit_btn">See more</button>
            </div> */}
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export default JobApplicationIndex;
