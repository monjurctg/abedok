import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { AD } from "../../../constants/ad";
function Education() {
  let navigate = useNavigate();

  let {id} = useParams()
  let route = `/user/create/student/${id}/education/`;
  let getSelectedValue = (e) => {
    e.preventDefault();
    const value = e.target.value;
    // console.log("value", value);
    if (value === AD.EDUCTION_JSC) {
      navigate(route + value);
    } else if (value === AD.EDUCTION_GRADUATE) {
      navigate(route + value);
    } else if (value === AD.EDUCTION_HSC) {
      navigate(route + value);
    } else if (value === AD.EDUCTION_SSC) {
      navigate(route + value);
    } else if (value === AD.EDUCTION_POST_GRADUATE) {
      navigate(route + value);
    }
  };

  // let auth = async()=>{
  //   let res = AuthServices.login();
  //   console.log('res', res)
  // }
  // useEffect(() => {
  //   auth();
  // }, []);
  return (
    <div className="education">
      <select onChange={getSelectedValue} name="level">
        <option disabled selected>
          Select level of Education
        </option>
        <option value="Jsc">JSC</option>
        <option value="Ssc">SSC</option>
        <option value="Hsc">HSC</option>
        <option value="Graduate">Graduate</option>
        <option value="Post-graduate">Post Graduate</option>
      </select>
    </div>
  );
}

export default Education;
