import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import UniversityServices from "../../../api/adminssion/UniversityServices";
import dlt_new from "../../../assets/img/icons/dlt_new.svg";
import edit_new from "../../../assets/img/icons/edit_new.svg";
import university_logo from "../../../assets/img/icons/university_logo.svg";
import { toastifyAlertDelete } from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import PermissionCheck from "../../../components/PermissionCheck";
import SubLoader from "../../../components/SubLoader";
import { university } from "../../../constants/rolePermission";
import { universityList } from "../../../redux/actions/university/universityAction";

function UniversityIndex() {
  const { universityData } = useSelector((state) => state.university);
  let dispatch = useDispatch();

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      searchName: "",
      searchData: [],
      search: false,
    }
  );

  useEffect(() => {
    dispatch(universityList());
  }, []);

  let handlePageChange = (pageNo) => {
    dispatch(universityList(pageNo));
  };

  // console.log("universityData :>> ", universityData);
  let deleteExam = async (id) => {
    let res = await UniversityServices.delete(id);
    // console.log("res :>> ", res);
    if (res.message === "University Deleted Successfully") {
      // console.log("examData", examData);
      dispatch(universityList(universityData.meta.current_page));
      toastifyAlertDelete(res.message, "top-center");
    }
  };

  let handleSubmit = async () => {
    // console.log("state.searchName :>> ", state.searchName);
    let { data } = universityData;
    console.log("data :>> ", data);
    if (state.searchName) {
      let val = data.filter(
        (filterData) =>
          filterData?.name.toLowerCase() == state.searchName.toLowerCase()
      );

      console.log("data :>> ", val);
      setState({ searchData: val, search: true });
    } else {
      setState({ search: false });
    }
  };
  let universityShow = "";
  if (universityData?.data && !state.search) {
    universityShow = universityData?.data.map((universitys, index) => {
      return (
        <tr index={index} key={index}>
          <td>
            <div className="d-flex td_details">
              <div className="image">
                <img
                  src={universitys.logo ? universitys.logo : university_logo}
                  alt="university_logo"
                />
              </div>
              <div className="align-self-center">
                <h5>{universitys.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div>
              <h4>{universitys.location}</h4>
            </div>
          </td>
          <td>
            <div className="d-flex justify-content-around">
              <PermissionCheck permission={university.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt=""
                  onClick={() => deleteExam(universitys.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={university.edit}>
                <Link to={`/admission/university/${universitys.id}/edit`}>
                  <img className="c_point" alt="" src={edit_new} />
                </Link>
              </PermissionCheck>
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    universityShow = state.searchData.map((university, index) => {
      console.log(university);
      return (
        <tr index={index} key={index}>
          <td>
            <div className="d-flex td_details">
              <div className="image">
                <img
                  src={university.logo ? university.logo : university_logo}
                  alt="university_logo"
                />
              </div>
              <div>
                <h5>{university.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div>
              <h4>{university.location}</h4>
            </div>
          </td>
          <td>
            <div className="d-flex justify-content-around">
              <img
                className="c_point"
                src={dlt_new}
                alt=""
                onClick={() => deleteExam(university.id)}
              />
              <Link to={`/admission/university/${university.id}/edit`}>
                <img className="c_point" alt="" src={edit_new} />
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  }

  let loading = <SubLoader />;

  let details = loading;
  if (universityData?.data) {
    details = (
      <div className="university__details">
        <div className="tb__scroll">
          <table className="">
            <tbody>
              <tr>
                <th style={{ width: "45%" }}>University name</th>
                <th style={{ width: "45%" }}>Location</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
              {universityShow}
            </tbody>
          </table>
        </div>
        <div className="my-5 text-center pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {universityData.meta ? (
            <Pagination
              activePage={universityData.meta.current_page}
              itemsCountPerPage={universityData.meta.per_page}
              totalItemsCount={universityData.meta.total}
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
        <PermissionCheck permission={university.access} module={"university"}>
          <div className="university">
            <PermissionCheck permission={university.create}>
              <div className="text-end create_btn">
                <Link to="/admission/university/create">
                  <button>
                    <p>+ Create University</p>
                  </button>
                </Link>
              </div>
            </PermissionCheck>

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="w-50">University List</h3>
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
              {details}
            </div>
          </div>
        </PermissionCheck>
        <ToastContainer transition={Zoom} />
      </Dashboard>
    </div>
  );
}

export default UniversityIndex;
