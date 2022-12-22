import React from 'react';
import { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import PassingYearServices from "../../../api/adminssion/PassingYearServices";
import dlt_new from "../../../assets/img/icons/dlt_new.svg";
import edit_new from "../../../assets/img/icons/edit_new.svg";
import { toastifyAlertDelete } from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import PermissionCheck from "../../../components/PermissionCheck";
import SubLoader from "../../../components/SubLoader";
import { passing_year } from "../../../constants/rolePermission";
import { modalState } from "../../../redux/actions/modalAction";
import { passingYearList } from "../../../redux/actions/university/passingYearAction";
import PassingYearInput from "./PassingYearInput";

function PassingYearIndex() {
  const { passingYearData } = useSelector((state) => state.passingYear);
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
    dispatch(passingYearList(state.pageNo));
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
    dispatch(passingYearList(pageNo));
  };

  let deletepassingYear = async (id) => {
    let res = await PassingYearServices.delete(id);
    // console.log("res :>> ", res);
    if (res.message === "Passing Year Delete Successfully") {
      // console.log("examData", examData);
      dispatch(passingYearList(passingYearData.meta.current_page));
      toastifyAlertDelete(res.message, "top-center");
    }
  };

  let handleSubmit = () => {
    // console.log("state.searchName :>> ", state.searchName, state.search);
    let { data } = passingYearData;

    // console.log("data :>> ", data[0]);
    if (state.searchName) {
      let val = data.filter((year) => year?.name == state.searchName);
      // console.log("data :>> ", val);
      setState({ searchData: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  let passingYearShow = "";
  if (passingYearData.data && !state.search) {
    passingYearShow = passingYearData.data.map((passingYear, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{passingYear.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <PermissionCheck permission={passing_year.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deletepassingYear(passingYear.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={passing_year.edit}>
                <img
                  className="c_point ml-2"
                  // type="button"
                  // className="btn btn-primary"

                  alt="c_point"
                  src={edit_new}
                  onClick={() =>
                    editButtonClicked(passingYear.name, passingYear.id)
                  }
                />
              </PermissionCheck>
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    passingYearShow = state.searchData?.map((passingYear, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{passingYear.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <PermissionCheck permission={passing_year.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deletepassingYear(passingYear.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={passing_year.edit}>
                <img
                  className="c_point ml-2"
                  // type="button"
                  // className="btn btn-primary"

                  alt="c_point"
                  src={edit_new}
                  onClick={() =>
                    editButtonClicked(passingYear.name, passingYear.id)
                  }
                />
              </PermissionCheck>
            </div>
          </td>
        </tr>
      );
    });
  }

  let passingYearModule = <SubLoader />;
  if (passingYearData?.data) {
    passingYearModule = (
      <div className="university__details">
        <table className="">
          <tbody>
            <tr>
              <th style={{ width: "45%" }}>Passing Year name</th>
              {/* <th style={{ width: "45%" }}>Location</th> */}
              <th style={{ width: "10%" }}>Actions</th>
            </tr>
            {passingYearShow}
          </tbody>
        </table>
        <div className="my-5 text-center w-90 pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {passingYearData.meta ? (
            <Pagination
              activePage={passingYearData.meta.current_page}
              itemsCountPerPage={passingYearData.meta.per_page}
              totalItemsCount={passingYearData.meta.total}
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
          permission={passing_year.access}
          module={"passingYear"}
        >
          <div className="university">
            <div className="text-end create_btn" onClick={createButtonClicked}>
              <PermissionCheck permission={passing_year.create}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createButtonClicked}
                >
                  <p>+ Create Passing Year</p>
                </button>
              </PermissionCheck>
            </div>

            <PassingYearInput
              modalShow={state.modalShow}
              pageNo={passingYearData?.meta?.last_page || state.pageNo}
              editName={state.editName}
              id={state.id}
            />

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="">Passing Year List</h3>
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
              {passingYearModule}
            </div>
          </div>
        </PermissionCheck>
      </Dashboard>
    </div>
  );
}

export default PassingYearIndex;
