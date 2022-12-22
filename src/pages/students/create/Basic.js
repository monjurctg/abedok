import React, { useEffect, useMemo, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import UserServices from "../../../api/user/UserServices.jsx";
import female from "../../../assets/img/icons/female.svg";
import male from "../../../assets/img/icons/male.svg";
import { toastifyAlertSuccess } from "../../../components/alert/tostifyALert.jsx";
import SubLoader from "../../../components/SubLoader.jsx";
import { allQuotaList } from "../../../redux/actions/job/quotaAction.jsx";
import { loadingState } from "../../../redux/actions/modalAction.jsx";
import { singleUser } from "../../../redux/actions/userAction.jsx";

function Basic() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { singleUserRed } = useSelector((state) => state.user);
  const { quotaData } = useSelector((state) => state.quota);
  let { loadingNow } = useSelector((state) => state.modalValue);

  useEffect(() => {
    dispatch(singleUser(id));
    dispatch(allQuotaList());
  }, []);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      full_name: "",
      father_name: "",
      mother_name: "",
      birth_date: "",
      gender: 1,
      height: "",
      religion: "",
      marital_status: "",
      nid: "",
      mobile: "",
      quota_id: "",
      errorsBasic: { ff_quota: "", nid: "", marital_status: "" },
    }
  );

  // console.log('singleUserRed.data', singleUserRed.data)

  useMemo(() => {
    setState({
      full_name: singleUserRed?.data?.name,
      mobile: singleUserRed?.data?.phone,
      // father_name: singleUserRed?.data?.Basic_Info?.father_name,
      // mother_name: singleUserRed?.data?.Basic_Info?.mother_name,
      // nid: singleUserRed?.data?.Basic_Info?.nid,
      // gender: singleUserRed?.data?.Basic_Info?.gender||state.gender,

      email: singleUserRed?.data?.email,
    });
  }, [singleUserRed]);

  let changeGender = (value) => {
    setState({ gender: value });
  };

  const inputChange = (event) => {
    const target = event.target;
    let value = target.value;
    const name = target.name;
    setState({
      [name]: value,
    });
  };

  let quotaValues = "";
  if (quotaData?.data) {
    quotaValues = quotaData.data.map((group) => (
      <option value={group.id}>{group.name}</option>
    ));
  }
  console.log('state.gender', state.mobile?.slice(3))

  let handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loadingState(true));

    let basicInfo = {
      full_name: state.full_name,
      email: state.email,
      father_name: state.father_name,
      mother_name: state.mother_name,
      mobile: state.mobile?.slice(3),
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

    let basicRegister = await UserServices.basicInfoStore(basicInfo);
    if (basicRegister.status === 422) {
      dispatch(loadingState(false));

      // console.log("basicRegister", basicRegister);
      setState({
        errorsBasic: {
          father_name: basicRegister.data.errors?.father_name
            ? basicRegister.data.errors?.father_name[0]
            : "",
          birth_date: basicRegister.data.errors?.birth_date
            ? basicRegister.data.errors?.birth_date[0]
            : "",
          mother_name: basicRegister.data.errors?.mother_name
            ? basicRegister.data.errors?.mother_name[0]
            : "",
          religion: basicRegister.data.errors?.religion
            ? basicRegister.data.errors?.religion[0]
            : "",
          ff_quota: basicRegister.data.errors?.ff_quota
            ? basicRegister.data.errors?.ff_quota[0]
            : "",
          marital_status: basicRegister.data.errors?.marital_status
            ? basicRegister.data.errors.marital_status[0]
            : "",
          nid: basicRegister.data.errors?.nid
            ? basicRegister.data.errors?.nid[0]
            : "",
        },
      });
    } else if(basicRegister.status === 201){
      toastifyAlertSuccess("Basic Info added Successfully", "top-center");
      setState({
        full_name: "",
        email: "",
        father_name: "",
        mother_name: "",
        mobile: "",
        quota_id: "",
        marital_status: "",
        gender: "",
        nid: "",
        birth_date: "",
        religion: "",
        passport: "",
        feet: "",
        inch: "",
        height: "",
      });
      dispatch(loadingState(false));
      dispatch(singleUser(id))

      setState({
        errorsBasic: {
          ff_quota: "",
          marital_status: "",
          nid: "",
        },
      });
      setTimeout(() => {
        navigate(`/user/create/student/${id}/address`);
      }, 2000);
    }
  };

  let module = <SubLoader/>;
  if (!singleUserRed?.data?.Basic_Info) {
    module = (
      <form onSubmit={handleSubmit}>
      <div className="row profile-details">
        <div className="col-md-6">
          <label>Father's name</label>
          <input
            className="modal__input"
            name="father_name"
            value={state.father_name}
            type="text"
            required
            aria-required="true"

            onChange={inputChange}
            placeholder="Father's name*"
          />
          <span className="error_show">{state.errorsBasic.father_name}</span>
        </div>
        <div className="col-md-6">
          <label>Mother's name</label>
          <input
            className="modal__input"
            name="mother_name"
            required

            value={state.mother_name}
            type="text"
            onChange={inputChange}
            placeholder="Mother's name*"
          />
          <span className="error_show">{state.errorsBasic.mother_name}</span>
        </div>
        {/* </div> */}

        {/* <div className="inputs row gy-5"> */}
        <div className="col-md-6">
          <label>Date Of Birth</label>
          <input
            className="modal__input"
            name="birth_date"
            onChange={inputChange}
            required

            value={state.birth_date}
            type="date"
            placeholder="Date of birth*"
          />
          <span className="error_show">{state.errorsBasic.ff_quota}</span>
        </div>
        <div className="col-md-6">
          <label>Quota</label>
          <select
            name={"quota_id"}
            required


            onChange={inputChange}
            className="modal__input"
          >
            <option selected disabled>
              Quota
            </option>
            <option value={""}>
              No quota
            </option>
            {quotaValues}
          </select>
          <span className="error_show">{state.errorsBasic.quota_id}</span>
        </div>
        {/* </div> */}
        {/* <div className="inputs row gy-5"> */}
        <div className="col-md-6">
          <label>Religion</label>

          <select
            name="religion"
            required

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
          <span className="error_show">{state.errorsBasic.religion}</span>
        </div>

        <div className="col-md-6">
          <label>Marital Status</label>
          <select
            name="marital_status"
            required={true}

            onChange={inputChange}
            className="modal__input"
          >
            <option disabled selected>
              Marital Status
            </option>
            <option value="1">Married</option>
            <option value="2">Unmarried</option>
          </select>
          <span className="error_show">{state.errorsBasic.marital_status}</span>
        </div>
        {/* </div> */}
        {/* <div className="inputs row gy-5"> */}
        <div className="col-md-6">
          <label>National Status number*</label>
          <input
            className="modal__input"
            type="number"
            // required

            onChange={inputChange}
            name="nid"
            value={state.nid}
            placeholder="nid*"
          />
          <span className="error_show">{state.errorsBasic.nid}</span>
        </div>

        <div className="col-md-6">
          <label>Passport</label>
          <input
            className="modal__input"
            type="number"
            // required

            onChange={inputChange}
            name="passport"
            value={state.passport}
            placeholder="passport"
          />
          <span className="error_show">{state.errorsBasic.passport}</span>
        </div>

        <div className="col-md-6">
          <label>Height</label>
          <div className="d-flex justify-content-evenly">
            <input
              className="inch modal__input"
              onChange={inputChange}
              type="number"
              name="feet"
              min={"2"}
              max={"7"}
              value={state.feet}
              placeholder="Feet"
            />
            <input
              className="inch modal__input"
              type="number"
              name="inch"
              onChange={inputChange}
              value={state.inch}
              min={"1"}
              max={"12"}
              placeholder="Inch"
            />
          </div>
        </div>
        <div className="col-md-6 ">
          <label>Gender</label>
          {/* <input className="" type="email" placeholder="Email*" />> */}
          <div className="gender">
            <div
              className={`male ${state.gender === 1 ? "active" : ""}`}
              onClick={() => changeGender(1)}
            >
              <img src={male} alt="male" />
            </div>
            <div
              className={`male margin_l ${state.gender === 2 ? "active" : ""}`}
              onClick={() => changeGender(2)}
            >
              <img src={female} alt="female" />
            </div>
          </div>
        </div>
        <div className="text-center py-3">
          <input
            type="submit"
            className="submit_btn"
            value={loadingNow ? "Creating..." : "Save User"}
            // onClick={handleSubmit}
          />
        </div>
      </div>

      </form>
    );
  }else{
    module =  <div style={{height:"100%"}} className="row profile-details">
      <h2>Already did it</h2>
    </div>
  }
  // console.log('state.gender', state.gender)
  return (
    <>
      <div className=" userShow">
        {module}
      </div>
      <ToastContainer transition={Zoom} />
    </>
  );
}

export default Basic;
