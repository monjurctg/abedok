
import { ActionTypes } from "../constants/action-types";

export const setSideBarState = (season) => {
    return {
        type: ActionTypes.SET_SIDEBAR,
        payload: season
    }
}

export const setdashBoard = (value) => {
    return {
        type: ActionTypes.SET_DASHBOARD,
        payload: value
    }
}

export const setSubBarState = (sub) => {
    return {
        type: ActionTypes.SET_SUB_BAR,
        payload: sub
    }
}

// export const fetchSeason = () =>async(dispatch)=>{
//     const res = await SeasonsServices.index({});
//     dispatch({type : ActionTypes.FETCH_SEASONS, payload: res.data});
// }