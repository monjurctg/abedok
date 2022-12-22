import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/layout/Login";
import LoaderB from "../components/LoaderB";
import { SIDEBAR } from "../constants/sidebar";
import { useAuth } from "../context/auth";
import UserAdmission from "../pages/admission/admissionModule/admissionApply/UserAdmission";
import AdmissionCreate from "../pages/admission/admissionModule/AdmissionCreate";
import AdmissionEdit from "../pages/admission/admissionModule/AdmissionEdit";
import AdmissionIndex from "../pages/admission/admissionModule/AdmissionIndex";
import StatusCreateAdmission from "../pages/admission/admissionModule/admissionStatus/StatusCreateAdmission";
import StatusEditAdmission from "../pages/admission/admissionModule/admissionStatus/StatusEditAdmission";
import StatusIndexAdmission from "../pages/admission/admissionModule/admissionStatus/StatusIndexAdmission";
import AppliedAdmission from "../pages/admission/admissionModule/AppliedAdmission";
import AppliedAdmissionStatus from "../pages/admission/admissionModule/AppliedAdmissionStatus";
import MerchentAppliedAdmission from "../pages/admission/admissionModule/MerchentAppliedAdmission";
import CourseDurationIndex from "../pages/admission/course duration/CourseDurationIndex";
import ExaminationIndex from "../pages/admission/examination/ExaminationIndex";
import GroupIndex from "../pages/admission/group/GroupIndex";
import PassingYearIndex from "../pages/admission/passing year/PassingYearIndex";
import SubjectEdit from "../pages/admission/subject/SubjectEdit";
import SubjectIndex from "../pages/admission/subject/SubjectIndex";
import UnitIndex from "../pages/admission/unit/UnitIndex";
import UniversityCreate from "../pages/admission/university/UniversityCreate";
import UniversityEdit from "../pages/admission/university/UniversityEdit";
import UniversityIndex from "../pages/admission/university/UniversityIndex";
import ApplyIndex from "../pages/apply/ApplyIndex";
import Congrats from "../pages/apply/Congrats";
import PaymentSelect from "../pages/apply/PaymentSelect";
import BoardIndex from "../pages/board/BoardIndex";
import DashboardItems from "../pages/DashboardItems";
import DistrictEdit from "../pages/districts/DistrictEdit";
import DistrictIndex from "../pages/districts/DistrictIndex";
import Policy from "../pages/districts/Policy";
import PostOffice from "../pages/districts/PostOffice";
import Terms from "../pages/districts/Terms";
import UpazilaEdit from "../pages/districts/UpazilaEdit";
import UpdateProfile from "../pages/districts/UpdateProfile";
import ErrorPage from "../pages/ErrorPage";
import AdminPayment from "../pages/job/appliedJobs/AdminPayment";
import AppliedJobs from "../pages/job/appliedJobs/AppliedJobs";
import AppliedJobStatus from "../pages/job/appliedJobs/AppliedJobStatus";
import MerchentApplied from "../pages/job/appliedJobs/MerchentApplied";
import ShowUser from "../pages/job/appliedJobs/ShowUser";
import StatusCreate from "../pages/job/appliedJobs/StatusCreate";
import StatusEdit from "../pages/job/appliedJobs/StatusEdit";
import StatusIndex from "../pages/job/appliedJobs/StatusIndex";
import Department from "../pages/job/department/Department";
import Grade from "../pages/job/grade/Grade";
import JobApplicationIndex from "../pages/job/job application/JobApplicationIndex";
import UserSearch from "../pages/job/job application/UserSearch";
import JobCircularCreate from "../pages/job/job circular/JobCircularCreate";
import { MemoJobCircularEdit } from "../pages/job/job circular/JobCircularEdit";
import JobCircularIndex from "../pages/job/job circular/JobCircularIndex";
import PendingIndex from "../pages/job/pendingJobs/PendingIndex";
import Post from "../pages/job/post/Post";
import Quota from "../pages/job/quota/Quota";
import Notification from "../pages/Notification";
import WorkerPayment from "../pages/payments/WorkerPayment";
import PermissionIndex from "../pages/role/PermissionIndex";
import RoleIndex from "../pages/role/RoleIndex";
import Create from "../pages/students/Create";
import Index from "../pages/students/create/Education/Index";
import AdminAllUserList from "../pages/students/userList/AdminAllUserList";
import MerchentListIndex from "../pages/students/userList/MerchentListIndex";
import MerchentUserList from "../pages/students/userList/MerchentUserList";
import UserIndex from "../pages/students/userList/UserIndex";
// import TestIndex from "../pages/test/TestIndex";
import UserCreate from "../pages/UserCreate";
import AuthRoute from "./authRoute";

function App() {
  let { loading } = useAuth();

  let {
    DASHBOARD,
    ROLE,
    PERMISSION,
    USERLIST,
    ALLUSERLIST,
    MERCHENTLIST,
    MERCHENTUSERLIST,
    CREATEUSER,
    CREATEUSERBASICINFO,
    JOBAPPLICATION,
    CREATEUSERBASICINFOINDEX,
    GRADE,
    JOBAPPLICATIONID,
    POST,
    MERCHENTSAPPIED,
    PAYMENTMARCHENTS,
    PAYMENTADMIN,
    JOBPENDING,
    JOBCIRCULAR,
    JOBAPPLIED,
    JOBCIRCULARSTATUS,
    JOBCIRCULARSTATUSCREATE,
    JOBCIRCULARSTATUSUPDATE,
    DEPARTMENT,
    QUOTA,
    COURSEDURATION,
    GROUP,
    PASSINGYEAR,
    UNIT,
    UNIVERSITY,
    UNIVERSITYCREATE,
    UNIVERSITYEDIT,
    EXAM,
    SUBJECT,
    SUBJECTEDIT,
    BOARD,
    ADMISSIONAPPLIED,
    ADMISSIONSTATUS,
    JOBLISTSTATUS,
    ADMISSIONMERCHENTSAPPLIEDLIST,
    ADMISSIONSTATUSCREATE,
    ADMISSIONSTATUSEDIT,
    ADMISSIONAPPLY,
    ADMISSIONINDEX,
    ADMISSIONEDIT,
    ADMISSIONCREATE,
    ADMISSIONAPPY,
    DISTRICT,
    DISTRICTEDIT,
    UPAZILAEDIT,
    POSTOFFICE,
    POLICY,
    TERMS,
    PAYMENTWORKER,
    PAYMENTAPPLY,
    PAYMENTSELECT,
  } = SIDEBAR;

  return loading ? (
    <LoaderB />
  ) : (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<GuestRoute />}> */}
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<AuthRoute />}>
            {/* Dashboard */}
            <Route path={DASHBOARD} element={<DashboardItems />} />
            {/* <PermissionRoute permission={ROLES.USERLIST}>
              <Route path={USERLIST} element={<UserIndex />} />
            </PermissionRoute> */}

            {/* <Route>
              <PermissionRoute permission={ROLES.USERLIST}> */}
            <Route
              path={USERLIST}
              element={
                // permissions && permissions.include(ROLES.USERLIST) ? (
                <UserIndex />
                // ) : (
                //   <Navigate to="/*" />
                // )
              }
            />
            <Route
              path={ALLUSERLIST}
              element={
                // permissions && permissions.include(ROLES.USERLIST) ? (
                <AdminAllUserList />
                // ) : (
                //   <Navigate to="/*" />
                // )
              }
            />
            <Route
              path={MERCHENTUSERLIST}
              element={
                // permissions && permissions.include(ROLES.USERLIST) ? (
                <MerchentUserList />
                // ) : (
                //   <Navigate to="/*" />
                // )
              }
            />
            <Route path={"notification"} element={<Notification />} />

            <Route
              path={MERCHENTLIST}
              element={
                // permissions && permissions.include(ROLES.USERLIST) ? (
                <MerchentListIndex />
                // ) : (
                //   <Navigate to="/*" />
                // )
              }
            />
            {/* </PermissionRoute>
            </Route> */}

            <Route path={USERLIST} element={<UserIndex />} />

            {/* USER */}
            <Route path={CREATEUSER} element={<UserCreate />} />
            <Route path={CREATEUSERBASICINFO} element={<Create />} />
            <Route path={CREATEUSERBASICINFOINDEX} element={<Index />} />

            <Route path={ROLE} element={<RoleIndex />} />
            <Route path={PERMISSION} element={<PermissionIndex />} />
            {/* Jobs */}
            <Route path={JOBAPPLICATION} element={<JobApplicationIndex />} />
            <Route path={JOBAPPLICATIONID} element={<UserSearch />} />
            <Route path={GRADE} element={<Grade />} />
            <Route path={POST} element={<Post />} />
            <Route path={JOBPENDING} element={<PendingIndex />} />
            <Route path={JOBLISTSTATUS} element={<AppliedJobStatus />} />

            <Route path={MERCHENTSAPPIED} element={<MerchentApplied />} />
            <Route path={PAYMENTMARCHENTS} element={<MerchentApplied />} />
            <Route path={PAYMENTADMIN} element={<AdminPayment />} />

            <Route path={DEPARTMENT} element={<Department />} />
            <Route path={QUOTA} element={<Quota />} />
            <Route path={JOBCIRCULAR} element={<JobCircularIndex />} />
            <Route path={JOBAPPLIED} element={<AppliedJobs />} />
            <Route path={JOBCIRCULARSTATUS} element={<StatusIndex />} />
            <Route path={JOBCIRCULARSTATUSCREATE} element={<StatusCreate />} />
            <Route path={JOBCIRCULARSTATUSUPDATE} element={<StatusEdit />} />
            <Route
              path={"job/circular/create"}
              element={<JobCircularCreate />}
            />

            <Route
              path={"job/circular/edit/:id"}
              element={<MemoJobCircularEdit />}
            />

            <Route path={"applied-job/user-show/:id"} element={<ShowUser />} />
            <Route path={"user-show/:id"} element={<ShowUser />} />
            {/* <Route path="test" element={<TestIndex />} /> */}
            {/* Admission */}
            <Route path={UNIVERSITY} element={<UniversityIndex />} />
            <Route path={UNIVERSITYCREATE} element={<UniversityCreate />} />
            <Route path={UNIVERSITYEDIT} element={<UniversityEdit />} />
            <Route path={UNIT} element={<UnitIndex />} />
            <Route path={EXAM} element={<ExaminationIndex />} />
            <Route path={GROUP} element={<GroupIndex />} />
            <Route path={PASSINGYEAR} element={<PassingYearIndex />} />
            <Route path={COURSEDURATION} element={<CourseDurationIndex />} />
            <Route path={SUBJECT} element={<SubjectIndex />} />
            <Route path={SUBJECTEDIT} element={<SubjectEdit />} />
            <Route path={ADMISSIONINDEX} element={<AdmissionIndex />} />
            <Route path={ADMISSIONCREATE} element={<AdmissionCreate />} />

            <Route path={ADMISSIONEDIT} element={<AdmissionEdit />} />

            <Route path={ADMISSIONAPPY} element={<AppliedAdmissionStatus />} />

            <Route path={ADMISSIONAPPLIED} element={<AppliedAdmission />} />
            {/* <Route path={"pdf"} element={<PdfUser />} /> */}

            <Route path={ADMISSIONSTATUS} element={<StatusIndexAdmission />} />
            <Route
              path={ADMISSIONMERCHENTSAPPLIEDLIST}
              element={<MerchentAppliedAdmission />}
            />

            <Route
              path={ADMISSIONSTATUSCREATE}
              element={<StatusCreateAdmission />}
            />
            <Route
              path={ADMISSIONSTATUSEDIT}
              element={<StatusEditAdmission />}
            />
            <Route path={ADMISSIONAPPLY} element={<UserAdmission />} />
            <Route path={BOARD} element={<BoardIndex />} />
            {/*BASIC INFO */}
            <Route path={DISTRICT} element={<DistrictIndex />} />
            <Route path={DISTRICTEDIT} element={<DistrictEdit />} />
            <Route path={UPAZILAEDIT} element={<UpazilaEdit />} />
            <Route path={POSTOFFICE} element={<PostOffice />} />
            <Route path={TERMS} element={<Terms />} />
            <Route path={POLICY} element={<Policy />} />

            <Route path={"user-show/:id"} element={<UpdateProfile />} />

            {/* PAYMENTS */}
            <Route path={PAYMENTWORKER} element={<WorkerPayment />} />
            <Route path={PAYMENTAPPLY} element={<ApplyIndex />} />
            <Route path={PAYMENTSELECT} element={<PaymentSelect />} />
            <Route
              path="payment/apply/:id/:userId/congrats"
              element={<Congrats />}
            />
            <Route path="*" element={<ErrorPage />} />
            <Route path="error" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Routes>
        <Route path="/" element={Login}></Route>
      </Routes> */}
    </div>
  );
}

export default App;
