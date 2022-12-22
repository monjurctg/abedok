import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import BoardServices from "../../api/adminssion/BoardServices";
import dlt_new from "../../assets/img/icons/dlt_new.svg";
import edit_new from "../../assets/img/icons/edit_new.svg";
import { toastifyAlertSuccess } from "../../components/alert/tostifyALert";
import Dashboard from "../../components/layout/Dashboard";
import PermissionCheck from "../../components/PermissionCheck";
import SubLoader from "../../components/SubLoader";
import { board } from "../../constants/rolePermission";
import { modalState } from "../../redux/actions/modalAction";
import { boardList } from "../../redux/actions/university/boardAction";
import BoardInput from "./BoardInput";

function BoardIndex() {
  const { boardData } = useSelector((state) => state.board);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      searchData: [],
      search: false,
      searchName: "",
    }
  );

  // console.log("departments", boardData);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(boardList());
  }, []);

  let handlePageChange = (pageNo) => {
    // console.log("object :>> ", pageNo);
    dispatch(boardList(pageNo));
  };

  let deleteBoard = async (id) => {
    let res = await BoardServices.delete(id);
    if (res.message === "Board Delete Successfully") {
      toastifyAlertSuccess(res.message, "top-center");
      dispatch(boardList());
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

  let handleSubmit = async () => {
    // console.log("state.searchName :>> ", state.searchName);
    let { data } = boardData;
    console.log("data :>> ", data);
    if (state.searchName) {
      let val = data.filter(
        (filterData) => filterData?.name == state.searchName
      );

      // console.log("data :>> ", data);
      setState({ searchData: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  let boardShow = "";
  if (boardData.data && !state.search) {
    boardShow = boardData.data.map((boards, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{boards.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <PermissionCheck permission={board.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deleteBoard(boards.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={board.edit}>
                <img
                  className="c_point ml-2"
                  // type="button"
                  // className="btn btn-primary"

                  alt="c_point"
                  src={edit_new}
                  onClick={() => editButtonClicked(boards.name, boards.id)}
                />
              </PermissionCheck>
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    boardShow = state.searchData?.map((board, index) => {
      return (
        <tr key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{board.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <img
                className="c_point"
                src={dlt_new}
                alt="c_point"
                onClick={() => deleteBoard(board.id)}
              />
              <img
                className="c_point ml-2"
                // type="button"
                // className="btn btn-primary"

                alt="c_point"
                src={edit_new}
                onClick={() => editButtonClicked(board.name, board.id)}
              />
            </div>
          </td>
        </tr>
      );
    });
  }

  let boardModule = <SubLoader />;

  if (boardData?.data) {
    boardModule = (
      <div className="university__details">
        <table className="">
          <tbody>
            <tr>
              <th style={{ width: "90%" }}>Board name</th>
              {/* <th style={{ width: "45%" }}>Location</th> */}
              <th style={{ width: "10%" }}>Actions</th>
            </tr>
            {boardShow}
          </tbody>
        </table>
        <div className="my-5 text-center w-90 pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {boardData.meta ? (
            <Pagination
              activePage={boardData.meta.current_page}
              itemsCountPerPage={boardData.meta.per_page}
              totalItemsCount={boardData.meta.total}
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
    );
  }

  return (
    <div>
      <Dashboard>
        <PermissionCheck permission={board.access} module={"board"}>
          <div className="university">
            <div className="text-end create_btn">
              <PermissionCheck permission={board.create}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={createButtonClicked}
                >
                  <p>+ Create Board</p>
                </button>
              </PermissionCheck>
            </div>

            <BoardInput
              name={"Board"}
              pageNo={boardData?.meta?.last_page || 1}
              modalShow={state.modalShow}
              editName={state.editName}
              id={state.id}
            />

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="w-50">Board List</h3>
                <div
                  className="university_texts_input d-flex"
                  style={{ columnGap: "10px" }}
                >
                  <input
                    type={"search"}
                    placeholder="Search"
                    value={state.searchName}
                    onChange={(e) => {
                      setState({ searchName: e.target.value });
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
                  <div className="image">{/* <img src={search} /> */}</div>
                </div>
              </div>
              {boardModule}
            </div>
          </div>
        </PermissionCheck>
        <ToastContainer transition={Zoom} />
      </Dashboard>
    </div>
  );
}

export default BoardIndex;
