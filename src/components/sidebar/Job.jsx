import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import down from "../../assets/img/icons/down.svg";
import left from "../../assets/img/icons/left.svg";
import {
  departments,
  grade,
  jobs,
  post,
  quota,
} from "../../constants/rolePermission";
import { SIDEBAR } from "../../constants/sidebar";
import { setSideBarState } from "../../redux/actions/sidebarAction";
import { setSideBar } from "../../utils/auth";
import PermissionCheck from "../PermissionCheck";

function Job({ sidebar }) {
  const {
    JOB,
    GRADE,
    POST,
    DEPARTMENT,
    QUOTA,
    JOBAPPLIED,
    TRANSFERRED,
    JOBPENDING,
    MERCHENTSAPPIED,
    JOBLISTSTATUS,
    PAYMENTMARCHENTS,
    PAYMENTADMIN,
    JOBAPPLICATION,
    JOBCIRCULAR,
  } = SIDEBAR;
  const values = [
    JOB,
    GRADE,
    TRANSFERRED,
    PAYMENTADMIN,
    POST,
    DEPARTMENT,
    QUOTA,
    JOBAPPLIED,
    JOBLISTSTATUS,
    JOBPENDING,
    JOBAPPLICATION,
    JOBCIRCULAR,
    MERCHENTSAPPIED,
    PAYMENTMARCHENTS,
  ];

  let dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      job: values.includes(sidebar) ? true : false,
      create: values.includes(sidebar) ? true : false,
    }
  );

  return (
    <>
      <div
        className="u__create c_point"
        onClick={() => {
          setState({ job: !state.job });
          setSideBar(JOB);
        }}
      >
        {/* <div className="sub__li pt-2"> */}
        <li>Job</li>
        {state.job ? (
          <img className="icon" src={down} alt="down" />
        ) : (
          <img
            className="icon"
            onClick={() => setState({ job: !state.job })}
            src={left}
            alt="down"
          />
        )}
      </div>

      {state.job ? (
        <ul className="sub__ul active">
          <PermissionCheck permission={grade.access}>
            <Link to="/job/grade">
              <li
                className={sidebar === GRADE ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(GRADE));
                  setSideBar(GRADE);
                }}
              >
                Grade
              </li>
            </Link>
          </PermissionCheck>

          <PermissionCheck permission={post.access}>
            <Link to="/job/post">
              <li
                className={sidebar === POST ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(POST));
                  setSideBar(POST);
                }}
              >
                Post
              </li>
            </Link>
          </PermissionCheck>

          <PermissionCheck permission={departments.access}>
            <Link to="/job/department">
              <li
                className={sidebar === DEPARTMENT ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(DEPARTMENT));
                  setSideBar(DEPARTMENT);
                }}
              >
                Department
              </li>
            </Link>
          </PermissionCheck>

          <PermissionCheck permission={quota.access}>
            <Link to="/job/quota">
              <li
                className={sidebar === QUOTA ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(QUOTA));
                  setSideBar(QUOTA);
                }}
              >
                Quota
              </li>
            </Link>
          </PermissionCheck>

          <PermissionCheck permission={jobs.appliedJobAdmin}>
            <Link to="/job/circular/applied">
              <li
                className={sidebar === JOBAPPLIED ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(JOBAPPLIED));
                  setSideBar(JOBAPPLIED);
                }}
              >
                Applied job(Admin)
              </li>
            </Link>
          </PermissionCheck>

          {/* <PermissionCheck permission={ROLES.JOBPENDING}> */}
          {/* <Link to="/job/pending">
            <li
              className={sidebar === JOBPENDING ? "active py-2" : "py-2"}
              onClick={() => {
                dispatch(setSideBarState(JOBPENDING));
                setSideBar(JOBPENDING);
              }}
            >
              Jobs Pending
            </li>
          </Link> */}
          {/* </PermissionCheck> */}

          <PermissionCheck permission={jobs.appliedJobAdminStatus}>
            <Link to="/job-list/status">
              <li
                className={sidebar === JOBLISTSTATUS ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(JOBLISTSTATUS));
                  setSideBar(JOBLISTSTATUS);
                }}
              >
                Jobs status(Admin)
              </li>
            </Link>
          </PermissionCheck>

          {/* </PermissionCheck> */}

          {/* <PermissionCheck permission={ROLES.MERCHENTSAPPIED}> */}
          <Link to="/job/merchent/apply">
            <li
              className={sidebar === MERCHENTSAPPIED ? "active py-2" : "py-2"}
              onClick={() => {
                dispatch(setSideBarState(MERCHENTSAPPIED));
                setSideBar(MERCHENTSAPPIED);
              }}
            >
              Applied job(Merchents)
            </li>
          </Link>
          {/* </PermissionCheck> */}

          <PermissionCheck permission={jobs.jobApplyAccess}>
            <Link to="/job/application">
              <li
                className={sidebar === JOBAPPLICATION ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(JOBAPPLICATION));
                  setSideBar(JOBAPPLICATION);
                }}
              >
                Create Job Application
              </li>
            </Link>
          </PermissionCheck>

          <PermissionCheck permission={jobs.access}>
            <Link to="/job/circular">
              <li
                className={sidebar === JOBCIRCULAR ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(JOBCIRCULAR));
                  setSideBar(JOBCIRCULAR);
                }}
              >
                Create Job Circular
              </li>
            </Link>
          </PermissionCheck>
        </ul>
      ) : (
        ""
      )}
    </>
  );
}

export default Job;
