import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import down from "../../assets/img/icons/down.svg";
import left from "../../assets/img/icons/left.svg";
import {
  admission,
  board,
  course_duration,
  examination,
  group,
  passing_year,
  subjects,
  unit,
  university,
} from "../../constants/rolePermission";
import { SIDEBAR } from "../../constants/sidebar";
import { setSideBarState } from "../../redux/actions/sidebarAction";
import { setSideBar } from "../../utils/auth";
import PermissionCheck from "../PermissionCheck";

function Admission({ sidebar }) {
  const {
    ADMISSION,
    ADMISSIONINDEX,
    ADMISSIONAPPY,
    ADMISSIONAPPLIED,
    ADMISSIONMERCHENTSAPPLIEDLIST,
    UNIT,
    BOARD,
    EXAM,
    GROUP,
    UNIVERSITY,
    COURSEDURATION,
    PASSINGYEAR,
    SUBJECT,
  } = SIDEBAR;

  const values = [
    ADMISSION,
    ADMISSIONINDEX,
    ADMISSIONAPPLIED,
    ADMISSIONMERCHENTSAPPLIEDLIST,
    UNIT,
    ADMISSIONAPPY,
    BOARD,
    GROUP,
    EXAM,
    UNIVERSITY,
    COURSEDURATION,
    PASSINGYEAR,
    SUBJECT,
  ];

  let dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      admission: values.includes(sidebar) ? true : false,
      create: values.includes(sidebar) ? true : false,
    }
  );

  return (
    <>
      <div
        className="u__create c_point"
        onClick={() => setState({ admission: !state.admission })}
      >
        <li>Admission</li>
        {state.admission ? (
          <img className="icon" src={down} alt="down" />
        ) : (
          <img
            className="icon"
            onClick={() => setState({ admission: !state.admission })}
            src={left}
            alt="down"
          />
        )}
      </div>

      {state.admission ? (
        <ul className="sub__ul active">
          <PermissionCheck permission={admission.access}>
            <Link to="/admission/index">
              <li
                className={sidebar === ADMISSIONINDEX ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(ADMISSIONINDEX));
                  setSideBar(ADMISSIONINDEX);
                }}
              >
                Admission
              </li>
            </Link>
          </PermissionCheck>

          <PermissionCheck permission={admission.applyAdmissionStatus}>
            <Link to="/admission/status">
              <li
                className={sidebar === ADMISSIONAPPY ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(ADMISSIONAPPY));
                  setSideBar(ADMISSIONAPPY);
                }}
              >
                Admission status(Admin)
              </li>
            </Link>
          </PermissionCheck>

          <PermissionCheck permission={admission.applyAdmissionAdmin}>
            <Link to="/admission/applied">
              <li
                className={
                  sidebar === ADMISSIONAPPLIED ? "active py-2" : "py-2"
                }
                onClick={() => {
                  dispatch(setSideBarState(ADMISSIONAPPLIED));
                  setSideBar(ADMISSIONAPPLIED);
                }}
              >
                Applied admission(Admin)
              </li>
            </Link>
          </PermissionCheck>

          {/* <PermissionCheck permission={ROLES.ADMISSIONAPPLY}> */}
          <Link to="/admission/merchents/applied-list">
            <li
              className={
                sidebar === ADMISSIONMERCHENTSAPPLIEDLIST
                  ? "active py-2"
                  : "py-2"
              }
              onClick={() => {
                dispatch(setSideBarState(ADMISSIONMERCHENTSAPPLIEDLIST));
                setSideBar(ADMISSIONMERCHENTSAPPLIEDLIST);
              }}
            >
              Merchent Applied admission
            </li>
          </Link>
          {/* </PermissionCheck> */}

          <PermissionCheck permission={university.access}>
            <Link to="/admission/university">
              <li
                className={sidebar === UNIVERSITY ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(UNIVERSITY));
                  setSideBar(UNIVERSITY);
                }}
              >
                University
              </li>
            </Link>
          </PermissionCheck>

          <PermissionCheck permission={unit.access}>
            <Link to="/admission/unit">
              <li
                className={sidebar === UNIT ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(UNIT));
                  setSideBar(UNIT);
                }}
              >
                Unit
              </li>
            </Link>
          </PermissionCheck>
          <PermissionCheck permission={board.access}>
            <Link to="/admission/board">
              <li
                className={sidebar === BOARD ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(BOARD));
                  setSideBar(BOARD);
                }}
              >
                Board
              </li>
            </Link>
          </PermissionCheck>

          <PermissionCheck permission={examination.access}>
            <Link to="/admission/exam">
              <li
                className={sidebar === EXAM ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(EXAM));
                  setSideBar(EXAM);
                }}
              >
                Exam
              </li>
            </Link>
          </PermissionCheck>
          <PermissionCheck permission={group.access}>
            <Link to="/admission/group">
              <li
                className={sidebar === GROUP ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(GROUP));
                  setSideBar(GROUP);
                }}
              >
                Group
              </li>
            </Link>
          </PermissionCheck>

          <PermissionCheck permission={passing_year.access}>
            <Link to="/admission/passing_year">
              <li
                className={sidebar === PASSINGYEAR ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(PASSINGYEAR));
                  setSideBar(PASSINGYEAR);
                }}
              >
                Passing Year
              </li>
            </Link>
          </PermissionCheck>
          <PermissionCheck permission={course_duration.access}>
            <Link to="/admission/course_duration">
              <li
                className={sidebar === COURSEDURATION ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(COURSEDURATION));
                  setSideBar(COURSEDURATION);
                }}
              >
                Course Duration
              </li>
            </Link>
          </PermissionCheck>
          <PermissionCheck permission={subjects.access}>
            <Link to="/admission/subject">
              <li
                className={sidebar === SUBJECT ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(SUBJECT));
                  setSideBar(SUBJECT);
                }}
              >
                Subject
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

export default Admission;
