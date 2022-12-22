import React, { useEffect, useMemo, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import UpazilaServices from "../../api/district/UpazilaServices";
import dlt_new from "../../assets/img/icons/dlt_new.svg";
import edit_new from "../../assets/img/icons/edit_new.svg";
import {
  toastifyAlertDelete,
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../components/alert/tostifyALert";
import Dashboard from "../../components/layout/Dashboard";
import PermissionCheck from "../../components/PermissionCheck";
import { upazila } from "../../constants/rolePermission";
import {
  districtList,
  editDistrict,
  singleDistrictList,
} from "../../redux/actions/basicInfo/districtAction";
import { inputV } from "../../redux/actions/inputAction";
import { modalState } from "../../redux/actions/modalAction";
import UpazilaCreate from "./UpazilaCreate";

function UpazilaEdit() {
  let { districId, pageNo } = useParams();

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let { inputValue } = useSelector((state) => state.inputVal);
  let { editDistrictData, singleDistrict } = useSelector(
    (state) => state.district
  );
  console.log("singleDistrictData :>> ", singleDistrict.data);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      districtName: "",
      upazilas: "",
    }
  );

  useEffect(() => {
    // getDistrict();
    dispatch(singleDistrictList(districId));
  }, []);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  useMemo(() => {
    // console.log("editDistrictData :>> ", editDistrictData.message);

    if (editDistrictData.message === "District Updated Successfully") {
      dispatch(districtList(pageNo));
      toastifyAlertSuccess(editDistrictData.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
      // dispatch(editDistrict({ name: inputValue, id: districId }));

      setTimeout(() => {
        navigate("/district");
      }, 2000);
    } else if (editDistrictData?.errors) {
      toastifyAlertError(editDistrictData.errors.name[0], "top-center");
    }
  }, [editDistrictData]);

  let handleSubmit = () => {
    dispatch(editDistrict({ name: inputValue, id: districId }));
  };

  let deleteUpazila = async (id) => {
    let res = await UpazilaServices.delete(id);
    // console.log("res :>> ", res);
    if (res.message === "Upazila Deleted Successfully") {
      toastifyAlertDelete(res.message, "top-center");
      dispatch(singleDistrictList(districId));
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

  let upazillaShow = "";
  if (singleDistrict?.data) {
    upazillaShow = singleDistrict?.data?.upazilas.map((upazila, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{upazila.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <img
                className="c_point"
                src={dlt_new}
                alt="c_point"
                onClick={() => deleteUpazila(upazila.id)}
              />
              <Link to={`/district/post-office/edit/${upazila.id}/1`}>
                <img
                  className="c_point ml-2"
                  alt="c_point"
                  src={edit_new}
                  // onClick={() => editButtonClicked(upazila.name, upazila.id)}
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
       <PermissionCheck permission={upazila.access} module={"upazila"}>
       {singleDistrict ? (
          <div className="university create">
            <div className="inputs__university">
              <div>
                <label>District name</label>
                <input
                  type="text"
                  onChange={inputChange}
                  className="w-50"
                  // value={state.districtName}
                  placeholder={`${singleDistrict?.data?.name}`}
                />
              </div>

              <div className="my-4 w-50 text-center">
                <button className="submit_btn" onClick={handleSubmit}>
                  Save Changes
                </button>
              </div>
            </div>

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="w-50">Upazila List</h3>
                <div
                  className="text-end create_btn"
                  onClick={createButtonClicked}
                >
                  <button type="button" className="btn btn-primary">
                    <p>+ Create Upazila</p>
                  </button>
                </div>

                <UpazilaCreate
                  modalShow={state.modalShow}
                  editName={state.editName}
                  id={districId}
                />
              </div>
              <div className="university__details">
                <table className="">
                  <tbody>
                    <tr>
                      <th className="text-center" style={{ width: "45%" }}>
                        Upazila name
                      </th>

                      <th className="text-center" style={{ width: "10%" }}>
                        Actions
                      </th>
                    </tr>
                    {upazillaShow}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
       </PermissionCheck>
        <ToastContainer transition={Zoom} />
      </Dashboard>
    </div>
  );
}

export default UpazilaEdit;
