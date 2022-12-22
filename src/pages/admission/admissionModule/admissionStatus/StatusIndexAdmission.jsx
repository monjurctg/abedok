import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import AdmissionServices from "../../../../api/adminssion/AdmissionServices";
import { toastifyAlertSuccess } from "../../../../components/alert/tostifyALert";
import Dashboard from "../../../../components/layout/Dashboard";
import SubLoader from "../../../../components/SubLoader";
import { modalState } from "../../../../redux/actions/modalAction";
import { singleAppliedAdmissionList } from "../../../../redux/actions/university/admissionAction";

function StatusIndexAdmission() {
  // console.log("departments", unitData);
  let dispatch = useDispatch();

  const { singleAppliedAdmission } = useSelector((state) => state.admission);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      pageNo: 1,
      data: null,
    }
  );
  const { applied } = useParams();
  // console.log("object :>> ", applied);

  // console.log("state.short_name :>> ", singleAppliedAdmission);
  useEffect(() => {
    dispatch(singleAppliedAdmissionList(applied));
  }, []);

  const changeStatus = async (id) => {
    let res = await AdmissionServices.admissionStatusChange(id);
    if (res.status === 201) {
      toastifyAlertSuccess(res.data.message, "top-center");
      dispatch(singleAppliedAdmissionList(applied));
    }
    // console.log("res :>> ", res);
  };

  let createButtonClicked = () => {
    setState({ modalShow: "create" });
    dispatch(modalState(true));
  };

  let unitShow = <SubLoader />;
  if (singleAppliedAdmission?.admisssionStatus) {
    unitShow = singleAppliedAdmission?.admisssionStatus.map((unit, index) => {
      // console.log("unit :>> ", unit);
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit.short_name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit.description}</h4>
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex td_details">
              <div style={{ width: "50%" }}>
                <img
                  style={{ maxWidth: "100px" }}
                  src={unit?.file}
                  alt="No image"
                />
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex td_details">
              <div>
                {unit.active === 1 ? (
                  <div className="small__btn">
                    <button
                      className="active"
                      onClick={() => changeStatus(unit.id)}
                    >
                      Active
                    </button>
                  </div>
                ) : (
                  <div className="small__btn">
                    <button
                      className="active"
                      onClick={() => changeStatus(unit.id)}
                    >
                      Deactive
                    </button>
                  </div>
                )}
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex">
              {/* admission/applied/:applied/status/:id */}
              <Link to={`/admission/applied/${applied}/status/${unit.id}`}>
                <div className="small__btn">
                  <button className="active">Update</button>
                </div>
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  }
  return (
    <div>
      <Dashboard>
        <div className="university">
          {/* admission/applied/:applied/status */}
          <Link to={`/admission/applied/${applied}/status/create`}>
            <div className="text-end create_btn">
              <button type="button" className="btn btn-primary">
                <p>+ Create Status</p>
              </button>
            </div>
          </Link>
          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Status List</h3>
              <div
                className="university_texts_input d-flex"
                style={{ columnGap: "10px" }}
              >
                <input type={"search"} placeholder="Search" />
                <div className=" create_btn">
                  <button
                    style={{ padding: "10px 25px" }}
                    type="button"
                    className="btn btn-primary smallBtn"
                  >
                    <p>Search</p>
                  </button>
                </div>
                <div className="image">{/* <img src={search} /> */}</div>
              </div>
            </div>
            <div className="university__details">
              <table className="">
                <tbody>
                  <tr>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Status</th>

                    <th>Actions</th>
                  </tr>

                  {unitShow}
                </tbody>
              </table>
              <div className="my-5 text-center w-90 pagination justify-content-center">
                {/* <button className="submit_btn">See more</button> */}
                {state.data?.meta ? (
                  <Pagination
                    activePage={state.data.meta.current_page}
                    itemsCountPerPage={state.data.meta.per_page}
                    totalItemsCount={state.data.meta.total}
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
            <ToastContainer transition={Zoom} />
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export default StatusIndexAdmission;
