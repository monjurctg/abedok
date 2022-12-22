import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import down from "../../assets/img/icons/down.svg";
import left from "../../assets/img/icons/left.svg";
import { district, policy, term } from "../../constants/rolePermission";
import { ROLES } from "../../constants/roles";
import { SIDEBAR } from "../../constants/sidebar";
import { useAuth } from "../../context/auth";
import { setSideBarState } from "../../redux/actions/sidebarAction";
import { setSideBar } from "../../utils/auth";
import PermissionCheck from "../PermissionCheck";

function BasicInfo({ sidebar }) {
  const { BASICINFO, TERMS, POLICY, DISTRICT, PAYMENTWORKER, UPDATE } = SIDEBAR;

  const values = [BASICINFO, TERMS, POLICY, DISTRICT, PAYMENTWORKER, UPDATE];

  let dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      basicInfo: values.includes(sidebar) ? true : false,
      create: values.includes(sidebar) ? true : false,
    }
  );

  let currentUser = useAuth();

  let id = currentUser?.currentUser?.data?.id;

  return (
    <>
      <div
        className="u__create c_point"
        onClick={() => setState({ basicInfo: !state.basicInfo })}
      >
        <li>Basic info</li>
        {state.basicInfo ? (
          <img className="icon" src={down} alt="down" />
        ) : (
          <img
            className="icon"
            onClick={() => setState({ basicInfo: !state.basicInfo })}
            src={left}
            alt="down"
          />
        )}
      </div>

      {state.basicInfo ? (
        <ul className="sub__ul active">
          {/* <PermissionCheck permission={ROLES.DISTRICT}> */}
          <PermissionCheck permission={district.access}>
            <Link to="/district">
              <li
                className={sidebar === DISTRICT ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(DISTRICT));
                  setSideBar(DISTRICT);
                }}
              >
                District
              </li>
            </Link>
            {/* </PermissionCheck> */}
          </PermissionCheck>

          <PermissionCheck permission={ROLES.PAYMENTWORKER}>
            <Link to="/payment/workers">
              <li
                className={sidebar === PAYMENTWORKER ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(PAYMENTWORKER));
                  setSideBar(PAYMENTWORKER);
                }}
              >
                Payment(worker)
              </li>
            </Link>
          </PermissionCheck>

          {/* <PermissionCheck permission={ROLES.TERMS}> */}
          <PermissionCheck permission={term.access}>
            <Link to="/terms">
              <li
                className={sidebar === TERMS ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(TERMS));
                  setSideBar(TERMS);
                }}
              >
                Terms
              </li>
            </Link>
            {/* </PermissionCheck> */}
          </PermissionCheck>
          {/* <PermissionCheck permission={ROLES.POLICY}> */}
          <PermissionCheck permission={policy.access}>
            <Link to="/policy">
              <li
                className={sidebar === POLICY ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(POLICY));
                  setSideBar(POLICY);
                }}
              >
                Policy
              </li>
            </Link>
          </PermissionCheck>
          <Link to={`/user-show/${id}`}>
            <li
              className={sidebar === UPDATE ? "active py-2" : "py-2"}
              onClick={() => {
                dispatch(setSideBarState(UPDATE));
                setSideBar(UPDATE);
              }}
            >
              Update profile
            </li>
          </Link>
          {/* </PermissionCheck> */}
        </ul>
      ) : (
        ""
      )}
    </>
  );
}

export default BasicInfo;
