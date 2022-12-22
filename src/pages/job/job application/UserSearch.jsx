import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import railway from "../../../assets/img/railway.svg";
import searchIcon from "../../../assets/img/sidebar/search_icon.svg";
import Dashboard from "../../../components/layout/Dashboard";
import SubLoader from "../../../components/SubLoader";
import { userListForJob } from "../../../redux/actions/userAction";

function UserSearch() {
  const { eligibleUserJob } = useSelector((state) => state.user);
  let { id } = useParams();
  // console.log("id :>> ", id);
  // console.log("eligibleUserAdmissiondsfsffs :>> ", eligibleUserJob);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      searchName: "",
      searchUser: [],
      search: false,
    }
  );
  let dispatch = useDispatch();

  useEffect(() => {
    let search = null;
    let pageNo = null;
    dispatch(userListForJob(search, pageNo, id));
  }, []);

  let handlePageChange = (pageNo) => {
    console.log("pageNo :>> ", pageNo);
    let search = null;
    setState({ search: false });

    dispatch(userListForJob(search, pageNo, id));
  };

  let handleSubmit = async () => {
    // console.log("state.searchName :>> ", state.searchName);
    // let { data } = eligibleUserAdmission;
    if (state.searchName) {
      let data = eligibleUserJob.data.filter(
        (user) => (user?.phone || user.Basic_Info?.mobile) == state.searchName
      );
      // console.log("data :>> ", data);
      setState({ searchUser: data, search: true });
    } else {
      setState({ search: false });
    }
  };

  // let applyAdmission = async (user_id, admission_id) => {
  //   let data = { admission_id, user_id };
  //   let res = await AdmissionServices.apply(data);
  //   // console.log("res :>> ", res);
  //   if (res.status === 404) {
  //     toastifyAlertError(res.data.message, "top-center");
  //   }

  //   // console.log("res :>> ", res);
  // };
  let users = <SubLoader />;

  if (eligibleUserJob?.data && !state.search) {
    users = eligibleUserJob.data.map((user, index) => {
      // console.log("user :>> ", user);
      return (
        <div key={index} className="col-md-6">
          <div className="users">
            <div className="image">
              <img src={user.documents?.pp_photo} alt="Profile pic" />
            </div>
            <div className="words">
              <div className="details">
                <h4>Name:</h4>
                <h5>
                  {user.name
                    ? user.name
                    : user?.Basic_Info?.name || "Mobile User"}
                </h5>
              </div>
              <div className="details">
                <h4>Email:</h4>
                <h5>
                  {user.email
                    ? user.email
                    : user?.Basic_Info?.email || "Mobile User"}
                </h5>
              </div>
              <div className="details">
                <h4>User phone</h4>
                <h5>
                  {user.phone
                    ? user.phone
                    : user?.Basic_Info?.mobile || "Mobile User"}
                </h5>
              </div>

              <Link to={`/applied-job/user-show/${user.id}`}>
                <p className="text-center apply">User Details</p>
              </Link>
            </div>
            <div className="small__btn">
              <Link to={`/payment/apply/job/${id}/${user.id}`}>
                <button
                  className="active"
                  // onClick={() => applyAdmission(user.id, id)}
                >
                  Apply
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  } else if (state.search) {
    // console.log("data :>> ", state.search);
    users = state.searchUser.map((user, index) => {
      return (
        <div key={index} className="col-md-6">
          <div className="users">
            <div>
              <img src={railway} />
            </div>
            <div className="words">
              <h5 className="my-2">
                {user.name
                  ? user.name
                  : user?.Basic_Info?.name || "Mobile User"}
              </h5>
              <h5>{user.phone || "Mobile User"}</h5>

              <h5 className="my-2">
                {user.email
                  ? user.email
                  : user?.Basic_Info?.email || "Mobile Email"}
              </h5>
              <Link to={`/applied-job/user-show/${user.id}`}>
                <p className="text-center">User Details</p>
              </Link>
            </div>

            <div className="small__btn">
              <Link to={`/payment/apply/${id}/${user.id}`}>
                <button
                  className="active"
                  // onClick={() => applyAdmission(user.id, id)}
                >
                  Apply
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }
  // else {
  //   users = <h4>No user</h4>;
  // }

  return (
    <div>
      <Dashboard>
        <div className="job__application user__search">
          <div className="user__input__div">
            <label>Search By phone</label>
            <div className="search__bar my-3">
              <input
                type="search"
                placeholder="Search by phone"
                name="name"
                value={state.searchName}
                onChange={(e) => {
                  setState({ searchName: e.target.value });
                }}
              />
              <img src={searchIcon} alt="searchIcon" onClick={handleSubmit} />
            </div>
          </div>

          <div className="users_div">
            <div className="row gy-5">{users}</div>
            <div className="my-5 text-center w-90 pagination justify-content-center">
              {/* <button className="submit_btn">See more</button> */}
              {eligibleUserJob?.meta ? (
                <Pagination
                  activePage={eligibleUserJob?.meta.current_page}
                  itemsCountPerPage={eligibleUserJob?.meta.per_page}
                  totalItemsCount={eligibleUserJob?.meta.total}
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
        </div>
        <ToastContainer transition={Zoom} />
      </Dashboard>
    </div>
  );
}

export default UserSearch;
