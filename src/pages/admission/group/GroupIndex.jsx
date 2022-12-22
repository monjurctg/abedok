import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import GroupServices from "../../../api/adminssion/GroupServices";
import dlt_new from "../../../assets/img/icons/dlt_new.svg";
import edit_new from "../../../assets/img/icons/edit_new.svg";
import { toastifyAlertDelete } from "../../../components/alert/tostifyALert";
import Dashboard from "../../../components/layout/Dashboard";
import PermissionCheck from "../../../components/PermissionCheck";
import { group } from "../../../constants/rolePermission";
import { modalState } from "../../../redux/actions/modalAction";
import { groupList } from "../../../redux/actions/university/groupAction";
import GroupInput from "./GroupInput";

function GroupIndex() {
  const { groupData } = useSelector((state) => state.group);
  // console.log("groupData :>> ", groupData);

  let dispatch = useDispatch();
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      pageNo: 1,
      modalShow: false,
    }
  );

  useEffect(() => {
    dispatch(groupList(state.pageNo));
  }, []);

  let createButtonClicked = () => {
    setState({ modalShow: "create" });
    dispatch(modalState(true));
  };

  let editButtonClicked = (editName, id) => {
    setState({ modalShow: "edit", id: id, editName: editName });
    dispatch(modalState(true));
  };
  let handlePageChange = (pageNo) => {
    setState({ pageNo: pageNo });
    dispatch(groupList(pageNo));
  };

  let deletegroup = async (id) => {
    let res = await GroupServices.delete(id);
    // console.log("res :>> ", res);
    if (res.message === "Group Delete Successfully") {
      // console.log("examData", examData);
      dispatch(groupList(groupData.meta.current_page));
      toastifyAlertDelete(res.message, "top-center");
    }
  };

  let groupShow = "";
  if (groupData.data) {
    groupShow = groupData.data.map((groups, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{groups.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <PermissionCheck permission={group.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deletegroup(groups.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={group.edit}>
                <img
                  className="c_point ml-2"
                  // type="button"
                  // className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  alt="c_point"
                  src={edit_new}
                  onClick={() => editButtonClicked(groups.name, groups.id)}
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
        <PermissionCheck permission={group.access} module={"group"}>
          <div className="university">
            <div className="text-end create_btn" onClick={createButtonClicked}>
              <PermissionCheck permission={group.create}>
                <button
                  type="button"
                  className="btn btn-primary"
                  // data-bs-toggle="modal"
                  // data-bs-target="#exampleModal"
                >
                  <p>+ Create Group</p>
                </button>
              </PermissionCheck>
            </div>

            <GroupInput
              modalShow={state.modalShow}
              pageNo={groupData?.meta?.last_page || state.pageNo}
              editName={state.editName}
              id={state.id}
            />

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="w-50">Group List</h3>
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
                      <th style={{ width: "45%" }}>Group name</th>
                      <th style={{ width: "10%" }}>Actions</th>
                    </tr>

                    {groupShow}
                  </tbody>
                </table>
                <div className="my-5 text-center w-90 pagination justify-content-center">
                  {/* <button className="submit_btn">See more</button> */}
                  {groupData.meta ? (
                    <Pagination
                      activePage={groupData.meta.current_page}
                      itemsCountPerPage={groupData.meta.per_page}
                      totalItemsCount={groupData.meta.total}
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
            </div>
          </div>
        </PermissionCheck>
      </Dashboard>
    </div>
  );
}

export default GroupIndex;
