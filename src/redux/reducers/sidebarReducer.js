import { ActionTypes } from "../constants/action-types";


const initialState = {
  
    activeSideBar: "dashboard",
    dashboardValue:false,
    subSideBar:""
}

export const sidebarReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_SIDEBAR:
            return {...state,  activeSideBar: payload};
        
        case ActionTypes.SET_DASHBOARD:
            return {...state,  dashboardValue: payload};
        
            case ActionTypes.SET_SUB_BAR:
                return {...state,  subSideBar: payload};
  
        default:
            return state;
    }
}