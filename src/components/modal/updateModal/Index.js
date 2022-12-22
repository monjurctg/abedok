import React from 'react'
import Address from './Address'
import AdmissionApply from './AdmissionApply'
import Documents from './Documents'
import Education from './Education'
import JobApply from './JobApply'
import PermanentAddress from './PermanentAddress'
import UserInfo from './UserInfo'

function Index({type,appliedJobId,fee,user_id,payment_id}) {

    console.log('payment_id', payment_id)
    let module = ""
    if(type === "User Info") module = <UserInfo type={type}/>
    else if(type === "Present Address") module = <Address type={type}/>
    else if(type === "Permanent Address") module = <PermanentAddress type={type}/>
    else if(type === "Education") module = <Education type={type}/>
    else if(type === "Documents") module = <Documents type={type}/>
    else if(type === "Payment") module = <JobApply type={type} appliedJobId={appliedJobId} fee={fee} user_id={user_id} payment_id={payment_id}/>
    else if(type === "Admission Payment") module = <AdmissionApply type={type} appliedJobId={appliedJobId} fee={fee} user_id={user_id} payment_id={payment_id}/>



    




    

  return (
    <div>{module}</div>
  )
}

export default Index