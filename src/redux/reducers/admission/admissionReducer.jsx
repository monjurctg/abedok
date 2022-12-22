import { ActionTypes } from "../../constants/action-types";

const initialState = {
  admissionData: [],
  activeAdmissionData: [],
  admissionStatusRed: false,
  storeAdmissionRed: false,
  singleAdmissionRed: [],
  appliedAdmissionListRed: [],
  editAdmissionRed: false,
  singleAppliedAdmission: [],
  rollAdmission: false,
  admissionMerchents: [],
};

export const admissionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADMISSION:
      return {
        ...state,
        admissionData: payload,
      };
    case ActionTypes.ADMISSIONROLLADD:
      return {
        ...state,
        rollAdmission: payload,
      };

    case ActionTypes.ADMISSIONSINGLE:
      return {
        ...state,
        singleAdmissionRed: payload,
      };
    case ActionTypes.ADMISSIONAPPLIEDLISTMERCHENTS:
      return {
        ...state,
        admissionMerchents: payload,
      };

    case ActionTypes.SINGLEADMISSIONAPPLIEDLIST:
      return {
        ...state,
        singleAppliedAdmission: payload,
      };
    case ActionTypes.ADMISSIONAPPLIEDLIST:
      return {
        ...state,
        appliedAdmissionListRed: payload,
      };
    case ActionTypes.ADMISSIONSTATUS:
      return {
        ...state,

        admissionStatusRed: payload,
      };
    case ActionTypes.ADMISSIONSAVE:
      return {
        ...state,
        storeAdmissionRed: payload,
        activeAdmissionNow: payload,
      };

    case ActionTypes.ADMISSIONACTIVE:
      return { ...state, admissionData: payload };
    case ActionTypes.ADMISSIONEDIT:
      return { ...state, editAdmissionRed: payload };
    default:
      return state;
  }
};
