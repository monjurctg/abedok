import React from "react";
import { Link } from "react-router-dom";
import dlt_new from "../../assets/img/icons/dlt_new.svg";
import edit_new from "../../assets/img/icons/edit_new.svg";
import Dashboard from "../../components/layout/Dashboard";
import ModalInput from "../../components/modal/ModalFade";
import PermissionCheck from "../../components/PermissionCheck";
import { upazila } from "../../constants/rolePermission";

function DistrictEdit() {
  return (
    <div>
      <Dashboard>
        <div className="university create">
          <div className="inputs__university">
            <div>
              <label>District name</label>
              <input type="text" className="w-50" placeholder="Subject name" />
            </div>

            <div className="my-4 w-50 text-center">
              <button className="submit_btn">Save Changes</button>
            </div>
          </div>

          <div className="university__list my-4 w-50">
            <div className="my-3 university_texts">
              <h3 className="w-50">Upazila List</h3>
              <div className="text-end create_btn">
                <PermissionCheck permission={upazila.create}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <p>+ Create Upazila</p>
                  </button>
                </PermissionCheck>
              </div>

              <ModalInput name={"Upazila"} />
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
                  <tr>
                    <td>
                      <div className="td_details">
                        <div>
                          <h4 className="text-center">Finance</h4>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="d-flex justify-content-around">
                        <PermissionCheck permission={upazila.delete}>
                          <img src={dlt_new} alt="" />
                        </PermissionCheck>
                        <PermissionCheck permission={upazila.edit}>
                          <Link to={"/district/upazila/edit"}>
                            <img src={edit_new} alt="" />
                          </Link>
                        </PermissionCheck>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export default DistrictEdit;
