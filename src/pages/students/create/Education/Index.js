import React from 'react';
import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Dashboard from "../../../../components/layout/Dashboard";
import { AD } from "../../../../constants/ad";
import { boardAllList } from "../../../../redux/actions/university/boardAction";
import { courseDurationAllList } from "../../../../redux/actions/university/courseDurationAction";
import { groupAll } from "../../../../redux/actions/university/groupAction";
import { allMajorList } from "../../../../redux/actions/university/majorAction";
import { passingYearAllList } from "../../../../redux/actions/university/passingYearAction";
import { allSubjectList } from "../../../../redux/actions/university/subjectAction";
import { universityAll } from "../../../../redux/actions/university/universityAction";
import Header from "../../Header";
import Graduate from "./Graduate";
import Hsc from "./Hsc";
import Jsc from "./Jsc";
import PostGraduate from "./PostGraduate";
import Ssc from "./Ssc";

function Index() {
  // const { examData } = useSelector((state) => state.exam);
  const { boardData } = useSelector((state) => state.board);
  const { groupAllRed } = useSelector((state) => state.group);

  const { passingYearData } = useSelector((state) => state.passingYear);
  const { universityAllRed } = useSelector((state) => state.university);
  const { subjectData } = useSelector((state) => state.subject);
  const { majorData } = useSelector((state) => state.major);
  const { courseDurationData } = useSelector((state) => state.course);

  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(universityAll())
    dispatch(allSubjectList())
    dispatch(courseDurationAllList())
    dispatch(allSubjectList())
    dispatch(passingYearAllList());
    dispatch(boardAllList());
    // dispatch(examAllList());
    dispatch(allMajorList());
    dispatch(groupAll());

    
  }, []);

  // console.log('groupAllRed', groupAllRed)

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      education: [
        AD.EDUCTION_JSC,
        AD.EDUCTION_SSC,
        AD.EDUCTION_HSC,
        AD.EDUCTION_GRADUATE,
        AD.EDUCTION_POST_GRADUATE,
      ],
      newEducation: false,
      selectedBtn: "",
    }
  );

  let { level } = useParams();
  let module =
    level === AD.EDUCTION_JSC ? (
      <Jsc boardData={boardData} passingYearData={passingYearData}/>
    ) : level === AD.EDUCTION_SSC ? (
      <Ssc boardData={boardData} passingYearData={passingYearData} groupData={groupAllRed}/>
    ) : level === AD.EDUCTION_HSC ? (
      <Hsc boardData={boardData} passingYearData={passingYearData}  groupData={groupAllRed}/>
    ) : level === AD.EDUCTION_GRADUATE ? (
      <Graduate majorData={majorData} subjectData={subjectData}  universityData={universityAllRed} courseDurationData={courseDurationData} passingYearData={passingYearData}/>
    ) : level === AD.EDUCTION_POST_GRADUATE ? (
      <PostGraduate subjectData={subjectData} majorData={majorData}  universityData={universityAllRed} courseDurationData={courseDurationData} passingYearData={passingYearData}/>
    ) : (
      ""
    );

  let { selectedBtn } = state;

  let selectedModule =
    selectedBtn === AD.EDUCTION_JSC ? (
      <Jsc boardData={boardData} passingYearData={passingYearData} />
    ) : selectedBtn === AD.EDUCTION_SSC ? (
      <Ssc boardData={boardData} passingYearData={passingYearData} groupData={groupAllRed} />
    ) : selectedBtn === AD.EDUCTION_HSC ? (
      <Hsc boardData={boardData} passingYearData={passingYearData} groupData={groupAllRed} />
    ) : selectedBtn === AD.EDUCTION_GRADUATE ? (
      <Graduate majorData={majorData}  subjectData={subjectData}  universityData={universityAllRed} courseDurationData={courseDurationData} passingYearData={passingYearData} />
    ) : selectedBtn === AD.EDUCTION_POST_GRADUATE ? (
      <PostGraduate majorData={majorData}  subjectData={subjectData}  universityData={universityAllRed} courseDurationData={courseDurationData} passingYearData={passingYearData} />
    ) : (
      ""
    );


    let selectedBtnFromEducation = (btn)=>{
        btn === state.selectedBtn ? setState({selectedBtn:""}) : setState({selectedBtn:btn})
        
    }
  let select = state.education
    .filter((education) => education !== level)
    .map((education) => {
      // console.log('education', education)
      //   state.newEducation.push(education);
      return (
        <div
          className="select my-3"
          onClick={() => selectedBtnFromEducation(education)}
        >
          <h4>{education}</h4>
        </div>
      );
    });
  return (
    <>
      <Dashboard>
        <div className="students">
          <Header />

          {module}

          {selectedModule}
          <div className="text-center my-3">
            {/* <Link to="/user/create/student/basic"> */}
            <button
              className="addEducation__btn"
              onClick={() => setState({ newEducation: !state.newEducation })}
            >
              <p>+ Add Education</p>
            </button>
            {state.newEducation ? select : ""}

            {/* </Link> */}
          </div>
        </div>
      </Dashboard>
    </>
  );
}

export default Index;
