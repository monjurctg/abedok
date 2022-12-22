import { combineReducers } from "redux";
import { admissionReducer } from "./admission/admissionReducer";
import { boardReducer } from "./admission/boardReducer ";
import { courseDurationReducer } from "./admission/courseDurationReducer";
import { examReducer } from "./admission/examReducer";
import { groupReducer } from "./admission/groupReducer";
import { majorReducer } from "./admission/majorReducer";
import { passingYearReducer } from "./admission/passingYearReducer";
import { subjectReducer } from "./admission/subjectReducer";
import { unitReducer } from "./admission/unitReducer";
import { universityReducer } from "./admission/universityReducer";
import { authReducer } from "./authReducer";
import { districtReducer } from "./basicInfo/districtReducer";
import { paymentReducer } from "./basicInfo/paymentReducer";
import { policyReducer } from "./basicInfo/policyReducer";
import { postOfficeReducer } from "./basicInfo/postOfficeReducer";
import { termsReducer } from "./basicInfo/termsReducer";
import { upazilaReducer } from "./basicInfo/upazilaReducer";
import { inputReducer } from "./inputReducer";
import { departmentReducer } from "./job/departmentReducer";
import { gradeReducer } from "./job/gradeReducer";
import { jobCircularReducer } from "./job/jobCircularReducer";
import { postReducer } from "./job/postReducer";
import { quotaReducer } from "./job/quotaReducer";
import { modalReducer } from "./modalReducer";
import { notificatonReducer } from "./notificationReducer";
import { roleReducer } from "./roleReducer";
import { sidebarReducer } from "./sidebarReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
  activeSideBar: sidebarReducer,
  auth: authReducer,
  grade: gradeReducer,
  departments: departmentReducer,
  post: postReducer,
  notificationRed: notificatonReducer,
  quota: quotaReducer,
  university: universityReducer,
  unit: unitReducer,
  board: boardReducer,
  inputVal: inputReducer,
  exam: examReducer,
  modalValue: modalReducer,
  group: groupReducer,
  passingYear: passingYearReducer,
  course: courseDurationReducer,
  subject: subjectReducer,
  major: majorReducer,
  ///basic info
  terms: termsReducer,
  policy: policyReducer,
  district: districtReducer,
  upazila: upazilaReducer,
  postOffice: postOfficeReducer,
  payment: paymentReducer,

  admission: admissionReducer,
  jobCircular: jobCircularReducer,
  user: userReducer,
  role: roleReducer,
});

export default reducers;
