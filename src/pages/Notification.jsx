import React, { useEffect } from "react";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Dashboard from "../components/layout/Dashboard";
import SubLoader from "../components/SubLoader";
import {
  getNotification,
  getNotificationCount,
} from "../redux/actions/notificationAction";

function Notification() {
  let { notiCount } = useSelector((state) => state.notificationRed);
  let { notificationData } = useSelector((state) => state.notificationRed);

  console.log("notificationData", notificationData);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotificationCount());
    dispatch(getNotification());
  }, []);

  let examShow = "";
  // console.log("admissionData :>> ", admissionData);
  if (notificationData?.length > 0) {
    examShow = notificationData.map((exam, index) => {
      return (
        <tr index={index} key={index}>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.title}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <div>
                <h5>{exam.message}</h5>
              </div>
            </div>
          </td>
          <td>
            <div className="d-flex td_details">
              <Link to={exam?.url}>
                <h5>Go to Url</h5>
              </Link>
            </div>
          </td>
        </tr>
      );
    });
  }

  let userModule = <SubLoader />;

  if (notificationData) {
    userModule = (
      <div className="university__details">
        <div className="tb__scroll">
          <table className="">
            <tbody>
              <tr>
                <th>Title</th>
                <th>Message</th>
                <th>Url</th>
              </tr>
              {examShow}
            </tbody>
          </table>
        </div>
        <div className="my-5 text-center  pagination justify-content-center">
          {/* <button className="submit_btn">See more</button> */}
          {notificationData?.meta ? (
            <Pagination
              activePage={notificationData?.meta.current_page}
              itemsCountPerPage={notificationData?.meta.per_page}
              totalItemsCount={notificationData?.meta.total}
              pageRangeDisplayed={10}
              // onChange={handlePageChange}
              itemClass="page-item"
              linkClass="page-link"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
  return (
    <div>
      <Dashboard>
        <div className="university">
          <div className="university__list my-4">
            <div className="my-3 university_texts">
              <h3 className="w-50">Notification</h3>
              <div
                className="university_texts_input d-flex"
                style={{ columnGap: "10px" }}
              >
                <h4 className="notification act">{notiCount}</h4>
              </div>
            </div>

            {userModule}
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

export default Notification;
