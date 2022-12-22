import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import QuotaServices from "../../../api/job/QuotaServices";
import dlt_new from "../../../assets/img/icons/dlt_new.svg";
import edit_new from "../../../assets/img/icons/edit_new.svg";
import { toastifyAlertDelete } from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import PermissionCheck from "../../../components/PermissionCheck";
import { quota } from "../../../constants/rolePermission";
import { quotaList } from "../../../redux/actions/job/quotaAction";
import { modalState } from "../../../redux/actions/modalAction";
import InputQuota from "./InputQuota";

function Quota() {
  const { quotaData } = useSelector((state) => state.quota);
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

  // console.log("quotaData", quotaData);

  let handleSubmit = async () => {
    // console.log("state.searchName :>> ", state.searchName,state.search);
    let { data } = quotaData;

    // console.log("data :>> ", data);
    if (state.searchName) {
      let val = data.filter((user) => user?.name == state.searchName);
      // console.log("data :>> ", data);
      setState({ searchValue: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(quotaList(state.pageNo));
  }, []);

  let handlePageChange = (pageNo) => {
    setState({ pageNo: pageNo });
    dispatch(quotaList(pageNo));
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
    let res = await QuotaServices.delete(id);
    if (res.message === "Quota Delete Successfully") {
      dispatch(quotaList(quotaData.meta.current_page));
      toastifyAlertDelete(res.message, "top-center");
    }
  };
  let quotaShow = "";
  if (quotaData.data && !state.search) {
    quotaShow = quotaData.data.map((exam, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{exam.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <PermissionCheck permission={quota.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deleteExam(exam.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={quota.edit}>
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
  } else if (state.search) {
    quotaShow = state.searchValue.map((exam, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{exam.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <PermissionCheck permission={quota.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deleteExam(exam.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={quota.edit}>
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
  return (
    <div>
      <Dashboard>
        <PermissionCheck permission={quota.access} module={"quota"}>
          <div className="university">
            <div className="text-end create_btn" onClick={createButtonClicked}>
              <button type="button" className="btn btn-primary">
                <p>+ Create Quota</p>
              </button>
            </div>

            <InputQuota
              name={"Quota"}
              modalShow={state.modalShow}
              pageNo={quotaData?.meta?.last_page || state.pageNo}
              editName={state.editName}
              id={state.id}
            />

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="w-50">Quota List</h3>
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
                  <div className="image"></div>
                </div>
              </div>
              <div className="university__details">
                <div className="tb__scroll">
                  <table className="">
                    <tr>
                      <th style={{ width: "45%" }}>Quota name</th>
                      <th style={{ width: "10%" }}>Actions</th>
                    </tr>
                    {quotaShow}
                  </table>
                </div>
                <div className="my-5 text-center pagination justify-content-center">
                  {/* <button className="submit_btn">See more</button> */}
                  {quotaData.meta ? (
                    <Pagination
                      activePage={quotaData.meta.current_page}
                      itemsCountPerPage={quotaData.meta.per_page}
                      totalItemsCount={quotaData.meta.total}
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

export default Quota;
