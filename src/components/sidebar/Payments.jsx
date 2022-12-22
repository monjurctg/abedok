import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import down from "../../assets/img/icons/down.svg";
import left from "../../assets/img/icons/left.svg";
import { ROLES } from "../../constants/roles";
import { SIDEBAR } from "../../constants/sidebar";
import { setSideBarState } from "../../redux/actions/sidebarAction";
import { setSideBar } from "../../utils/auth";
import PermissionCheck from "../PermissionCheck";

function Payments({ sidebar }) {
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
      payment: values.includes(sidebar) ? true : false,
      create: values.includes(sidebar) ? true : false,
    }
  );

  return (
    <>
      <div
        className="u__create c_point"
        onClick={() => {
          setState({ payment: !state.payment });
          setSideBar(JOB);
        }}
      >
        {/* <div className="sub__li pt-2"> */}
        <li>Payments</li>
        {state.payment ? (
          <img className="icon" src={down} alt="down" />
        ) : (
          <img
            className="icon"
            onClick={() => setState({ payment: !state.payment })}
            src={left}
            alt="down"
          />
        )}
      </div>

      {state.payment ? (
        <ul className="sub__ul active">
          {/* <PermissionCheck permission={ROLES.POST}> */}
          <Link to="/job/payment/marchent">
            <li
              className={sidebar === PAYMENTMARCHENTS ? "active py-2" : "py-2"}
              onClick={() => {
                dispatch(setSideBarState(PAYMENTMARCHENTS));
                setSideBar(PAYMENTMARCHENTS);
              }}
            >
              Payment(Marchents)
            </li>
          </Link>
          {/* </PermissionCheck> */}

          <PermissionCheck permission={ROLES.POST}>
            <Link to="/job/payment/admin">
              <li
                className={sidebar === PAYMENTADMIN ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(PAYMENTADMIN));
                  setSideBar(PAYMENTADMIN);
                }}
              >
                Payment(Admin)
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

export default Payments;
