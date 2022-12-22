import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import UnitServices from "../../../api/adminssion/UnitServices";
import dlt_new from "../../../assets/img/icons/dlt_new.svg";
import edit_new from "../../../assets/img/icons/edit_new.svg";
import { toastifyAlertDelete } from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import PermissionCheck from "../../../components/PermissionCheck";
import SubLoader from "../../../components/SubLoader";
import { unit } from "../../../constants/rolePermission";
import { modalState } from "../../../redux/actions/modalAction";
import { unitList } from "../../../redux/actions/university/unitAction";
import InputUnit from "./inputUnit";

function UnitIndex() {
  const { unitData } = useSelector((state) => state.unit);
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
      searchName: "",
      searchValue: [],
      search: false,
    }
  );

  useEffect(() => {
    dispatch(unitList());
  }, []);

  let createButtonClicked = () => {
    setState({ modalShow: "create" });
    dispatch(modalState(true));
  };

  let editButtonClicked = (editName, id) => {
    // console.log("object :>> ", editName);
    setState({ modalShow: "edit", id: id, editName: editName });
    dispatch(modalState(true));
  };
  let handlePageChange = (pageNo) => {
    dispatch(unitList(pageNo));
  };

  let deleteExam = async (id) => {
    let res = await UnitServices.delete(id);
    // console.log("res :>> ", res);
    if (res.message === "Unit Deleted Successfully") {
      // console.log("examData", examData);
      dispatch(unitList(unitData.meta.current_page));
      toastifyAlertDelete(res.message, "top-center");
    }
  };

  let handleSubmit = () => {
    // console.log("state.searchName :>> ", state.searchName, state.search);
    let { data } = unitData;

    console.log("data :>> ", data[0]);
    if (state.searchName) {
      // let val = data.filter((user) => user?.user.email == state.searchName);
      // // console.log("data :>> ", data);
      // setState({ searchValue: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  let unitShow = "";
  if (unitData?.data && !state.search) {
    unitShow = unitData?.data.map((units, index) => {
      // console.log("unit :>> ", unit);
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{units.name}</h4>
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex">
              <PermissionCheck permission={unit.delete}>
                <img
                  src={dlt_new}
                  className="c_point"
                  alt="sfd"
                  onClick={() => deleteExam(units.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={unit.edit}>
                <img
                  src={edit_new}
                  alt="edit"
                  className="c_point"
                  onClick={() => editButtonClicked(units.name, units.id)}
                />
              </PermissionCheck>
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
  }

  let unitModule = <SubLoader />;

  if (unitData?.data) {
    unitModule = (
      <div className="university__details">
        <table className="">
          <tbody>
            <tr>
              <th style={{ width: "45%" }}>Unit name</th>
              {/* <th style={{ width: "45%" }}>Location</th> */}
              <th style={{ width: "10%" }}>Actions</th>
            </tr>

            {unitShow}
          </tbody>
        </table>
        <div className="my-5 text-center w-90 pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {unitData.meta ? (
            <Pagination
              activePage={unitData.meta.current_page}
              itemsCountPerPage={unitData.meta.per_page}
              totalItemsCount={unitData.meta.total}
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
        <PermissionCheck permission={unit.access} module={"unit"}>
          <div className="university">
            <div className="text-end create_btn">
              <PermissionCheck permission={unit.create}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createButtonClicked}
                >
                  <p>+ Create Unit</p>
                </button>
              </PermissionCheck>
            </div>

            {/* <ModalInput name={"Unit"} /> */}
            <InputUnit
              modalShow={state.modalShow}
              pageNo={unitData?.meta?.last_page || state.pageNo}
              editName={state.editName}
              id={state.id}
            />

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="w-50">Unit List</h3>
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
              {unitModule}
            </div>
          </div>
        </PermissionCheck>
      </Dashboard>
    </div>
  );
}

export default UnitIndex;
