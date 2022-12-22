import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../../components/layout/Dashboard";
import SubLoader from "../../components/SubLoader";
import { workerPayments } from "../../redux/actions/basicInfo/payments";

function WorkerPayment() {
  const { workerData } = useSelector((state) => state.payment);
  const methods = ["wallet", "bkash", "rocket", "card", "nagad"];
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
    dispatch(workerPayments());
  }, []);

  let handlePageChange = (pageNo) => {
    dispatch(workerPayments(pageNo));
  };

  let handleSubmit = async () => {
    console.log("state.searchName :>> ", state.searchName, state.search);
    let { data } = workerData;

    console.log("data :>> ", data);
    if (state.searchName) {
      let val = data.filter(
        (user) => user?.payments.users?.name == state.searchName
      );
      // console.log("data :>> ", data);
      setState({ searchValue: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  let unitShow = "";
  if (workerData?.data && !state.search) {
    unitShow = workerData?.data.map((unit, index) => {
      //   console.log("unit :>> ", unit);
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit?.payments.users?.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit?.payments?.job?.name}</h4>
              </div>
            </div>
          </td>{" "}
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit?.payments.balance || 0}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>Active</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{methods[unit?.payments.methods - 1]}</h4>
              </div>
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    unitShow = state.searchValue?.map((unit, index) => {
      //   console.log("unit :>> ", unit);
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit?.payments.users?.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit?.payments?.job?.name}</h4>
              </div>
            </div>
          </td>{" "}
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit?.payments.balance || 0}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>Active</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{methods[unit?.payments.methods - 1]}</h4>
              </div>
            </div>
          </td>
        </tr>
      );
    });
  }
  let unitModal = <SubLoader />;
  if (workerData?.data) {
    unitModal = (
      <div className="university__details">
        <div className="tb__scroll">
          <table className="">
            <tbody>
              <tr>
                <th>User name</th>
                <th>Job name</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Method</th>
              </tr>

              {unitShow}
            </tbody>
          </table>
        </div>
        <div className="my-5 text-center w-90 pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {workerData.meta ? (
            <Pagination
              activePage={workerData.meta.current_page}
              itemsCountPerPage={workerData.meta.per_page}
              totalItemsCount={workerData.meta.total}
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
        {/* <ModalUserShow /> */}
        <div className="university">
          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Worker payment List</h3>
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
            {unitModal}
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export default WorkerPayment;
