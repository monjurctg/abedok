import { ActionTypes } from "../../constants/action-types";

const initialState = {
  jobCircularData: [],
  activeJobData: [],
  jobStatusRed: false,
  storeJobRed: false,
  singleJobRed: [],
  editJobRed: false,
  appliedJobList: [],
  pendingJobList: [],
  jobMerchents: [],
  rollAdd: false,
  paymentAdminData: [],
};

export const jobCircularReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.JOBCIRCULAR:
      return {
        ...state,

        jobCircularData: payload,
      };

    case ActionTypes.ROLLADD:
      return {
        ...state,

        rollAdd: payload,
      };

    case ActionTypes.PAYMENTADMIN:
      return {
        ...state,

        paymentAdminData: payload,
      };

    case ActionTypes.JOBCIRCULARSINGLE:
      return {
        ...state,

        singleJobRed: payload,
      };

    case ActionTypes.JOBAPPLIEDLISTMERCHENTS:
      return {
        ...state,

        jobMerchents: payload,
      };

    case ActionTypes.JOBAPPLIEDLIST:
      return {
        ...state,

        appliedJobList: payload,
      };

    case ActionTypes.JOBPENDINGLIST:
      return {
        ...state,

        pendingJobList: payload,
      };

    case ActionTypes.JOBCIRCULARSTATUS:
      return {
        ...state,

        jobStatusRed: payload,
      };
    case ActionTypes.JOBCIRCULARSAVE:
      return {
        ...state,
        storeJobRed: payload,
      };

    case ActionTypes.JOBCIRCULARACTIVE:
      return { ...state, jobCircularData: payload };

    case ActionTypes.JOBCIRCULAREDIT:
      return { ...state, editJobRed: payload };
    default:
      return state;
  }
};
