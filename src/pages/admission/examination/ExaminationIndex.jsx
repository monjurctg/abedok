import React from 'react';
import { useReducer } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import Dashboard from "../../../components/layout/Dashboard";
import PermissionCheck from "../../../components/PermissionCheck";
import SubLoader from "../../../components/SubLoader";
import { examination } from "../../../constants/rolePermission";
// import { modalState } from "../../../redux/actions/modalAction";

function ExaminationIndex() {
  const { examData } = useSelector((state) => state.exam);
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      create: false,
      edit: false,
      id: "",
      editName: "",
      pageNo: 1,
      searchName: "",
      searchData: [],
      search: false,
      staticData: [
        "JSC/JDC",
        "SSC/Dakhil",
        "Ssc(Vocational)",
        "HSC/Alim",
        "HSC/Alim/Equivalent",
        "HSC(Vocational)",
        "HSC(BM)",
        "Diploma in Commerce",
        "Diploma in Business Studies",
      ],
    }
  );

  let cardStyle = {
    width: "25%",
    height: "80px",
    background: "linear-gradient(28deg, #3d1ee9 0%, #e91e1e 100%)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "5px",
    boxShadow: "1px 0px 20px 3px #9e9e9e",
    cursur: "pointer",
  };
  // let deleteExam = async (id) => {
  //   let res = await ExamServices.delete(id);
  //   // console.log("res :>> ", res);
  //   if (res.message === "Examination Delete Successfully") {
  //     // console.log("examData", examData);
  //     dispatch(examList(examData.meta.current_page));
  //     toastifyAlertDelete(res.message, "top-center");
  //   }
  // };
  // let dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(examList(state.pageNo));
  // }, []);

  // let handlePageChange = (pageNo) => {
  //   setState({ pageNo: pageNo });
  //   dispatch(examList(pageNo));
  // };

  // let createButtonClicked = () => {
  //   setState({ modalShow: "create" });
  //   dispatch(modalState(true));
  // };

  // useEffect(() => {
  //   if (state.searchName) return;
  //   else {
  //     setState({ search: false });
  //   }
  // }, [state.searchName]);

  // let editButtonClicked = (editName, id) => {
  //   setState({ modalShow: "edit", id: id, editName: editName });
  //   dispatch(modalState(true));
  // };
  // let handleSubmit = async () => {
  //   // console.log("state.searchName :>> ", state.searchName);
  //   let { data } = examData;
  //   // console.log("data :>> ", data);
  //   if (state.searchName) {
  //     let val = data.filter(
  //       (filterData) => filterData?.name == state.searchName
  //     );

  //     // console.log("data :>> ", val);
  //     setState({ searchData: val, search: true });
  //   } else {
  //     setState({ search: false });
  //   }
  // };
  let examShow = "";
  if (state.staticData) {
    examShow = state.staticData.map((exam, index) => {
      return (
        <div key={index} style={cardStyle}>
          <h4>{exam}</h4>

          {/* <td>
         
            <div className="d-flex">
              <PermissionCheck permission={examination.delete}>
                <img
                  className="c_point"
                  src={dlt_new}
                  alt="c_point"
                  onClick={() => deleteExam(exam.id)}
                />
              </PermissionCheck>
              <PermissionCheck permission={examination.edit}>
                <img
                  className="c_point ml-2"
                  alt="c_point"
                  src={edit_new}
                  onClick={() => editButtonClicked(exam.name, exam.id)}
                />
              </PermissionCheck>
            </div>
          </td> */}
        </div>
      );
    });
  }
  //  else if (state.search) {
  //   examShow = state.searchData?.map((exam, index) => {
  //     return (
  //       <tr key={index}>
  //         <td>
  //           <div className="d-flex td_details">
  //             <div>
  //               <h4>{exam.name}</h4>
  //             </div>
  //           </div>
  //         </td>
  //         <td>
  //           <div className="d-flex">
  //             <img
  //               className="c_point"
  //               src={dlt_new}
  //               alt="c_point"
  //               onClick={() => deleteExam(exam.id)}
  //             />
  //             <img
  //               className="c_point ml-2"
  //               alt="c_point"
  //               src={edit_new}
  //               onClick={() => editButtonClicked(exam.name, exam.id)}
  //             />
  //           </div>
  //         </td>
  //       </tr>
  //     );
  //   });
  // }

  let examModule = <SubLoader />;
  if (state.staticData) {
    examModule = (
      <div
        className="university__details d-flex flex-wrap"
        style={{ gap: "20px" }}
      >
        {examShow}
        {/* <table className="">
          <tbody>
            <tr>
              <th style={{ width: "45%" }}>Exam name</th>
              {/* <th style={{ width: "45%" }}>Location</th> */}
        {/* <th style={{ width: "10%" }}>Actions</th> */}
        {/* </tr>
          
          </tbody>
        </table> */}
        {/* <div className="my-5 text-center w-90 pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
        {/* {examData.meta ? (
            <Pagination
              activePage={examData.meta.current_page}
              itemsCountPerPage={examData.meta.per_page}
              totalItemsCount={examData.meta.total}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          ) : (
            ""
          )}
        </div> */}
      </div>
    );
  }
  return (
    <div>
      <Dashboard>
        <PermissionCheck permission={examination.access} module={"examination"}>
          <div className="university">
            {/* <div className="text-end create_btn" onClick={createButtonClicked}>
              <PermissionCheck permission={examination.create}>
                <button type="button" className="btn btn-primary">
                  <p>+ Create Exam</p>
                </button>
              </PermissionCheck>
            </div> */}

            {/* <InputExam
              modalShow={state.modalShow}
              pageNo={examData?.meta?.last_page || state.pageNo}
              editName={state.editName}
              id={state.id}
            /> */}

            <div className="university__list my-4">
              <div className="my-3 university_texts">
                <h3 className="w-50">Exam List</h3>
                <div
                  className="university_texts_input d-flex"
                  style={{ columnGap: "10px" }}
                >
                  {/* <input
                    type={"search"}
                    placeholder="Search"
                    value={state.searchName}
                    onChange={(e) => {
                      setState({ searchName: e.target.value });
                    }}
                  /> */}
                  {/* <div className=" create_btn">
                    <button
                      style={{ padding: "10px 25px" }}
                      type="button"
                      className="btn btn-primary smallBtn"
                      onClick={handleSubmit}
                    >
                      <p>Search</p>
                    </button>
                  </div> */}
                  <div className="image">{/* <img src={search} /> */}</div>
                </div>
              </div>
              {examModule}
            </div>
          </div>
        </PermissionCheck>
        <ToastContainer transition={Zoom} />
      </Dashboard>
    </div>
  );
}

export default ExaminationIndex;
