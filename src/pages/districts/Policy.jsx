import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import PolicyServices from "../../api/district/PolicyServices";
import edit_new from "../../assets/img/icons/edit_new.svg";
import { toastifyAlertSuccess } from "../../components/alert/tostifyALert";
import Dashboard from "../../components/layout/Dashboard";
import PermissionCheck from "../../components/PermissionCheck";
import { policy } from "../../constants/rolePermission";
import { policyList } from "../../redux/actions/basicInfo/policyAction";
import { modalState } from "../../redux/actions/modalAction";
import PolicyInput from "./PolicyInput";

function Policy() {
  const { policyData } = useSelector((state) => state.policy);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
    }
  );
  // console.log("departments", policyData);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(policyList());
  }, []);

  let deletePolicy = async (id) => {
    let res = await PolicyServices.delete(id);
    console.log("res :>> ", res);
    if (res.message === "Board Delete Successfully") {
      toastifyAlertSuccess(res.message, "top-center");
      dispatch(policyList());
    }
  };

  let editButtonClicked = (editName, id) => {
    setState({ modalShow: "edit", id: id, editName: editName });
    dispatch(modalState(true));
  };

  let policyShow = "";
  if (policyData) {
    policyShow = (
      <tr>
        <td>
          <div className="d-flex td_details">
            <div>
              <h4>{policyData.details}</h4>
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex td_details">
            <div>
              <h4>{policyData.message}</h4>
            </div>
          </div>
        </td>

        <td>
          <div className="d-flex">
            <img
              className="c_point ml-2"
              // type="button"
              // className="btn btn-primary"

              alt="c_point"
              src={edit_new}
              onClick={() =>
                editButtonClicked(policyData.details, policyData.id)
              }
            />
          </div>
        </td>
      </tr>
    );
  }
  return (
    <div>
      <Dashboard>
        <PermissionCheck permission={policy.access} module={"policy"}>
          <div className="university">
            <PolicyInput
              name={"Policy"}
              modalShow={state.modalShow}
              editName={state.editName}
              id={state.id}
            />

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="w-50">Policy List</h3>
                <div
                  className="university_texts_input d-flex"
                  style={{ columnGap: "10px" }}
                >
                  <input type={"search"} placeholder="Search" />
                  <div className=" create_btn">
                    <button
                      style={{ padding: "10px 25px" }}
                      type="button"
                      className="btn btn-primary smallBtn"
                    >
                      <p>Search</p>
                    </button>
                  </div>
                  <div className="image">{/* <img src={search} /> */}</div>
                </div>
              </div>
              <div className="university__details">
                <table className="">
                  <tbody>
                    <tr>
                      <th style={{ width: "45%" }}>Policy Details</th>
                      <th style={{ width: "45%" }}>Message</th>
                      <th style={{ width: "10%" }}>Actions</th>
                    </tr>
                    {policyShow}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </PermissionCheck>
      </Dashboard>
    </div>
  );
}

export default Policy;
