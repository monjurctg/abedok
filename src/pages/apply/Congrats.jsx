import React from "react";
import { Link, useParams } from "react-router-dom";
import image from "../../assets/img/congrats.svg";
import Dashboard from "../../components/layout/Dashboard";

function Congrats() {
  let { id, userId } = useParams();
  return (
    <div>
      <Dashboard>
        <div className="university">
          <h2>Payment</h2>
          <div className="payment">
            <div className="payment_img">
              <img src={image} alt="" />
            </div>
            <div className="payment_content">
              <p>Application fee : 800</p>
              <p>Application fee : 800</p>
              <button className="payment_btn">
                <Link to={`/payment/apply/${id}/${userId}/select`}>৳ 850</Link>
              </button>
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export default Congrats;
