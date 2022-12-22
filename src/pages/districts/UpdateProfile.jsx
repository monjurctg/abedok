import { saveAs } from "file-saver";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import Dashboard from "../../../components/layout/Dashboard";
// import SubLoader from "../../../components/SubLoader";
// import { singleUser } from "../../../redux/actions/userAction";
import Dashboard from "../../components/layout/Dashboard";
import SubLoader from "../../components/SubLoader";
import { singleUser } from "../../redux/actions/userAction";

function UpdateProfile() {
  const { singleUserRed } = useSelector((state) => state.user);

  let { id } = useParams();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(singleUser(id));
  }, []);

  let profileDetails = <SubLoader />;

  const downloadImage = () => {
    saveAs("image_url", "image.jpg"); // Put your image url here.
  };

  let education = "";
  if (singleUserRed?.data?.Education_Under_Graduate) {
    education = singleUserRed?.data?.Education_Under_Graduate.map((under) => {
      return (
        <div className="row my-3">
          <h5 className="">
            Education Under Graduate(
            {under?.name})
          </h5>
          <div className="col-md-6 showItems">
            <label className="my-2">Board:</label>
            <h4>{under?.board?.name || "No address"}</h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2"> Group:</label>
            <h4>{under?.group?.name || "No group"}</h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2"> passing_year:</label>
            <h4>{under?.passing_year?.name || "No group"}</h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2">Registration:</label>

            <h4>{under?.registration_no || "No group"}</h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2">Roll no:</label>
            <h4>{under?.roll_no || "No group"}</h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2">Result:</label>
            <h4>{under?.result || "No group"}</h4>
          </div>
        </div>
      );
    });
  }

  let postEducation = "";
  if (singleUserRed?.data?.Education_Post_Graduate) {
    postEducation = singleUserRed?.data?.Education_Post_Graduate.map(
      (under) => {
        return (
          <div className="row my-3">
            <h5 className="">
              Education Post Graduate(
              {under?.name})
            </h5>
            <div className="col-md-6 showItems">
              <label className="my-2">University:</label>
              <h4>{under?.university?.name || "No address"}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2"> Subject:</label>
              <h4>{under?.subject?.name || "No group"}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2"> passing_year:</label>
              <h4>{under?.passing_year?.name || "No group"}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Registration:</label>

              <h4>{under?.registration_no || "No group"}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Roll no:</label>
              <h4>{under?.roll_no || "No group"}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Result:</label>
              <h4>{under?.result || "No group"}</h4>
            </div>
          </div>
        );
      }
    );
  }

  if (singleUserRed?.data) {
    profileDetails = (
      <>
        <div className="profile_email">
          <div className="my-3">
            <h5 className="">User Info</h5>
            <div className="row">
              <div className="col-md-4 showItems">
                <label className=""> Name:</label>
                <h4>{singleUserRed?.data?.name}</h4>
              </div>
              <div className="col-md-4 showItems">
                <label className=""> Email:</label>
                <h4>{singleUserRed?.data?.email}</h4>
              </div>

              <div className="col-md-4 showItems">
                <label className=""> Phone:</label>
                <h4>{singleUserRed.data?.phone || "No phone"}</h4>
              </div>
              {/* <button className="btn btn-primary smallBtn c_point btn-show red gx-2 w-50">
                Update
              </button> */}
            </div>

            {/* <div className="inputs row">
              <div className="col-md-4">
                <label className="my-2">Name</label>

                <input
                  className="modal__input"
                  // onChange={inputChange}
                  type="text"
                  // value={state.name}
                  name="name"
                  placeholder={"Name"}
                />
              </div>
              <div className="col-md-4">
                <label className="my-2">Name</label>

                <input
                  className="modal__input"
                  // onChange={inputChange}
                  type="text"
                  // value={state.name}
                  name="name"
                  placeholder={"Name"}
                />
              </div>
              <div className="col-md-4">
                <label className="my-2">Name</label>

                <input
                  className="modal__input"
                  // onChange={inputChange}
                  type="text"
                  // value={state.name}
                  name="name"
                  placeholder={"Name"}
                />
              </div>
            </div> */}
          </div>
          {/* <div className="image_modal_profile">
              <img
                src={
                  singleUserRed?.data?.documents?.pp_photos ||
                  singleUserRed?.data?.photo
                }
                alt=""
              />
            </div> */}
        </div>
        <div className="row my-3">
          <h5 className="">Present address</h5>
          <div className="col-md-6 showItems">
            <label className="my-2"> District:</label>
            <h4>
              {singleUserRed?.data?.Address[0]?.district?.name || "No address"}
            </h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2"> Post Office:</label>
            <h4>
              {singleUserRed?.data?.Address[0]?.post_office?.name ||
                "No post office"}
            </h4>
          </div>

          <div className="col-md-6 showItems">
            <label className="my-2"> Postal code:</label>
            <h4>
              {singleUserRed?.data?.Address[0]?.postal_code || "No postal code"}
            </h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2">Upazila:</label>
            <h4>
              {singleUserRed?.data?.Address[0]?.upazila?.name || "No upazila"}
            </h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2">Care of:</label>
            <h4>{singleUserRed?.data?.Address[0]?.care_of || "No value"}</h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2">Details:</label>
            <h4>{singleUserRed?.data?.Address[0]?.details || "No data"}</h4>
          </div>
        </div>
        <div className="row my-3">
          <h5 className="">Permanent address</h5>
          <div className="col-md-6 showItems">
            <label className="my-2"> District:</label>
            <h4>
              {singleUserRed?.data?.Address[1]?.district?.name || "No address"}
            </h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2"> Post Office:</label>
            <h4>
              {singleUserRed?.data?.Address[1]?.post_office?.name ||
                "No post office"}
            </h4>
          </div>

          <div className="col-md-6 showItems">
            <label className="my-2"> Postal code:</label>
            <h4>
              {singleUserRed?.data?.Address[1]?.postal_code || "No postal code"}
            </h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2">Upazila:</label>
            <h4>
              {singleUserRed?.data?.Address[1]?.upazila?.name || "No upazila"}
            </h4>
          </div>

          <div className="col-md-6 showItems">
            <label className="my-2">Care of:</label>
            <h4>{singleUserRed?.data?.Address[1]?.care_of || "No value"}</h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2">Details:</label>
            <h4>{singleUserRed?.data?.Address[1]?.details || "No data"}</h4>
          </div>
        </div>
        <div className="row my-3">
          <h5 className="">Basic info</h5>
          <div className="col-md-6 showItems">
            <label className="my-2"> Birth date:</label>
            <h4>
              {singleUserRed?.data?.Basic_Info?.birth_date || "No address"}
            </h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2"> father name:</label>
            <h4>
              {singleUserRed?.data?.Basic_Info?.father_name || "No address"}
            </h4>
          </div>

          <div className="col-md-6 showItems">
            <label className="my-2"> Mother name:</label>
            <h4>
              {singleUserRed?.data?.Basic_Info?.mother_name || "No address"}
            </h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2">Nid:</label>
            <h4>{singleUserRed?.data?.Basic_Info?.nid || "No address"}</h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2">Gender:</label>
            <h4>
              {singleUserRed?.data?.Basic_Info?.gender === 1
                ? "Male"
                : "Female" || "No address"}
            </h4>
          </div>
          <div className="col-md-6 showItems">
            <label className="my-2">Quota:</label>
            <h4>
              {singleUserRed?.data?.Basic_Info?.quota?.name || "No address"}
            </h4>
          </div>
        </div>

        {education}
        {postEducation}
        <div className="row my-3">
          <h5 className="">Documents</h5>
          <div className="col-md-4 showItems">
            <label className="my-2">Profile:</label>
            <div className="image_modal_profile">
              <img src={singleUserRed?.data?.documents?.pp_photo} alt="No" />
            </div>
            <div className="create_btn">
              <button onClick={downloadImage}>Download</button>
            </div>
          </div>

          <div className="col-md-4 showItems">
            <label className="my-2">Nid:</label>
            <div className="image_modal_profile">
              <img src={singleUserRed?.data?.documents?.nid_photos} alt="No" />
            </div>
            <div className="create_btn">
              <button onClick={downloadImage}>Download</button>
            </div>
          </div>
          <div className="col-md-4 showItems">
            <label className="my-2">Signature:</label>
            <div className="image_modal_profile">
              <img
                src={singleUserRed?.data?.documents?.signature_photos}
                alt="No"
              />
            </div>
            <div className="create_btn">
              <button onClick={downloadImage}>Download</button>
            </div>
          </div>
          <div className="col-md-4 showItems">
            <label className="my-2">Birth Certificate:</label>
            <div className="image_modal_profile">
              <img
                src={singleUserRed?.data?.documents?.birth_certificate_photos}
                alt="No"
              />
            </div>
            <div className="create_btn">
              <button onClick={downloadImage}>Download</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <Dashboard>
        <div className="university userShow">
          <div className="profile-details">{profileDetails}</div>
        </div>
      </Dashboard>
    </div>
  );
}

export default UpdateProfile;
