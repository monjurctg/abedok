import React, { useEffect, useMemo, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import PostOfficeServices from "../../api/district/PostOfficeServices";
import dlt_new from "../../assets/img/icons/dlt_new.svg";
import edit_new from "../../assets/img/icons/edit_new.svg";
import {
  toastifyAlertDelete,
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../components/alert/tostifyALert";
import Dashboard from "../../components/layout/Dashboard";
import PermissionCheck from "../../components/PermissionCheck";
import { post_office } from "../../constants/rolePermission";
import {
  editUpazila,
  singleUpazilaList,
} from "../../redux/actions/basicInfo/upazilaAction";
import { inputV } from "../../redux/actions/inputAction";
import { modalState } from "../../redux/actions/modalAction";
import PostOfficeCreate from "./PostOfficeCreate";

function PostOffice() {
  let { upazilaId, pageNo } = useParams();

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let { inputValue } = useSelector((state) => state.inputVal);
  let { editUpazilaData, singleUpazila } = useSelector(
    (state) => state.upazila
  );
  console.log("editUpazilaData :>> ", editUpazilaData);

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      districtName: "",
      upazilas: "",
      postId: "",
    }
  );

  useEffect(() => {
    // getDistrict();
    dispatch(singleUpazilaList(upazilaId));
  }, []);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  console.log("editDistrictData :>> ", editUpazilaData);
  useMemo(() => {
    if (editUpazilaData.message === "Upazila Update Successfully") {
      dispatch(singleUpazilaList(pageNo));
      toastifyAlertSuccess(editUpazilaData.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
      // dispatch(
      //   editDistrict({
      //     name: inputValue,
      //     id: upazilaId,
      //   })
      // );

      setTimeout(() => {
        navigate("/district");
      }, 2000);
    } else if (editUpazilaData?.errors) {
      toastifyAlertError(editUpazilaData.errors.name[0], "top-center");
    }
  }, [editUpazilaData]);

  let handleSubmit = () => {
    dispatch(
      editUpazila({
        name: inputValue,
        district_id: singleUpazila.data.district_id,
        id: upazilaId,
      })
    );
  };

  let deleteUpazila = async (id) => {
    let res = await PostOfficeServices.delete(id);
    // console.log("res :>> ", res);
    if (res.message === "Post Office Deleted Successfully") {
      toastifyAlertDelete(res.message, "top-center");
      dispatch(singleUpazilaList(upazilaId));
    }
  };

  let createButtonClicked = () => {
    setState({ modalShow: "create" });
    dispatch(modalState(true));
  };

  let editButtonClicked = (editName, id) => {
    setState({ modalShow: "edit", postId: id, editName: editName });
    dispatch(modalState(true));
  };

  let postOfficeShow = "";
  if (singleUpazila?.data) {
    postOfficeShow = singleUpazila?.data?.post_office.map((upazila, index) => {
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
              <PermissionCheck permission={post_office.delete}>
              <img
                className="c_point"
                src={dlt_new}
                alt="c_point"
                onClick={() => deleteUpazila(upazila.id)}
              />
              </PermissionCheck>
              <PermissionCheck permission={post_office.edit}>
              <img
                className="c_point ml-2"
                // type="button"
                // className="btn btn-primary"

                alt="c_point"
                src={edit_new}
                onClick={() => editButtonClicked(upazila.name, upazila.id)}
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
        <PermissionCheck permission={post_office.access} module={"postOffice"}>
        {singleUpazila?.data ? (
          <div className="university create">
            <div className="inputs__university">
              <div>
                <label>Upazila name</label>
                <input
                  type="text"
                  onChange={inputChange}
                  className="w-50"
                  // value={state.districtName}
                  placeholder={`${singleUpazila?.data?.name}`}
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
                <h3 className="w-50">Post Office List</h3>
                <div
                  className="text-end create_btn"
                  onClick={createButtonClicked}
                >
                  <PermissionCheck permission={post_office.create}>
                  <button type="button" className="btn btn-primary">
                    <p>+ Create Post Office</p>
                  </button>
                  </PermissionCheck>
                </div>

                <PostOfficeCreate
                  modalShow={state.modalShow}
                  editName={state.editName}
                  id={upazilaId}
                  postId={state.postId}
                />
              </div>
              <div className="university__details">
                <table className="">
                  <tbody>
                    <tr>
                      <th className="text-center" style={{ width: "45%" }}>
                        Post Office name
                      </th>

                      <th className="text-center" style={{ width: "10%" }}>
                        Actions
                      </th>
                    </tr>
                    {postOfficeShow}
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

export default PostOffice;
