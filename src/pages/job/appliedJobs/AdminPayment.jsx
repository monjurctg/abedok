import React, { useEffect, useReducer } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import JobCircularServices from '../../../api/job/JobCircularServices';
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from '../../../components/alert/tostifyALert';
import Dashboard from '../../../components/layout/Dashboard';
import Index from '../../../components/modal/updateModal/Index';
import { MemoUserEditModal } from '../../../components/modal/UserEditModal';
import SubLoader from '../../../components/SubLoader';
import { appliedJobsList, paymentAdmin } from '../../../redux/actions/job/jobs';
import { modalState, modalUpdate } from '../../../redux/actions/modalAction';
import InputJobCircular from '../job circular/InputJobCircular';

function AdminPayment() {
  //   const { jobMerchents } = useSelector((state) => state.jobCircular);
  const { paymentAdminData } = useSelector((state) => state.jobCircular);

  console.log('paymentAdminData', paymentAdminData);
  let dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      appliedJobId: '',
      editName: '',
      pageNo: 1,
      searchName: '',
      searchValue: [],
      search: false,
      type: 'Payment',
    }
  );

  useEffect(() => {
    // dispatch(appliedJobsListMerchents());
    dispatch(paymentAdmin());
  }, []);

  let style = {
    borderRadius: '5px',
    width: '100%',
    background: 'crimson',
    color: 'white',
    padding: '10px',
    boxShadow: '-6px 2px 16px 0px #9e9e9ead',
    cursor: 'pointer',
  };

  // console.log("state.fee", state.fee);
  let showModalPaid = (status, id, fee, user_id) => {
    setState({ appliedJobId: id, fee: fee, userId: user_id });
    status === 0 ? dispatch(modalUpdate(true)) : dispatch(modalUpdate(false));
  };
  //   let showModal = (data, id) => {
  //     setState({ modalShow: data, id: id });
  //     dispatch(modalState(true));
  //   };

  let createButtonClicked = () => {
    setState({ modalShow: 'create' });
    dispatch(modalState(true));
  };

  let handlePageChange = (pageNo) => {
    dispatch(appliedJobsList(pageNo));
  };

  let payNonPaid = async (id, status) => {
    if (status === 0) {
      let res = await JobCircularServices.adminPaymentUpdate(id);
      if (res.status === 201) {
        toastifyAlertSuccess(res.data.message, 'top-center');
        dispatch(paymentAdmin());
      } else {
        toastifyAlertError('Payment not updated', 'top-center');
      }
    }
    // console.log("res :>> ", res);
  };

  let handleSubmit = async () => {
    // console.log("state.searchName :>> ", state.searchName, state.search);
    let { data } = paymentAdminData;
    console.log(data[0].users, 'user');

    console.log('data :>> ', data);
    if (state.searchName) {
      let val = data.filter((user) => user?.users?.email == state.searchName);
      console.log('data :>> ', val);
      setState({ searchValue: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  // console.log("state.appliedJobId", state.appliedJobId);
  let unitShow = '';
  if (paymentAdminData?.data && !state.search) {
    unitShow = paymentAdminData?.data.map((unit, index) => {
      // console.log("unit :>> ", unit);
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit?.job?.name || 'Not job'}</h4>
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit?.admission?.name || 'Not admission'}</h4>
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit?.job?.fee || unit?.admission?.application_fee}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>
                  {unit.users?.name
                    ? unit.users.name
                    : unit.users.Basic_Info?.full_name || 'Mobile user'}
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>
                  {unit.users.email
                    ? unit.users?.email
                    : unit.users.Basic_Info?.email || 'Mobile user'}
                </h4>
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex td_details">
              <div style={style}>
                <h4 onClick={() => payNonPaid(unit.id, unit.status)}>
                  {unit?.status === 0 ? 'Not paid' : 'Paid'}
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit?.transation_number}</h4>
              </div>
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    unitShow = state.searchValue?.map((unit, index) => {
      // console.log("unit :>> ", unit);
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit?.job?.name || 'Not job'}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit?.admission?.name || 'Not admission'}</h4>
              </div>
            </div>
          </td>

          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit?.job?.fee}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>
                  {unit?.users?.name
                    ? unit.users.name
                    : unit.users.Basic_Info?.full_name || 'Mobile user'}
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>
                  {unit?.users?.email
                    ? unit.users?.email
                    : unit.users.Basic_Info?.email || 'Mobile user'}
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div style={style}>
                <h4
                  onClick={() =>
                    showModalPaid(unit.status, unit.id, unit.fee, unit.user.id)
                  }
                >
                  {unit.status === 0 ? 'Not paid' : 'Paid'}
                </h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{unit?.transation_number}</h4>
              </div>
            </div>
          </td>
        </tr>
      );
    });
  }
  let unitModal = <SubLoader />;
  if (paymentAdminData?.data) {
    unitModal = (
      // {unitShow}
      <div className="university__details" >
        <div>
          <div className="tb__scroll" >
            <table className="" style={{width:'1290px'}}>
              <tbody>
                <tr>
                  <th>Date And Time</th>
                  <th>Customer_ID</th>
                  <th>Customer Name</th>
                  <th>Phone</th>
                  <th>Post</th>
                  <th>Ministry</th>
                  <th>Application Fee</th>
                  <th>Service Fee</th>
                  <th>Payment Type</th>
                  <th>Transaction ID</th>
                  <th>Status</th>
                  <th>Invoice</th>
                  <th>Invoice Action</th>

                </tr>
                {unitShow}
              </tbody>
            </table>
          </div>
        </div>
        <div className="my-5 text-center  pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {paymentAdminData.meta ? (
            <Pagination
              activePage={paymentAdminData.meta.current_page}
              itemsCountPerPage={paymentAdminData.meta.per_page}
              totalItemsCount={paymentAdminData.meta.total}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
  return (
    <div>
      <Dashboard>
        {state.modalShow == 'show' ? (
          <InputJobCircular
            modalShow={state.modalShow}
            editName={state.editName}
            id={state.id}
          />
        ) : (
          <MemoUserEditModal
            appliedJobId={state.appliedJobId}
            type={state.type}
            fee={state.fee}
          >
            <Index
              type={state.type}
              appliedJobId={state.appliedJobId}
              fee={state.fee}
              user_id={state.userId}
            />
          </MemoUserEditModal>
        )}

        {/* <ModalUserShow /> */}
        <div className="university">
          {/* <div className="text-end create_btn" onClick={createButtonClicked}>
            <button type="button" className="btn btn-primary">
              <p>+ Add roll</p>
            </button>
          </div> */}
          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Admin Payments</h3>
              <div
                className="university_texts_input d-flex"
                style={{ columnGap: '10px' }}
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
                    style={{ padding: '10px 25px' }}
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

export default AdminPayment;
