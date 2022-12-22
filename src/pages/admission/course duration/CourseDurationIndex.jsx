import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import CourseDurationServices from "../../../api/adminssion/CourseDurationServices";
import dlt_new from "../../../assets/img/icons/dlt_new.svg";
import edit_new from "../../../assets/img/icons/edit_new.svg";
import { toastifyAlertDelete } from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import PermissionCheck from "../../../components/PermissionCheck";
import SubLoader from "../../../components/SubLoader";
import { course_duration } from "../../../constants/rolePermission";
import { modalState } from "../../../redux/actions/modalAction";
import { courseDurationList } from "../../../redux/actions/university/courseDurationAction";
import CourseDurationInput from "./CourseDurationInput";

function CourseDurationIndex() {
  const { courseDurationData } = useSelector((state) => state.course);
  let dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      pageNo: 1,
      modalShow: false,
    }
  );

  useEffect(() => {
    dispatch(courseDurationList(state.pageNo));
  }, []);

  let createButtonClicked = () => {
    setState({ modalShow: "create" });
    dispatch(modalState(true));
  };

  let editButtonClicked = (editName, id) => {
    setState({ modalShow: "edit", id: id, editName: editName });
    dispatch(modalState(true));
  };
  let handlePageChange = (pageNo) => {
    setState({ pageNo: pageNo });
    dispatch(courseDurationList(pageNo));
  };

  let deletepassingYear = async (id) => {
    let res = await CourseDurationServices.delete(id);
    // console.log("res :>> ", res);
    if (res.message === "Course Duration Delete Successfully") {
      // console.log("examData", examData);
      dispatch(courseDurationList(courseDurationData.meta.current_page));
      toastifyAlertDelete(res.message, "top-center");
    }
  };

  let courseDurationShow = "";
  if (courseDurationData.data) {
    courseDurationShow = courseDurationData.data.map(
      (courseDuration, index) => {
        return (
          <tr key={index}>
            <td>
              <div className="d-flex td_details">
                <div>
                  <h4>{courseDuration.name}</h4>
                </div>
              </div>
            </td>
            <td>
              <div className="d-flex">
                <PermissionCheck permission={course_duration.delete}>
                  <img
                    className="c_point"
                    src={dlt_new}
                    alt="c_point"
                    onClick={() => deletepassingYear(courseDuration.id)}
                  />
                </PermissionCheck>
                <PermissionCheck permission={course_duration.edit}>
                  <img
                    className="c_point ml-2"
                    // type="button"
                    // className="btn btn-primary"

                    alt="c_point"
                    src={edit_new}
                    onClick={() =>
                      editButtonClicked(courseDuration.name, courseDuration.id)
                    }
                  />
                </PermissionCheck>
              </div>
            </td>
          </tr>
        );
      }
    );
  }

  let courseModule = <SubLoader />;
  if (courseDurationData.data) {
    courseModule = (
      <div className="university__details">
        <table className="">
          <tbody>
            <tr>
              <th style={{ width: "45%" }}>Course Duration</th>
              {/* <th style={{ width: "45%" }}>Location</th> */}
              <th style={{ width: "10%" }}>Actions</th>
            </tr>
            {courseDurationShow}
          </tbody>
        </table>
        <div className="my-5 text-center w-90 pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {courseDurationData.meta ? (
            <Pagination
              activePage={courseDurationData.meta.current_page}
              itemsCountPerPage={courseDurationData.meta.per_page}
              totalItemsCount={courseDurationData.meta.total}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
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
        <PermissionCheck
          permission={course_duration.access}
          module={"courseDuration"}
        >
          <div className="university">
            <div className="text-end create_btn">
              <PermissionCheck permission={course_duration.create}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createButtonClicked}
                >
                  <p>+ Create Course Duration</p>
                </button>
              </PermissionCheck>
            </div>

            <CourseDurationInput
              modalShow={state.modalShow}
              pageNo={courseDurationData?.meta?.last_page || state.pageNo}
              editName={state.editName}
              id={state.id}
            />

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="w-50">Course Duration List</h3>
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
              {courseModule}
            </div>
          </div>
        </PermissionCheck>
      </Dashboard>
    </div>
  );
}

export default CourseDurationIndex;
