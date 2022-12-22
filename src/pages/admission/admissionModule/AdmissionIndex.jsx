import React, { useEffect, useMemo, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import AdmissionServices from "../../../api/adminssion/AdmissionServices";
import dlt_new from "../../../assets/img/icons/dlt_new.svg";
import edit_new from "../../../assets/img/icons/edit_new.svg";
import view from "../../../assets/img/icons/view.svg";
import {
  toastifyAlertDelete,
  toastifyAlertSuccess,
} from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import PermissionCheck from "../../../components/PermissionCheck";
import SubLoader from "../../../components/SubLoader";
import { admission } from "../../../constants/rolePermission";
import { modalState } from "../../../redux/actions/modalAction";
import {
  activeAdminssionList,
  adminssionList,
  changeStatus,
} from "../../../redux/actions/university/admissionAction";
import { JobType } from "../../job/job circular/jobTypes";
import InputAdmission from "./InputAdmission";

function AdmissionIndex() {
  const { admissionData, admissionStatusRed } = useSelector(
    (state) => state.admission
  );
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      pageNo: 1,
      active: false,
      searchName: "",
      searchData: [],
      search: false,
    }
  );
  // console.log("admissionStatusRed :>> ", admissionStatusRed);
  let getType = (type) => {
    let jobT = "";
    Object.keys(JobType).map((job) => {
      if (job === type) {
        jobT = JobType[job];
      }
    });

    return jobT;
  };
  let deleteExam = async (id) => {
    let res = await AdmissionServices.delete(id);
    // console.log("res :>> ", res);
    if (res.message === "Admission Deleted Successfully") {
      // console.log("examData", examData);
      state.active
        ? dispatch(activeAdminssionList(admissionData?.meta.current_page))
        : dispatch(adminssionList(admissionData?.meta.current_page));
      toastifyAlertDelete(res.message, "top-center");
    }
  };

  let dispatch = useDispatch();

  let activeAdmission = () => {
    dispatch(activeAdminssionList(state.pageNo));
    setState({ active: true });
  };

  let changeStatusOfExam = (e, id) => {
    e.preventDefault();
    dispatch(changeStatus(id));
  };

  useMemo(() => {
    toastifyAlertSuccess(admissionStatusRed.message, "top-center");
    state.active
      ? dispatch(activeAdminssionList(state.pageNo))
      : dispatch(adminssionList(state.pageNo));
  }, [admissionStatusRed]);

  let deactiveAdmission = () => {
    dispatch(adminssionList(state.pageNo));
    setState({ active: false });
  };

  useEffect(() => {
    dispatch(adminssionList(state.pageNo));
  }, []);

  let handlePageChange = (pageNo) => {
    setState({ pageNo: pageNo });
    dispatch(adminssionList(pageNo));
  };

  let showModal = (id) => {
    setState({ modalShow: "show", id: id });
    dispatch(modalState(true));
  };
  let examShow = <SubLoader />;

  const handleSubmit = () => {
    let { data } = admissionData;

    if (state.searchName) {
      // console.log("data :>> ", data);
      let val = data.filter(
        (filterData) =>
          filterData?.university?.name.toLowerCase() ==
            state.searchName.toLowerCase() ||
          filterData?.name.toLowerCase() == state.searchName.toLowerCase()
      );

      // console.log("data :>> ", val);
      setState({ searchData: val, search: true });
    } else {
      setState({ search: false });
    }
  };
  // console.log("admissionData :>> ", admissionData);
  if (admissionData?.data && !state.search) {
    examShow = admissionData.data.map((exam, index) => {
      return (
        <tr index={index} key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.university.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.application_start}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.application_end}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.exam_time}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>
                  {exam.current_status?.type
                    ? getType(exam.current_status?.type)
                    : "No status"}
                </h5>
              </div>
            </div>
          </td>
          <td>
            <div className="td_details">
              <div>
                <h5 className="text-center">{exam.eligible_user}</h5>
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex">
              <PermissionCheck permission={admission.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deleteExam(exam.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={admission.edit}>
                <Link to={`/admission/edit/${exam.id}`}>
                  <img
                    className="c_point ml-2"
                    alt="c_point"
                    src={edit_new}
                    // onClick={() => editButtonClicked(exam.name, exam.id)}
                  />
                </Link>
              </PermissionCheck>
              <PermissionCheck permission={admission.view}>
                <img
                  className="c_point ml-2"
                  alt="c_point"
                  style={{ width: "30px" }}
                  src={view}
                  onClick={() => showModal(exam.id)}
                />
              </PermissionCheck>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div className=" create_btn">
                <button type="button" className="btn btn-primary smallBtn">
                  {exam.status === 1 ? (
                    <p onClick={(e) => changeStatusOfExam(e, exam.id)}>
                      Active
                    </p>
                  ) : (
                    <p onClick={(e) => changeStatusOfExam(e, exam.id)}>
                      Disabled
                    </p>
                  )}
                </button>
              </div>
            </div>
          </td>
          <td>
            <div className=" create_btn">
              {exam.status === "1" ? (
                <Link to={`/admission/apply/${exam.id}`}>
                  <button type="button" className="btn btn-primary smallBtn">
                    <p>Apply</p>
                  </button>
                </Link>
              ) : (
                <button
                  style={{ opacity: "0.5" }}
                  type="button"
                  className="btn btn-primary smallBtn"
                >
                  <p>Apply</p>
                </button>
              )}
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    examShow = state.searchData?.map((exam, index) => {
      return (
        <tr index={index} key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.university.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.application_start}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.application_end}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.exam_time}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>
                  {exam.current_status?.type
                    ? getType(exam.current_status?.type)
                    : "No status"}
                </h5>
              </div>
            </div>
          </td>

          <td>
            <div className="td_details">
              <div>
                <h5 className="text-center">{exam.eligible_user}</h5>
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex">
              <PermissionCheck permission={admission.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deleteExam(exam.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={admission.edit}>
                <Link to={`/admission/edit/${exam.id}`}>
                  <img
                    className="c_point ml-2"
                    alt="c_point"
                    src={edit_new}
                    // onClick={() => editButtonClicked(exam.name, exam.id)}
                  />
                </Link>
              </PermissionCheck>
              <PermissionCheck permission={admission.view}>
                <img
                  className="c_point ml-2"
                  alt="c_point"
                  style={{ width: "30px" }}
                  src={view}
                  onClick={() => showModal(exam.id)}
                />
              </PermissionCheck>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div className=" create_btn">
                <button type="button" className="btn btn-primary smallBtn">
                  {exam.status === 1 ? (
                    <p onClick={(e) => changeStatusOfExam(e, exam.id)}>
                      Active
                    </p>
                  ) : (
                    <p onClick={(e) => changeStatusOfExam(e, exam.id)}>
                      Disabled
                    </p>
                  )}
                </button>
              </div>
            </div>
          </td>
          <td>
            <div className=" create_btn">
              {exam.status === 1 ? (
                <Link to={`/admission/apply/${exam.id}`}>
                  <button type="button" className="btn btn-primary smallBtn">
                    <p>Apply</p>
                  </button>
                </Link>
              ) : (
                <button
                  style={{ opacity: "0.5" }}
                  type="button"
                  className="btn btn-primary smallBtn"
                >
                  <p>Apply</p>
                </button>
              )}
            </div>
          </td>
        </tr>
      );
    });
  }

  // console.log("adminssionList?.data :>> ", adminssionList);
  let admissionModule = <SubLoader />;
  if (admissionData?.data) {
    admissionModule = (
      <div className="university__list my-4">
        <div className="my-3 university_texts">
          <h3 className="w-50">Admission List</h3>
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
                style={{ padding: "10px 25px", marginRight: "5px" }}
                type="button"
                className="btn btn-primary smallBtn"
                onClick={handleSubmit}
              >
                <p>Search</p>
              </button>
            </div>
            <div className="image">{/* <img src={search} /> */}</div>
          </div>
          {state.active ? (
            <div className="text-end create_btn" onClick={deactiveAdmission}>
              <button type="button" className="btn btn-primary">
                <p>Actived</p>
              </button>
            </div>
          ) : (
            <div className="text-end create_btn" onClick={activeAdmission}>
              <button type="button" className="btn btn-primary">
                <p>Active</p>
              </button>
            </div>
          )}
        </div>
        <div className="university__details">
          <div className="tb__scroll">
            <table className="">
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>university</th>
                  <th>Application start</th>
                  <th>Application End</th>
                  <th>Exam time</th>
                  <th>Current Status</th>

                  <th>Eligible user</th>

                  <th style={{ width: "10%" }}>Actions</th>

                  <th>Status</th>
                  <th>Apply</th>

                  {/* <th style={{ width: "45%" }}>Location</th> */}
                </tr>
                {examShow}
              </tbody>
            </table>
          </div>
          <div className="my-5 text-center  pagination justify-content-center">
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
        </div>
      </div>
    );
  }
  return (
    <div>
      <Dashboard>
        <PermissionCheck permission={admission.access} module={"admission"}>
          <div className="university">
            <div className="text-end create_btn">
              <Link to={"/admission/create"}>
                <button
                  type="button"
                  className="btn btn-primary"
                  // onClick={createButtonClicked}
                >
                  <p>+ Create Admission</p>
                </button>
              </Link>
            </div>

            <InputAdmission
              modalShow={state.modalShow}
              pageNo={admissionData?.meta?.last_page || state.pageNo}
              editName={state.editName}
              id={state.id}
            />

            {admissionModule}
          </div>
        </PermissionCheck>
        <ToastContainer transition={Zoom} />
      </Dashboard>
    </div>
  );
}

export default AdmissionIndex;
