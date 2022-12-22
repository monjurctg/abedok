import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SubjectServices from "../../../api/adminssion/SubjectServices";
import dlt_new from "../../../assets/img/icons/dlt_new.svg";
import edit_new from "../../../assets/img/icons/edit_new.svg";
import { toastifyAlertDelete } from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import PermissionCheck from "../../../components/PermissionCheck";
import SubLoader from "../../../components/SubLoader";
import { subjects } from "../../../constants/rolePermission";
import { modalState } from "../../../redux/actions/modalAction";
import { subjectList } from "../../../redux/actions/university/subjectAction";
import SubjectInput from "./SubjectInput";

function SubjectIndex() {
  const { subjectData } = useSelector((state) => state.subject);
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
      searchName: "",
      searchData: [],
      search: false,
    }
  );

  useEffect(() => {
    dispatch(subjectList(state.pageNo));
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
    dispatch(subjectList(pageNo));
  };

  let deletepassingYear = async (id) => {
    let res = await SubjectServices.delete(id);
    // console.log("res :>> ", res);
    if (res.message === "Subjects Delete Successfully") {
      // console.log("examData", examData);
      dispatch(subjectList(subjectData.meta.current_page));
      toastifyAlertDelete(res.message, "top-center");
    }
  };

  let handleSubmit = () => {
    // console.log("state.searchName :>> ", state.searchName, state.search);
    let { data } = subjectData;

    // console.log("data :>> ", data[0]);
    if (state.searchName) {
      let val = data.filter((subject) => subject?.name == state.searchName);
      console.log("data :>> ", val);
      setState({ searchData: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  let subjectShow = "";
  if (subjectData?.data && !state.search) {
    subjectShow = subjectData.data.map((subject, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{subject.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{subject.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <PermissionCheck permission={subjects.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deletepassingYear(subject.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={subjects.edit}>
                <Link
                  to={`/admission/subject/edit/${subject.id}/${state.pageNo}`}
                >
                  <img src={edit_new} alt="" />
                </Link>
              </PermissionCheck>
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    subjectShow = state.searchData.map((subject, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{subject.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{subject.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <PermissionCheck permission={subjects.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deletepassingYear(subject.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={subjects.edit}>
                <Link
                  to={`/admission/subject/edit/${subject.id}/${state.pageNo}`}
                >
                  <img src={edit_new} alt="" />
                </Link>
              </PermissionCheck>
            </div>
          </td>
        </tr>
      );
    });
  }

  let subjectTable = <SubLoader />;
  if (subjectData?.data) {
    subjectTable = (
      <div className="university__details">
        <div className="tb__scroll">
          <table className="">
            <tbody>
              <tr>
                <th style={{ width: "45%" }}>Subject name</th>
                <th style={{ width: "45%" }}>Major</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
              {subjectShow}
            </tbody>
          </table>
        </div>
        <div className="my-5 text-center pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {subjectData.meta ? (
            <Pagination
              activePage={subjectData.meta.current_page}
              itemsCountPerPage={subjectData.meta.per_page}
              totalItemsCount={subjectData.meta.total}
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
        <PermissionCheck permission={subjects.access} module={"Search"}>
          <div className="university">
            <div className="text-end create_btn">
              <PermissionCheck permission={subjects.create}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createButtonClicked}
                >
                  <p>+ Create Subject</p>
                </button>
              </PermissionCheck>
            </div>

            <SubjectInput
              modalShow={state.modalShow}
              pageNo={subjectData?.meta?.last_page || state.pageNo}
              editName={state.editName}
              id={state.id}
            />

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="w-50">Subject List</h3>
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
              {subjectTable}
            </div>
          </div>
        </PermissionCheck>
      </Dashboard>
    </div>
  );
}

export default SubjectIndex;
