import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import edit_new from "../../assets/img/icons/edit_new.svg";
import Dashboard from "../../components/layout/Dashboard";
import PermissionCheck from "../../components/PermissionCheck";
import { term } from "../../constants/rolePermission";
import { termsList } from "../../redux/actions/basicInfo/termsAction";
import { modalState } from "../../redux/actions/modalAction";
import TermInput from "./TermInput";

function Terms() {
  const { termsData } = useSelector((state) => state.terms);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
    }
  );
  // console.log("departments", termsData);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(termsList());
  }, []);
  let editButtonClicked = (id, editName) => {
    console.log("editName :>> ", editName);
    setState({ id: id, modalShow: "edit", editName: editName });
    dispatch(modalState(true));
  };

  let termShow = "";
  if (termsData) {
    termShow = (
      <tr>
        <td>
          <div className="d-flex td_details">
            <div>
              <h4>{termsData.message}</h4>
            </div>
          </div>
        </td>
        <td>
          <div className="d-flex td_details">
            <div>
              <h4>{termsData.details}</h4>
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
              onClick={() => editButtonClicked(termsData.id, termsData.details)}
            />
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div>
      <Dashboard>
        <PermissionCheck permission={term.access} module={"term"}>
        <div className="university">
          <TermInput
            name={"Board"}
            pageNo={termsData?.meta?.last_page || 1}
            modalShow={state.modalShow}
            editName={state.editName}
            id={state.id}
          />

          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Terms List</h3>
            </div>
            <div className="university__details">
              <table className="">
                <tbody>
                  <tr>
                    <th style={{ width: "45%" }}>Term</th>
                    <th style={{ width: "45%" }}>Terms Message</th>

                    <th style={{ width: "10%" }}>Actions</th>
                  </tr>
                  {termShow}
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

export default Terms;
