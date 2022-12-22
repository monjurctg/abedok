import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import GradeServices from "../../../api/job/GradeServices";
import dlt_new from "../../../assets/img/icons/dlt_new.svg";
import edit_new from "../../../assets/img/icons/edit_new.svg";
import { toastifyAlertDelete } from "../../../components/alert/tostifyALert";
// import gradesList from '../../redux/actions/gradeAction';
import Dashboard from "../../../components/layout/Dashboard";
import PermissionCheck from "../../../components/PermissionCheck";
import SubLoader from "../../../components/SubLoader";
import { grade } from "../../../constants/rolePermission";
import { gradesList } from "../../../redux/actions/job/gradeAction";
import { modalState } from "../../../redux/actions/modalAction";
import InputGrade from "./InputGrade";

// import { gradesList } from "../../redux/actions/gradeAction";

function Grade() {
  const { gradeList } = useSelector((state) => state.grade);

  // console.log("gradeList", gradeList);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      pageNo: 1,
      searchName: "",
      filterData: [],
      search: false,
    }
  );

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(gradesList());
  }, []);

  let handlePageChange = (pageNo) => {
    setState({ pageNo: pageNo });
    dispatch(gradeList(pageNo));
  };

  let createButtonClicked = () => {
    setState({ modalShow: "create" });
    dispatch(modalState(true));
  };

  let editButtonClicked = (editName, id) => {
    setState({ modalShow: "edit", id: id, editName: editName });
    dispatch(modalState(true));
  };

  let deleteExam = async (id) => {
    let res = await GradeServices.delete(id);
    // console.log("res :>> ", res);
    if (res.message === "Grade Delete Successfully") {
      dispatch(gradesList(gradeList?.meta?.current_page));
      toastifyAlertDelete(res.message, "top-center");
    }
  };
  // let handleSubmit = async () => {
  //   dispatch(userList({ name: state.searchName }));
  // };

  // console.log("filterdaata>>", state.filterData);
  let handleSubmit = async () => {
    // console.log("state.searchName :>> ", state.searchName, state.search);
    let { data } = gradeList;

    // console.log("data :>> ", data);
    if (state.searchName) {
      let val = data.filter((user) => user?.name == state.searchName);
      // console.log("data :>> ", data);
      setState({ filterData: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  let gradeShow = <SubLoader />;

  if (gradeList.data && !state.search) {
    gradeShow = gradeList.data.map((exam, index) => {
      return (
        <tr index={index} key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{exam.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <img
                className="c_point"
                src={dlt_new}
                alt="c_point"
                onClick={() => deleteExam(exam.id)}
              />
              <img
                className="c_point ml-2"
                alt="c_point"
                src={edit_new}
                onClick={() => editButtonClicked(exam.name, exam.id)}
              />
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    gradeShow = state.filterData?.map((exam, index) => {
      // console.log(exam, "exam");
      return (
        <tr index={index} key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{exam.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <PermissionCheck permission={grade.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deleteExam(exam.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={grade.delete}>
                <img
                  className="c_point ml-2"
                  alt="c_point"
                  src={edit_new}
                  onClick={() => editButtonClicked(exam.name, exam.id)}
                />
              </PermissionCheck>
            </div>
          </td>
        </tr>
      );
    });
  }

  let module = <SubLoader />;
  if (gradeList.data) {
    module = (
      <div className="university__details">
        <div className="tb__scroll">
          <table className="">
            <tbody>
              <tr>
                <th style={{ width: "45%" }}>Grade name</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
              {gradeShow}
            </tbody>
          </table>
        </div>
        <div className="my-5 text-center w-90 pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {gradeList.meta ? (
            <Pagination
              activePage={gradeList.meta.current_page}
              itemsCountPerPage={gradeList.meta.per_page}
              totalItemsCount={gradeList.meta.total}
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
        <PermissionCheck permission={grade.access} module={"grade"}>
          <div className="university">
            <div className="text-end create_btn">
              <PermissionCheck permission={grade.create}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createButtonClicked}
                >
                  <p>+ Create Grade</p>
                </button>
              </PermissionCheck>
            </div>

            <InputGrade
              modalShow={state.modalShow}
              pageNo={gradeList?.meta?.last_page || state.pageNo}
              editName={state.editName}
              id={state.id}
            />

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="w-50">Grade List</h3>
                <div
                  className="university_texts_input d-flex"
                  style={{ columnGap: "10px" }}
                >
                  <input
                    type="search"
                    placeholder="Search by name"
                    name="name"
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
              {module}
            </div>
          </div>
        </PermissionCheck>
      </Dashboard>
    </div>
  );
}

export default Grade;
