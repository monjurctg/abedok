import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import AuthServices from "../api/AuthServices";
import { toastifyAlertSuccess } from "../components/alert/tostifyALert";
import Admission from "../components/sidebar/Admission";
import BasicInfo from "../components/sidebar/BasicInfo";
import Dashboard from "../components/sidebar/Dashboard";
import Header from "../components/sidebar/header";
import Job from "../components/sidebar/Job";
import Payments from "../components/sidebar/Payments";
import Permission from "../components/sidebar/Permission";
import ProfileSIde from "../components/sidebar/profileSIde";
import Role from "../components/sidebar/Role";
import User from "../components/sidebar/User";
import { loadingState } from "../redux/actions/modalAction";
import { getNotificationCount } from "../redux/actions/notificationAction";
import { setdashBoard } from "../redux/actions/sidebarAction";
import { getPreviousNotification, getSideBar, setNotification, setPreviousNotification, setSideBar } from "../utils/auth";

function Sidebar() {
  const {dashboardValue } = useSelector(
    (state) => state.activeSideBar
  );
const [previousCount, setPreviousCount] = useState(0);
  let { loadingNow } = useSelector((state) => state.modalValue);
  let {notiCount  } = useSelector((state) => state.notificationRed);

  // console.log('notiCount',notiCount,'previousCount', parseInt(previousCount))
  // console.log('first', getPreviousNotification())
  let notificationClick = ()=>{
    setNotification(true)
    setPreviousNotification(notiCount)
  }
  
  useEffect(() => {
    setPreviousCount(getPreviousNotification());
  }, []);
  let location = useLocation();
  // console.log('notiCount', notiCount)

  var setLocation = location.pathname.substring(1); 
  let sidebar = getSideBar();
  // console.log('sidebar', sidebar)
  // console.log('setLocation', setLocation)

  let dispatch = useDispatch();

  useEffect(() => {
    setSideBar(setLocation);
    dispatch(getNotificationCount())
    // dispatch(setSideBarState(AD.DASHBOARD));
    // effect
   
  }, [location]);
  
  // const [state, setState] = useReducer(
  //   (state, newState) => ({ ...state, ...newState }),
  //   {
  //     dashboard: sidebar === SIDEBAR.DASHBOARD ? true : false,
  
  //   }
  // );

  let logout = async()=>{
    dispatch(loadingState(true))
    let res = await AuthServices.logout()
    if(res.status === 200){
    dispatch(loadingState(false))

      toastifyAlertSuccess(res.data.message,"top-center")
      setTimeout(() => {
        window.localStorage.removeItem("auth_token"); 
        window.localStorage.removeItem("sidebar"); 

        window.location.reload()
        
      }, 1000);
    }
    
  }
  // console.log('sidebar', sidebar)

  return (
    <div
      id="showMenu"
      className={dashboardValue ? `sidebar sideBar__responsive` : "sidebar"}
    >
      <div className="side__menuBar">
        <i
          className="fa-solid fa-xmark"
          onClick={() => dispatch(setdashBoard(false))}
        ></i>
      </div>
      <Header />
      <ProfileSIde />

      <div className="links">
        <ul>
          <Dashboard sidebar={sidebar}  />
          <User sidebar={sidebar} />
          <Job sidebar={sidebar}/> 
          <Payments sidebar={sidebar}/> 

          <Admission sidebar={sidebar} />
          <BasicInfo sidebar={sidebar} />
          <Role sidebar={sidebar}/>
          <Permission sidebar={sidebar}/>
          <div className="logout text-center mt-3">
           
           <Link to={"/notification"}>
          <button onClick={notificationClick}>
            Notification
          {/* {loadingNow ? "Loging out" : "Logout"} */}
          </button>
          <span className="notification active">{(notiCount - previousCount) > 0 ?(notiCount - previousCount):0}</span>
           </Link>
          </div>
          <div className="logout text-center mt-3">
          <button onClick={logout}>
          {loadingNow ? "Loging out" : "Logout"}
          </button>

          </div>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
