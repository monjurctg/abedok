import React from 'react';
import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import down from "../../assets/img/icons/down.svg";
import left from "../../assets/img/icons/left.svg";
import { user } from "../../constants/rolePermission";
import { ROLES } from "../../constants/roles";
import { SIDEBAR } from "../../constants/sidebar";
import { setSideBarState } from "../../redux/actions/sidebarAction";
import { setSideBar } from "../../utils/auth";
import PermissionCheck from "../PermissionCheck";

function User({ sidebar, show }) {
  const {
    USER,
    CREATEUSER,
    CREATEUSERADMIN,
    USERLIST,
    ALLUSERLIST,
    MERCHENTSCREATE,
    SUPARADMIN,
    MERCHENTUSERLIST,
  } = SIDEBAR;
  const values = [
    USER,
    CREATEUSERADMIN,
    CREATEUSER,
    USERLIST,
    ALLUSERLIST,
    MERCHENTSCREATE,
    SUPARADMIN,
    MERCHENTUSERLIST,
  ];
  // console.log("values :>> ", values);
  // console.log("show :>> ", show);
  let dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      user: values.includes(sidebar) ? true : false,
      create: values.includes(sidebar) ? true : false,
    }
  );

  // console.log("user :>> ");
  return (
    <>
      <div
        className="u__create c_point"
        onClick={() => setState({ user: !state.user })}
      >
        <li>User</li>
        {state.user ? (
          <img className="icon" src={down} alt="down" />
        ) : (
          <img
            className="icon"
            onClick={() => setState({ user: !state.user })}
            src={left}
            alt="down"
          />
        )}
      </div>

      {state.user ? (
        <ul className="sub__ul active">
          <PermissionCheck permission={user.create}>
            <>
              <div className="sub__li">
                <li
                  className="my-2 c_point"
                  onClick={() => {
                    setSideBar(USER);
                    setState({ create: !state.create });
                  }}
                >
                  Create User
                </li>

                {state.create ? (
                  <img
                    className="icon c_point"
                    onClick={() => setState({ create: !state.create })}
                    src={down}
                    alt="down"
                  />
                ) : (
                  <img
                    className="icon c_point"
                    onClick={() => setState({ create: !state.create })}
                    // onClick={() => dispatch(setSideBarState(AD.CREATE_USER))}
                    src={left}
                    alt="down"
                  />
                )}
              </div>
              {state.create ? (
                <ul className="">
                  <PermissionCheck permission={user.create}>
                    <Link to="/user/create/merchents">
                      <li
                        className={
                          sidebar === MERCHENTSCREATE ? "active py-2" : "py-2"
                        }
                        onClick={() => {
                          dispatch(setSideBarState(MERCHENTSCREATE));
                          setSideBar(MERCHENTSCREATE);
                        }}
                      >
                        Create Merchents
                      </li>
                    </Link>
                  </PermissionCheck>

                  <PermissionCheck permission={user.create}>
                    <Link to="/user/create/user">
                      <li
                        className={
                          sidebar === CREATEUSERADMIN ? "active py-2" : "py-2"
                        }
                        onClick={() => {
                          dispatch(setSideBarState(CREATEUSERADMIN));
                          setSideBar(CREATEUSERADMIN);
                        }}
                      >
                        Create User
                      </li>
                    </Link>
                  </PermissionCheck>
                </ul>
              ) : (
                ""
              )}
            </>
          </PermissionCheck>

          <PermissionCheck permission={USERLIST}>
            <Link to="/user/index">
              <li
                className={sidebar === USERLIST ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(USERLIST));
                  setSideBar(USERLIST);
                }}
              >
                MerchentList
              </li>
            </Link>
            <Link to="/user/all-user">
              <li
                className={sidebar === ALLUSERLIST ? "active py-2" : "py-2"}
                onClick={() => {
                  dispatch(setSideBarState(ALLUSERLIST));
                  setSideBar(ALLUSERLIST);
                }}
              >
                All user list
              </li>
            </Link>
          </PermissionCheck>
          <PermissionCheck permission={ROLES.USERLIST}>
            <Link to="/user/merchent">
              <li
                className={
                  sidebar === MERCHENTUSERLIST ? "active py-2" : "py-2"
                }
                onClick={() => {
                  dispatch(setSideBarState(MERCHENTUSERLIST));
                  setSideBar(MERCHENTUSERLIST);
                }}
              >
                Your User List
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

export default User;
