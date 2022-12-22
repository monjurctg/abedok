import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserServices from "../../../api/user/UserServices";
import { allQuotaList } from "../../../redux/actions/job/quotaAction";
import { loadingState, modalUpdate } from "../../../redux/actions/modalAction";
import { singleUser } from "../../../redux/actions/userAction";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../alert/tostifyALert";

function UserInfo({ type }) {
  const { modalUp } = useSelector((state) => state.modalValue);
  let { id } = useParams();
  // let { gradeStoreRed } = useSelector((state) => state.grade);
  let { loadingNow } = useSelector((state) => state.modalValue);
  const { quotaData } = useSelector((state) => state.quota);
  const { singleUserRed } = useSelector((state) => state.user);

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
      name: "",
      email: "",
      father_name: "",
      mother_name: "",
      mobile: "",
      quota_id: "",
      marital_status: "",
      gender: "",
      nid: "",
      user_id: id,
      birth_date: "",
      religion: "",
      passport: "",
      // height: `${state.feet}.${state.inch}`,
    }
  );

  // console.log("singleUserRed", singleUserRed);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(allQuotaList());
    dispatch(singleUser(id));
  }, []);

  let handleSubmit = async () => {
    dispatch(loadingState(true));
    let data = {
      full_name: state.name,
      email: state.email,
      father_name: state.father_name,
      mother_name: state.mother_name,
      mobile: state.mobile,
      quota_id: state.quota_id,
      marital_status: state.marital_status,
      gender: state.gender,
      nid: state.nid,
      user_id: id,
      birth_date: state.birth_date,
      religion: state.religion,
      passport: state.passport,
      height: `${state.feet}.${state.inch}`,
    };

    // console.log("data :>> ", data);

    let res = await UserServices.basicInfoStore(data);
    if (res.status === 201) {
      dispatch(loadingState(false));

      toastifyAlertSuccess("User updated", "top-center");
      dispatch(singleUser(id));
    } else {
      dispatch(loadingState(false));

      toastifyAlertError("User update error", "top-center");
    }
    // console.log("res :>> ", res);
  };
  // console.log("state.quota_id :>> ", state.quota_id);
  let quotas = "";
  if (singleUserRed?.data && quotaData?.data) {
    quotas = quotaData.data.map((q) => (
      <option key={q.id} value={q.id} selected={state?.quota_id === q.id}>
        {q.name}
      </option>
    ));
  }

  useEffect(() => {
    if (singleUserRed?.data) {
      setState({
        name: singleUserRed.data.name
          ? singleUserRed.data.name
          : singleUserRed.data?.Basic_Info.full_name
          ? singleUserRed.data?.Basic_Info.full_name
          : "",
        email: singleUserRed.data.email
          ? singleUserRed.data.email
          : singleUserRed.data?.Basic_Info.email
          ? singleUserRed.data?.Basic_Info.email
          : "",
        father_name: singleUserRed.data?.Basic_Info?.father_name,
        mother_name: singleUserRed.data?.Basic_Info?.mother_name,
        mobile:
          singleUserRed.data?.Basic_Info?.mobile || singleUserRed.data?.phone,
        quota_id: singleUserRed.data?.Basic_Info?.quota.id,
        marital_status: singleUserRed.data?.Basic_Info?.marital_status,
        gender: singleUserRed.data?.Basic_Info?.gender,
        nid: singleUserRed.data?.Basic_Info?.nid,
        user_id: id,
        birth_date: singleUserRed.data?.Basic_Info?.birth_date,
        religion: singleUserRed.data?.Basic_Info?.religion,
        passport: singleUserRed.data?.Basic_Info?.passport,
        height: singleUserRed.data?.Basic_Info?.height,
      });
    }
  }, [singleUserRed]);

  // console.log("mobile", state.mobile);
  const inputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ [name]: value });
  };

  let crossIcon = () => dispatch(modalUpdate(false));
  return (
    <div className="modal_items">
      <div
        className={`modal_content ${modalUp ? "animation" : "animationOut"} `}
      >
        <div className="modal_header">
          <h5>{type}</h5>
          <button
            type="button"
            id="crossIcon"
            onClick={crossIcon}
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
        {singleUserRed.data ? (
          <div className="modal-body">
            <label>User name</label>

            <input
              className="modal__input my-2"
              // value={inputValue}
              onChange={inputChange}
              name="name"
              type="text"
              value={state.name}
              placeholder="User name"
            />

            <label>User email</label>

            <input
              className="modal__input my-2"
              // value={inputValue}
              onChange={inputChange}
              name="email"
              type="email"
              value={state.email}
              placeholder="User email"
            />
            <label>User mobile</label>

            <input
              className="modal__input my-2"
              // value={inputValue}
              onChange={inputChange}
              value={state.mobile}
              name="mobile"
              type="tel"
              disabled
              placeholder="User phone"
              maxLength={11}
            />
            <label>Father's name</label>

            <input
              className="modal__input my-2"
              // value={inputValue}
              onChange={inputChange}
              name="father_name"
              value={state.father_name}
              type="text"
              placeholder="Father name"
            />
            {/* )} */}
            <label>Mother's name</label>

            <input
              className="modal__input my-2"
              // value={inputValue}
              onChange={inputChange}
              name="mother_name"
              type="text"
              placeholder="Mother name"
              value={state.mother_name}
            />

            <div>
              <label>Date of birth</label>
              <input
                className="modal__input my-2"
                // value={inputValue}
                value={state.birth_date}
                onChange={inputChange}
                name="birth_date"
                type="date"
                placeholder="Date of birth"
              />
            </div>
            <div>
              <label>Gender</label>

              <select
                className="modal__input my-2"
                name="gender"
                onChange={inputChange}
              >
                <option selected disabled>
                  Gender
                </option>
                <option value={1} selected={state.gender === 1}>
                  Male
                </option>
                <option value={2} selected={state.gender === 2}>
                  Female
                </option>
                <option value={3} selected={state.gender === 3}>
                  Other
                </option>
              </select>
            </div>
            <div>
              <label>Quota</label>

              <select
                className="modal__input my-2"
                name="quota_id"
                onChange={inputChange}
              >
                <option selected disabled>
                  Select quota
                </option>
                {quotas}
              </select>
            </div>
            <label>User nid</label>
            <input
              className="modal__input my-2"
              // value={inputValue}
              value={state.nid}
              onChange={inputChange}
              name="nid"
              type="number"
              placeholder="User nid"
            />

            <label>Height</label>
            <div className="d-flex justify-content-evenly">
              <input
                className="inch modal__input"
                onChange={inputChange}
                type="number"
                name="feet"
                value={state.feet}
                placeholder="Feet"
              />
              <input
                className="inch modal__input"
                type="number"
                name="inch"
                onChange={inputChange}
                value={state.inch}
                placeholder="Inch"
              />
            </div>

            <label>Passport</label>
            <input
              className="modal__input"
              type="phone"
              onChange={inputChange}
              name="passport"
              value={state.passport}
              placeholder="passport"
            />

            <label>Marital Status</label>
            <select
              name="marital_status"
              onChange={inputChange}
              className="modal__input"
            >
              <option disabled selected>
                Marital Status
              </option>
              <option value="1">Married</option>
              <option value="2">Unmarried</option>
            </select>

            <label>Religion</label>

            <select
              name="religion"
              onChange={inputChange}
              className="modal__input"
            >
              <option disabled selected>
                Religion
              </option>
              <option value="1">Islam</option>
              <option value="2">Hindu</option>
              <option value="3">Buddhist</option>
              <option value="4">Chistian</option>
              <option value="5">Others</option>
            </select>
          </div>
        ) : (
          "Loading......."
        )}
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary btn_close"
            data-bs-dismiss="modal"
            onClick={crossIcon}
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary btn__modal"
          >
            {loadingNow ? "Loading........" : type}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
