import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import JobApplyServices from "../../../api/job/JobApplied";
import { toastifyAlertSuccess } from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import { modalState } from "../../../redux/actions/modalAction";

function StatusIndex() {
  // console.log("departments", unitData);
  let dispatch = useDispatch();
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
  const { id } = useParams();

  let singleUniversityData = async () => {
    let res = await JobApplyServices.singleList(id);
    // console.log("res :>> ", res.data.data);
    if (res.status === 200) {
      setState({
        short_name: res.data.data.appliedJobStatus.short_name,
        description: res.data.data.appliedJobStatus.description,
        file: res.data.data.appliedJobStatus.file,
        data: res.data.data,
      });
    }
    // console.log("res :>> ", res);
  };
  // console.log("state.short_name :>> ", state.short_name);
  useEffect(() => {
    singleUniversityData();
  }, []);

  const changeStatus = async (id) => {
    let res = await JobApplyServices.changeStatus(id);
    if (res.status === 201) {
      toastifyAlertSuccess(res.data.message, "top-center");
      singleUniversityData();
    }
    // console.log("res :>> ", res);
  };

  let createButtonClicked = () => {
    setState({ modalShow: "create" });
    dispatch(modalState(true));
  };

  //   let editButtonClicked = (editName, id) => {
  //     // console.log("object :>> ", editName);
  //     setState({ modalShow: "edit", id: id, editName: editName });
  //     dispatch(modalState(true));
  //   };
  //   let handlePageChange = (pageNo) => {
  //     dispatch(unitList(pageNo));
  //   };

  //   let deleteExam = async (id) => {
  //     let res = await UnitServices.delete(id);
  //     // console.log("res :>> ", res);
  //     if (res.message === "Unit Deleted Successfully") {
  //       // console.log("examData", examData);
  //       dispatch(unitList(unitData.meta.current_page));
  //       toastifyAlertDelete(res.message, "top-center");
  //     }
  //   };

  // console.log("state.data :>> ", state.data);

  let unitShow = "";
  if (state.data) {
    unitShow = state.data?.appliedJobStatus.map((unit, index) => {
      //   console.log("unit :>> ", unit);
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
                {unit?.file ? (
                  <img
                    style={{ maxWidth: "100px" }}
                    src={unit.file}
                    alt="No image"
                  />
                ) : (
                  "No image"
                )}
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
                      // onClick={() => applyAdmission(user.id, id)}
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
              <Link to={`/job/circular/status/${id}/update/${unit.id}`}>
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
          {/* <Link to={`/job/circular/status/${id}/create`}>
            <div className="text-end create_btn">
              <button type="button" className="btn btn-primary">
                <p>+ Create Status</p>
              </button>
            </div>
          </Link> */}
          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Status List</h3>
              <div className="university_texts_input">
                <input type={"search"} placeholder="Search" />
                <div className="image">{/* <img src={search} /> */}</div>
              </div>
            </div>
            <div className="university__details">
              <table className="">
                <tbody>
                  <tr>
                    <th>Status name</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Status</th>
                    <th>Status Update</th>
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

export default StatusIndex;
