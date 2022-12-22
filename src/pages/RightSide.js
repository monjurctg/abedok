import React from 'react'

function RightSide() {
  return (
    <div>
         <header className="wrapper">
        <div className="left__side">
          <div className="container">
            {/* <div className="row">
              <div className="col-12"> */}
            <div className="header__logo">
              {/* <img src={logo} alt="logo" /> */}
              {/* </div>
              </div> */}
            </div>
          </div>
          <div className="main__div text-center">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div>
                    {/* <img src={human} alt="human" /> */}
                  </div>
                  <div className="texr-center">
                    <h3>Job search</h3>
                    <h5>Get real time search and get new jobs</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="right__side">
          <h3>Welcome</h3>
        </div>
      </header>
    </div>
  )
}

export default RightSide