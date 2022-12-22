import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DistrictServices from "../../api/district/DistrictServices";
// import dlt_new from "../../../../assets/img/icons/dlt_new.svg";
// import edit_new from "../../../../assets/img/icons/edit_new.svg";
import dlt_new from "../../assets/img/icons/dlt_new.svg";
import edit_new from "../../assets/img/icons/edit_new.svg";
import { toastifyAlertSuccess } from "../../components/alert/tostifyALert";
import Dashboard from "../../components/layout/Dashboard";
import PermissionCheck from "../../components/PermissionCheck";
import { district } from "../../constants/rolePermission";
import { districtList } from "../../redux/actions/basicInfo/districtAction";
import { modalState } from "../../redux/actions/modalAction";
import DistrictInput from "./DistrictInput";

function DistrictIndex() {
  const { districtData } = useSelector((state) => state.district);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      searchName: "",
      searchValue: [],
      search: false,
    }
  );
  // console.log("departments", districtData);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(districtList());
  }, []);

  let handlePageChange = (pageNo) => {
    console.log("object :>> ", pageNo);
    dispatch(districtList(pageNo));
  };

  let deletePolicy = async (id) => {
    let res = await DistrictServices.delete(id);
    if (res.message === "Board Delete Successfully") {
      toastifyAlertSuccess(res.message, "top-center");
      dispatch(districtList());
    }
  };

  let createButtonClicked = () => {
    setState({ modalShow: "create" });
    dispatch(modalState(true));
  };

  let editButtonClicked = (editName, id) => {
    setState({ modalShow: "edit", id: id, editName: editName });
    dispatch(modalState(true));
  };

  let handleSubmit = async () => {
    console.log("state.searchName :>> ", state.searchName, state.search);
    let { data } = districtData;

    console.log("data :>> ", data);
    if (state.searchName) {
      let val = data.filter((user) => user?.name == state.searchName);
      // console.log("data :>> ", data);
      setState({ searchValue: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  let districtShow = "";
  if (districtData?.data && !state.search) {
    districtShow = districtData?.data.map((districts, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{districts.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>
                  {districts.upazilas.map((upazila) => upazila.name + ",")}
                </h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <PermissionCheck permission={district.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deletePolicy(districts.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={district.edit}>
                <Link to={`/district/upazila/edit/${districts.id}/1`}>
                  <img
                    className="c_point ml-2"
                    // type="button"
                    // className="btn btn-primary"

                    alt="c_point"
                    src={edit_new}
                    // onClick={() => editButtonClicked(district.name, district.id)}
                  />
                </Link>
              </PermissionCheck>
            </div>
          </td>
        </tr>
      );
    });
  }
  if (state.search) {
    districtShow = state.searchValue?.map((district, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{district.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{district.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <img
                className="c_point"
                src={dlt_new}
                alt="c_point"
                onClick={() => deletePolicy(district.id)}
              />
              <Link to={`/district/upazila/edit/${district.id}/1`}>
                <img
                  className="c_point ml-2"
                  // type="button"
                  // className="btn btn-primary"

                  alt="c_point"
                  src={edit_new}
                  // onClick={() => editButtonClicked(district.name, district.id)}
                />
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
        <PermissionCheck permission={district.access} module={"district"}>
          <div className="university">
            <div className="text-end create_btn">
              <PermissionCheck permission={district.create}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createButtonClicked}
                >
                  <p>+ Create District</p>
                </button>
              </PermissionCheck>
            </div>

            {/* <ModalInput name={"District"} /> */}
            <DistrictInput
              name={"Discrict"}
              pageNo={districtData?.meta?.last_page || 1}
              modalShow={state.modalShow}
              editName={state.editName}
              id={state.id}
            />

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="w-50">District List</h3>
                <div
                  className="university_texts_input d-flex"
                  style={{ columnGap: "10px" }}
                >
                  <input
                    type="search"
                    placeholder="Search by Name"
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
              <div className="university__details">
                <div className="tb__scroll">
                  <table className="">
                    <tbody>
                      <tr>
                        <th style={{ width: "45%" }}>District name</th>
                        <th style={{ width: "45%" }}>Upazila</th>
                        <th style={{ width: "10%" }}>Actions</th>
                      </tr>
                      {districtShow}
                    </tbody>
                  </table>
                </div>

                <div className="my-5 text-center pagination justify-content-center">
                  {/* <button className="submit_btn">See more</button> */}
                  {districtData?.meta ? (
                    <Pagination
                      activePage={districtData.meta.current_page}
                      itemsCountPerPage={districtData.meta.per_page}
                      totalItemsCount={districtData.meta.total}
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
            </div>
          </div>
        </PermissionCheck>
      </Dashboard>
    </div>
  );
}

export default DistrictIndex;
