import React, { useEffect, useReducer } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import PostServices from "../../../api/job/PostServices";
import dlt_new from "../../../assets/img/icons/dlt_new.svg";
import edit_new from "../../../assets/img/icons/edit_new.svg";
import { toastifyAlertDelete } from "../../../components/alert/tostifyALert";
// import gradesList from '../../redux/actions/gradeAction';
import Dashboard from "../../../components/layout/Dashboard";
import PermissionCheck from "../../../components/PermissionCheck";
import SubLoader from "../../../components/SubLoader";
import { post } from "../../../constants/rolePermission";
import { postsList } from "../../../redux/actions/job/postAction";
import { modalState } from "../../../redux/actions/modalAction";
import InputPost from "./InputPost";
// import { gradesList } from "../../redux/actions/gradeAction";

function Post() {
  const { postList } = useSelector((state) => state.post);
  // console.log("postList", postList);
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
    }
  );
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(postsList());
  }, []);

  let handlePageChange = (pageNo) => {
    setState({ pageNo: pageNo });
    dispatch(postList(pageNo));
  };

  let createButtonClicked = () => {
    setState({ modalShow: "create" });
    dispatch(modalState(true));
  };

  let editButtonClicked = (editName, id) => {
    setState({ modalShow: "edit", id: id, editName: editName });
    dispatch(modalState(true));
  };

  let deleteExam = async (id) => {
    let res = await PostServices.delete(id);
    // console.log("res :>> ", res);
    if (res.message === "Post Deleted") {
      dispatch(postsList(postList?.meta?.current_page));
      toastifyAlertDelete(res.message, "top-center");
    }
  };
  let gradeShow = "";

  // console.log("filterdaata>>", state.filterData);
  let handleSubmit = async () => {
    // console.log("state.searchName :>> ", state.searchName, state.search);
    let { data } = postList;

    // console.log("data :>> ", data);
    if (state.searchName) {
      let val = data.filter((user) => user?.name == state.searchName);
      // console.log("data :>> ", data);
      setState({ searchValue: val, search: true });
    } else {
      setState({ search: false });
    }
  };

  if (postList.data && !state.search) {
    gradeShow = postList.data.map((exam, index) => {
      return (
        <tr index={index} key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{exam.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <img
                className="c_point"
                src={dlt_new}
                alt="c_point"
                onClick={() => deleteExam(exam.id)}
              />
              <img
                className="c_point ml-2"
                alt="c_point"
                src={edit_new}
                onClick={() => editButtonClicked(exam.name, exam.id)}
              />
            </div>
          </td>
        </tr>
      );
    });
  } else if (state.search) {
    gradeShow = state.searchValue.map((exam, index) => {
      return (
        <tr index={index} key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h4>{exam.name}</h4>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex">
              <PermissionCheck permission={post.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deleteExam(exam.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={post.edit}>
                <img
                  className="c_point ml-2"
                  alt="c_point"
                  src={edit_new}
                  onClick={() => editButtonClicked(exam.name, exam.id)}
                />
              </PermissionCheck>
            </div>
          </td>
        </tr>
      );
    });
  }

  let module = <SubLoader />;
  if (postList.data) {
    module = (
      <div className="university__details">
        <div className="tb__scroll">
          <table className="">
            <tbody>
              <tr>
                <th style={{ width: "45%" }}>Post name</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
              {gradeShow}
            </tbody>
          </table>
        </div>
        <div className="my-5 text-center w-90 pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {postList.meta ? (
            <Pagination
              activePage={postList.meta.current_page}
              itemsCountPerPage={postList.meta.per_page}
              totalItemsCount={postList.meta.total}
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
        <PermissionCheck permission={post.access} module={"post"}>
          <div className="university">
            <div className="text-end create_btn" onClick={createButtonClicked}>
              <PermissionCheck permission={post.create}>
                <button type="button" className="btn btn-primary">
                  <p>+ Create Post</p>
                </button>
              </PermissionCheck>
            </div>

            <InputPost
              modalShow={state.modalShow}
              pageNo={postList?.meta?.last_page || state.pageNo}
              editName={state.editName}
              id={state.id}
            />

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="w-50">Post List</h3>
                <div
                  className="university_texts_input d-flex"
                  style={{ columnGap: "10px" }}
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
                  <div className="create_btn">
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
              {module}
            </div>
          </div>
        </PermissionCheck>
      </Dashboard>
    </div>
  );
}

export default Post;
