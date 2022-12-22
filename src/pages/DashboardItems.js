import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import AuthServices from "../api/AuthServices";
import application from "../assets/img/icons/Group 133.svg";
import marchents from "../assets/img/icons/Group 134.svg";
import transaction from "../assets/img/icons/Group 135.svg";
import pending from "../assets/img/icons/Group 136.svg";
import uploaded from "../assets/img/icons/Group 137.svg";
import user from "../assets/img/user.svg";
import { toastifyAlertSuccess } from "../components/alert/tostifyALert";
import Dashboard from "../components/layout/Dashboard";
import SubLoader from "../components/SubLoader";
import { loadingState } from "../redux/actions/modalAction";

// import { userList } from "../redux/actions/userAction.jsx";


function DashboardItems() {
//   const {userListRed} = useSelector((state)=> state.user)
// const [dashboardRes, setDashboardRes] = useState(true);
let { loadingNow } = useSelector((state) => state.modalValue);


const [dataCount, setdataCount] = useState();
  // console.log('currentUserasdasdasdasd>>', userListRed)

  let dispatch = useDispatch();
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
  useEffect(()=>{
    // userlist();
    // dispatch(userList())
    dashboardCounts();
  },[])

  // function open(){
  //   // let showMenu = document.queryS("#showMenu");
  //   // setDashboardRes(!dashboardRes)
  //   // console.log('dashboardRes', dashboardRes)
  //   dispatch(setdashBoard(dashboardRes))

  // };
  

  let dashboardCounts = async()=>{
    let res = await AuthServices.count();
    if(res.status === 200){
      setdataCount(res.data)
    }
    // console.log('res', res)
  }

  let dashboard = <SubLoader/>
  if(dataCount){
    dashboard =  <div className="row gy-4">
    <div className="col-md-4">
      <div className="item_featured ">
        <h4>Total Users</h4>
        <div className="texts pt-3">
        <p>{dataCount.userCount}</p>
       
          <span>
            <img src={user} alt="user" />
          </span>
        </div>
      </div>
    </div>

    <div className="col-md-4">
      <div className="item_featured">
        <h4>Job Count</h4>
        <div className="texts pt-3">
        <p>{dataCount.jobCount}</p>
          <span> <img src={application} alt="user" /></span>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="item_featured">
        <h4>Total Marchents</h4>
        <div className="texts pt-3">
          <p>{dataCount.marchent}</p>
          <span> <img src={pending} alt="user" /></span>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="item_featured">
        <h4>Total Workers</h4>
        <div className="texts pt-3">
          <p>{dataCount.worker}</p>
          <span> <img src={pending} alt="user" /></span>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="item_featured">
        <h4>Applied jobs</h4>
        <div className="texts pt-3">
          <p>{dataCount.appliedJobs}</p>
          <span> <img src={marchents} alt="user" /></span>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="item_featured">
        <h4>User Admmission</h4>
        <div className="texts pt-3">
          <p>{dataCount.userAdmmission}</p>
          <span> <img src={uploaded} alt="user" /></span>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="item_featured">
        <h4>Total Commission Amount</h4>
        <div className="texts pt-3">
          <p>{dataCount.totalCommission}</p>
          <span> <img src={transaction} alt="user" />`</span>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="item_featured">
        <h4>Balance</h4>
        <div className="texts pt-3">
          <p>{dataCount.balance}</p>
          <span> <img src={transaction} alt="user" />`</span>
        </div>
      </div>
    </div>
    {/* <div className="col-md-6">
      <div className="item_featured">
        <h4>Pending Applications</h4>
        <div className="texts pt-3">
          <p>{dataCount.pendingappliedCount}</p>
          <span> <img src={transaction} alt="user" />`</span>
        </div>
      </div>
    </div> */}
    <div className="col-md-6 c_point"  onClick={logout}>
      <div className="big_btn">
        <h4>{loadingNow ? "Loging out" : "Logout"}</h4>
      </div>
    </div>
  
  </div>
  }

  return (
    <Dashboard permission={true} module={"dashboard"}>

    <div className="dashbroad__item">
    
      {dashboard}
      </div>
      <ToastContainer transition={Zoom} />
  
    </Dashboard>
  );
}

DashboardItems.displayName = "Dashboard";
export default DashboardItems;
