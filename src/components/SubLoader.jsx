import React from "react";

function SubLoader() {
  return (
    // <div className="spinner">
    //   <div
    //     className="inner-spinner"
    //     style={{ width: "4rem", height: "4rem", margin: "10px" }}
    //     role="status"
    //   >
    //     {/* <span className="sr-only">Loading...</span> */}
    //   </div>
    // </div>

    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "background: #e91e6314",
        border: "1px solid #e4e7ec",
      }}

      // background: #ffffff;
    >
      <div className="loading-1">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
  );
}

export default SubLoader;
