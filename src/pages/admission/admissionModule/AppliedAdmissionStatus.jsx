import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dashboard from "../../../components/layout/Dashboard";
import SubLoader from "../../../components/SubLoader";
import { modalState } from "../../../redux/actions/modalAction";
import { appliedAdmissionList } from "../../../redux/actions/university/admissionAction";

function AppliedAdmissionStatus() {
  const { appliedAdmissionListRed } = useSelector((state) => state.admission);
  // console.log("appliedAdmissionListRed", appliedAdmissionListRed);
  let dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      admission_id: "",
      pageNo: 1,
      searchName: "",
      searchData: [],
      search: false,
    }
  );

  let handleSubmit = async () => {
    // console.log("state.searchName :>> ", state.searchName);
    let { data } = appliedAdmissionListRed;

    console.log("data :>> ", data);
    if (state.searchName) {
      let val = data.filter(
        (filterData) =>
          filterData?.user?.email.toLowerCase() ==
            state.searchName.toLowerCase() ||
          filterData?.user?.phone == state.searchName
      );
      // console.log("data :>> ", val);
      setState({ searchData: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  let style = {
    borderRadius: "5px",
    width: "100%",
    background: "crimson",
    color: "white",
    padding: "10px",
    boxShadow: "-6px 2px 16px 0px #9e9e9ead",
    cursor: "pointer",
  };

  useEffect(() => {
    dispatch(appliedAdmissionList());
  }, []);

  let showModal = (data, id, admission_id) => {
    setState({ modalShow: data, id: id, admission_id: admission_id });
    dispatch(modalState(true));
  };

  let unitShow = "";
  if (appliedAdmissionListRed?.data && !state.search) {
    unitShow = appliedAdmissionListRed?.data.map((unit, index) => {
      // console.log("unit :>> ", unit);
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{unit.Admission_Title?.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{unit.Admission_Title?.application_end}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{unit.Admission_Title?.required_group.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>
                  {unit.user?.name
                    ? unit.user?.name
                    : unit.user?.Basic_Info?.full_name || "Mobile user"}
                </h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>
                  {unit.user?.email
                    ? unit.user?.email
                    : unit.user?.Basic_Info.email || "Mobile user"}
                </h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>
                  {unit.user?.phone
                    ? unit.user?.phone
                    : unit.user?.Basic_Info?.phone}
                </h5>
              </div>
            </div>
          </td>

          {/* <td>
            <div className="td_details text-center">
              <Link
                to={
                  unit.admission_status === 0
                    ? `/user/index/${unit.id}/payment/admission`
                    : ""
                }
              >
                <div style={style}>
                  <h5>{unit.admission_status === 0 ? "Transfer" : "Done"}</h5>
                </div>
              </Link>
            </div>
          </td>
          <td>
            <div className="td_details">
              <div style={style}>
                <h5>{unit.sent === 0 ? "Not send" : "Sended"}</h5>
              </div>
              {/* </Link> */}
          {/* </div>
          </td> */}

          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{unit.current_status || "Null"}</h5>
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{unit.roll || "Null"}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex columnGap">
              <Link to={`/applied-job/user-show/${unit?.user?.id}`}>
                <div className=" create_btn">
                  <button type="button" className="btn btn-primary smallBtn">
                    <p>User</p>
                  </button>
                </div>
              </Link>
              <Link to={`/admission/applied/${unit.id}/status/`}>
                <div className=" create_btn">
                  <button type="button" className="btn btn-primary smallBtn">
                    <p>Status</p>
                  </button>
                </div>
              </Link>

              {/* <Link to={`/admission/applied/${unit.id}/status/`}> */}
              <div className=" create_btn ">
                <button
                  type="button"
                  className="btn btn-primary smallBtn"
                  onClick={() =>
                    showModal(
                      "addAdmission",
                      unit?.id,
                      unit?.Admission_Title?.id
                    )
                  }
                >
                  <p>Roll</p>
                </button>
              </div>
              {/* </Link> */}
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    unitShow = state?.searchData?.map((unit, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{unit.Admission_Title?.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{unit.Admission_Title?.application_end}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{unit.Admission_Title?.required_group.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>
                  {unit.User_Name?.name
                    ? unit.User_Name?.name
                    : unit.User_Name?.Basic_Info?.full_name || "Mobile user"}
                </h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>
                  {unit.user?.email
                    ? unit.user?.email
                    : unit.user?.Basic_Info.email || "Mobile user"}
                </h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{unit.user?.phone ? unit.user?.phone : ""}</h5>
              </div>
            </div>
          </td>

          {/* <td>
            <div className="td_details text-center">
              <Link
                to={
                  unit.admission_status === 0
                    ? `/user/index/${unit.id}/payment/admission`
                    : ""
                }
              >
                <div style={style}>
                  <h5>{unit.admission_status === 0 ? "Transfer" : "Done"}</h5>
                </div>
              </Link>
            </div>
          </td>
          <td>
            <div className="td_details">
              <div style={style}>
                <h5>{unit.sent === 0 ? "Not send" : "Sended"}</h5>
              </div>
              {/* </Link> */}
          {/* </div>
          </td> */}

          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{unit.current_status || "Null"}</h5>
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{unit.roll || "Null"}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex columnGap">
              <Link to={`/applied-job/user-show/${unit?.user?.id}`}>
                <div className=" create_btn">
                  <button type="button" className="btn btn-primary smallBtn">
                    <p>User</p>
                  </button>
                </div>
              </Link>
              <Link to={`/admission/applied/${unit.id}/status/`}>
                <div className=" create_btn">
                  <button type="button" className="btn btn-primary smallBtn">
                    <p>Status</p>
                  </button>
                </div>
              </Link>

              {/* <Link to={`/admission/applied/${unit.id}/status/`}> */}
              <div className=" create_btn ">
                <button
                  type="button"
                  className="btn btn-primary smallBtn"
                  onClick={() =>
                    showModal(
                      "addAdmission",
                      unit?.id,
                      unit?.Admission_Title?.id
                    )
                  }
                >
                  <p>Roll</p>
                </button>
              </div>
              {/* </Link> */}
            </div>
          </td>
        </tr>
      );
    });
  }

  let appliedModule = <SubLoader />;

  if (appliedAdmissionListRed?.data) {
    appliedModule = (
      <div className="university__details">
        <div className="tb__scroll">
          <table className="">
            <tbody>
              <tr>
                <th>Admission title</th>
                <th>Application end</th>
                <th>Group</th>
                <th>User</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>

                <th>Roll</th>

                <th>Actions</th>
              </tr>

              {unitShow}
            </tbody>
          </table>
        </div>
        <div className="my-5 text-center w-90 pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {appliedAdmissionListRed.meta ? (
            <Pagination
              activePage={appliedAdmissionListRed.meta.current_page}
              itemsCountPerPage={appliedAdmissionListRed.meta.per_page}
              totalItemsCount={appliedAdmissionListRed.meta.total}
              pageRangeDisplayed={5}
              // onChange={handlePageChange}
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
          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Applied Admission List Status</h3>
              <div
                className="university_texts_input d-flex"
                style={{ columnGap: "10px" }}
              >
                <input
                  type={"search"}
                  placeholder="Search"
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
            {appliedModule}
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export default AppliedAdmissionStatus;
