import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import Swal from "sweetalert2";
import AdmissionServices from "../../../api/adminssion/AdmissionServices";
import JobCircularServices from "../../../api/job/JobCircularServices";
import UserServices from "../../../api/user/UserServices";
import Dashboard from "../../../components/layout/Dashboard";
import SubLoader from "../../../components/SubLoader";
import { appliedAdmissionList } from "../../../redux/actions/university/admissionAction";
import {
  merchentList,
  merchentUserList,
} from "../../../redux/actions/userAction";

function MerchentListIndex() {
  const { merchentsData } = useSelector((state) => state.user);
  let { id, method, system } = useParams();
  console.log("method :>> ", system);
  const navigate = useNavigate();

  // console.log("merchentsData :>> ", merchentsData);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      searchName: "",
      modalShow: "",
      searchData: [],
      search: false,
    }
  );
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(merchentList());
    // dispatch(roleList());
  }, []);

  //   const handleRoleChange = (options) => {
  //     console.log("options", options);
  //     // const districtArray = [];
  //     // options.map((option) => districtArray.push(option.value));
  //     setState({
  //       roles: options.value,
  //     });
  //   };

  // console.log("roleValues :>> ", roleValues);
  const inputChange = async (e, id) => {
    let data = {
      roles: e.target.value,
      user: id,
    };
  };

  // let showModal = (id) => {
  //   setState({ modalShow: "userShow", id: id });
  //   dispatch(modalState(true));
  // };

  // let handleSubmit = async () => {
  //   dispatch(userList({ name: state.searchName }));
  // };
  let handleSubmit = () => {
    // console.log("state.searchName :>> ", state.searchName, state.search);
    let { data } = merchentsData;

    console.log("data :>> ", data[0].phone);
    if (state.searchName) {
      let val = data.filter(
        (user) =>
          user?.email == state.searchName || user?.phone == state.searchName
      );
      // console.log("data :>> ", data);
      setState({ searchData: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  let transferOption = async (id, user_id) => {
    let data = {
      merchant_id: id,
      user_id,
    };
    let res = await UserServices.transferUser(user_id, data);

    if (res.status === 201) {
      Swal.fire("Transfered!", "User has been transfered.", "success");
      dispatch(merchentUserList());
      setTimeout(() => {
        navigate("/user/merchent");
      }, 2000);
    } else {
      Swal.fire("Error!", "Not transfered.", "error");
    }
    // console.log("res :>> ", res);
  };

  let transferPaymentOption = async (id, job_id) => {
    if (system === "job") {
      let data = {
        merchant_id: id,
        job_id,
      };
      let res = await JobCircularServices.paymentTransfer(data, job_id);

      if (res.status === 201) {
        Swal.fire("Transfered!", "Payment has been transfered.", "success");
        dispatch(merchentUserList());
        setTimeout(() => {
          navigate("/job/circular/applied");
        }, 2000);
      } else {
        Swal.fire("Error!", "Not transfered.", "error");
      }
    } else {
      let data = {
        merchant_id: id,
        admission_id: job_id,
      };
      let res = await AdmissionServices.paymentTransfer(data, job_id);

      if (res.status === 201) {
        Swal.fire("Transfered!", "Payment has been transfered.", "success");

        dispatch(appliedAdmissionList());
        setTimeout(() => {
          navigate("/admission/applied");
        }, 2000);
      } else {
        Swal.fire("Error!", "Not transfered.", "error");
      }
    }

    // console.log("res :>> ", res);
  };

  const transferUser = async (id, user_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Transfer user!",
    }).then((result) => {
      // console.log("result :>> ", result);
      if (result.isConfirmed) {
        transferOption(id, user_id);
      }
    });
  };

  const transferPayment = async (id, job_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Transfer Payment!",
    }).then((result) => {
      // console.log("result :>> ", result);
      if (result.isConfirmed) {
        transferPaymentOption(id, job_id);
      }
    });
  };

  let examShow = "";
  if (merchentsData?.data?.length > 0 && !state.search) {
    examShow = merchentsData?.data.map((exam, index) => {
      return (
        <tr index={index} key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.commission}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.email}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.phone}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.balance}</h5>
              </div>
            </div>
          </td>
          {/* <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.service_fee}</h5>
              </div>
            </div>
          </td> */}

          <td>
            <>
              {method === "transfer" ? (
                <button
                  className="btn btn-primary smallBtn c_point mx-2"
                  onClick={() => transferUser(exam.id, id)}
                >
                  Transfer
                </button>
              ) : (
                <button
                  className="btn btn-primary smallBtn c_point mx-2"
                  onClick={() => transferPayment(exam.id, id)}
                >
                  Payment
                </button>
              )}
            </>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    examShow = state?.searchData.map((exam, index) => {
      return (
        <tr index={index} key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.name}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.commission}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.email}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.phone}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.balance}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.service_fee}</h5>
              </div>
            </div>
          </td>

          <td>
            <>
              {method === "transfer" ? (
                <button
                  className="btn btn-primary smallBtn c_point mx-2"
                  onClick={() => transferUser(exam.id, id)}
                >
                  Transfer
                </button>
              ) : (
                <button
                  className="btn btn-primary smallBtn c_point mx-2"
                  onClick={() => transferPayment(exam.id, id)}
                >
                  Payment
                </button>
              )}
            </>
          </td>
        </tr>
      );
    });
  }

  let userModule = <SubLoader />;
  if (merchentsData?.data) {
    userModule = (
      <div className="university__details">
        <div>
          <div className="tb__scroll">
            <table className="">
              <tbody>
                <tr>
                  <th>Name</th>
                  <th>Comission</th>

                  <th>Email</th>

                  <th>Phone</th>
                  <th>Balance</th>
                  {/* <th>Service fee</th> */}

                  <th>Actions</th>
                </tr>
                {examShow}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="my-5 text-center pagination justify-content-center">
        {merchentsData?.meta ? (
          <Pagination
            activePage={merchentsData?.meta.current_page}
            itemsCountPerPage={merchentsData?.meta.per_page}
            totalItemsCount={merchentsData?.meta.total}
            pageRangeDisplayed={10}
            onChange={handlePageChange}
            itemClass="page-item"
            linkClass="page-link"
          />
        ) : (
          ""
        )}
      </div> */}
      </div>
    );
  }
  return (
    <div>
      <Dashboard>
        <div className="university">
          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Merchent List</h3>
              <div
                className="university_texts_input d-flex"
                style={{ columnGap: "10px" }}
              >
                <input
                  type={"search"}
                  placeholder="Search"
                  name="search"
                  value={state.searchName}
                  className="mr-4"
                  onChange={(e) => {
                    setState({ searchName: e.target.value });
                    // handleSubmit();
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
              </div>
            </div>
            {userModule}
          </div>
        </div>
        <ToastContainer transition={Zoom} />
      </Dashboard>
    </div>
  );
}

export default MerchentListIndex;
