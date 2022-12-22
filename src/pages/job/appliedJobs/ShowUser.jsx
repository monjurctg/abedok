import React from 'react';
import { saveAs } from "file-saver";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Dashboard from "../../../components/layout/Dashboard";
import Index from "../../../components/modal/updateModal/Index";
import { MemoUserEditModal } from "../../../components/modal/UserEditModal";
import SubLoader from "../../../components/SubLoader";
import { modalUpdate } from "../../../redux/actions/modalAction";
import { singleUser } from "../../../redux/actions/userAction";

function ShowUser() {
  const { singleUserRed } = useSelector((state) => state.user);
  const [resultType, setResultType] = useState([
    { id: 0, result_name: "Gpa" },
    { id: 1, result_name: "Division" },
  ]);
  const [division, setDevision] = useState([1, 2, 3]);

  let { id } = useParams();
  const [type, setType] = useState("");
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(singleUser(id));
  }, []);

  let profileDetails = <SubLoader />;

  const downloadImage = () => {
    saveAs("image_url", "image.jpg"); // Put your image url here.
  };

  let education = "";
  if (singleUserRed?.data?.Education_Under_Graduate?.length > 0) {
    education = singleUserRed?.data?.Education_Under_Graduate.map((under) => {
      let gpa = "";
      if (under?.result_type === "0") {
        gpa = under?.result;
      } else {
        gpa =
          under?.result == 4
            ? "Pass"
            : under?.result == 3
            ? "Third division"
            : under?.result == 2
            ? "Second division"
            : under?.result == 1
            ? "First division"
            : "";
      }
      return (
        <div className="row my-3">
          <div className="show_div">
            <h5 className="">
              Education Under Graduate(
              {under?.name})
            </h5>
            <div className="updateBtn">
              <button onClick={() => update("Education")}>Update</button>
            </div>
          </div>
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
            <label className="my-2">
              Result({under?.result_type === "0" ? "Gpa" : "Division"}):
            </label>
            <h4>{gpa || "No Result"}</h4>
          </div>
        </div>
      );
    });
  } else if (singleUserRed?.data?.Education_Under_Graduate) {
    education = (
      <div className="row my-3">
        <div className="show_div">
          <h5 className="">Education</h5>
          <div className="updateBtn">
            <button onClick={() => update("Education")}>Update</button>
          </div>
        </div>
      </div>
    );
  }

  let postEducation = "";
  if (singleUserRed?.data?.Education_Post_Graduate) {
    postEducation = singleUserRed?.data?.Education_Post_Graduate.map(
      (under) => {
        let gpa = "";
        if (under?.result_type === "0") {
          gpa = under?.result;
        } else {
          gpa =
            under?.result == 4
              ? "Pass"
              : under?.result == 3
              ? "Third division"
              : under?.result == 2
              ? "Second division"
              : under?.result == 1
              ? "First division"
              : "";
        }
        return (
          <div className="row my-3">
            <div className="show_div">
              <h5 className="">
                Education Post Graduate(
                {under?.name})
              </h5>
              <div className="updateBtn">
                <button onClick={() => update("Education")}>Update</button>
              </div>
            </div>
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
              <label className="my-2">
                Result({under?.result_type === "0" ? "Gpa" : "Division"}):
              </label>
              <h4>{gpa || "No group"}</h4>
            </div>
          </div>
        );
      }
    );
  }

  const update = (data) => {
    setType(data);
    dispatch(modalUpdate(true));
  };

  let photoSub = "";

  if (singleUserRed?.data?.photosub?.length > 0) {
    photoSub = singleUserRed?.data.photosub.map((photo) => {
      return (
        <div Index={photo.id} className="col-lg-6 showItems my-2">
          <label className="">{photo.photos_name}:</label>
          <div className="image_modal_profile">
            <img src={photo?.certificate_photos_sub} alt="No" />
          </div>
          <div className="create_btn smallBtn">
            <button onClick={downloadImage}>Download</button>
          </div>
        </div>
      );
    });
  }
  if (singleUserRed?.data) {
    profileDetails = (
      <>
        <div className="profile_email">
          <div className="row my-3">
            <div className="show_div">
              <h5 className="">User Info</h5>
              <div className="updateBtn">
                <button onClick={() => update("User Info")}>Update</button>
              </div>
            </div>
            <div className="col-md-6 showItems">
              <label className=""> Name:</label>
              <h4>{singleUserRed?.data?.name}</h4>
            </div>
            <div className="col-md-6 showItems">
              <label className=""> Profile Strength:</label>
              <h4>{singleUserRed?.data?.Profile_Strength}</h4>
            </div>

            <div className="col-md-6 showItems">
              <label className=""> Email:</label>
              <h4>{singleUserRed?.data?.email}</h4>
            </div>

            <div className="col-md-6 showItems">
              <label className=""> Phone:</label>
              <h4>
                {singleUserRed.data?.phone ||
                  singleUserRed?.data?.Basic_Info?.phone ||
                  "No phone"}
              </h4>
            </div>

            <div className="col-md-6 showItems">
              <label className="my-2"> Birth date:</label>
              <h4>
                {singleUserRed?.data?.Basic_Info?.birth_date ||
                  "No birthdate found"}
              </h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2"> Father name:</label>
              <h4>
                {singleUserRed?.data?.Basic_Info?.father_name ||
                  "No name found"}
              </h4>
            </div>

            <div className="col-md-6 showItems">
              <label className="my-2"> Mother name:</label>
              <h4>
                {singleUserRed?.data?.Basic_Info?.mother_name ||
                  "No name found"}
              </h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Nid:</label>
              <h4>{singleUserRed?.data?.Basic_Info?.nid || "No Nid"}</h4>
            </div>

            <div className="col-md-6 showItems">
              <label className="my-2">Gender:</label>
              <h4>
                {singleUserRed?.data?.Basic_Info?.gender == 1
                  ? "Male"
                  : "Female" || "No address"}
              </h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Quota:</label>
              <h4>
                {singleUserRed?.data?.Basic_Info?.quota?.name || "No Quota"}
              </h4>
            </div>
            <div className="col-md-6 showItems">
              <label className="my-2">Balance:</label>
              <h4>{singleUserRed?.data?.Balance || 0}</h4>
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div className="show_div">
            <h5 className="">Present address</h5>
            <div className="updateBtn">
              <button onClick={() => update("Present Address")}>Update</button>
            </div>
          </div>
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
          <div className="show_div">
            <h5 className="">Permanent address</h5>
            <div className="updateBtn">
              <button onClick={() => update("Permanent Address")}>
                Update
              </button>
            </div>
          </div>
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

        {education}
        {postEducation}
        <div className="row my-3">
          <div className="show_div">
            <h5 className="">Documents</h5>
            <div className="updateBtn">
              <button onClick={() => update("Documents")}>Update</button>
            </div>
          </div>
          <div className="col-lg-6 my-2 showItems">
            <label className="">Profile:</label>
            <div className="image_modal_profile">
              <img src={singleUserRed?.data?.documents?.pp_photo} alt="No" />
            </div>
            <div className="create_btn smallBtn">
              <button onClick={downloadImage}>Download</button>
            </div>
          </div>

          <div className="col-lg-6 my-2 showItems">
            <label className="">Nid:</label>
            <div className="image_modal_profile">
              <img src={singleUserRed?.data?.documents?.nid_photos} alt="No" />
            </div>
            <div className="create_btn smallBtn">
              <button onClick={downloadImage}>Download</button>
            </div>
          </div>

          <div className="col-lg-6 my-2 showItems">
            <label className="">Signature:</label>
            <div className="image_modal_profile">
              <img
                src={singleUserRed?.data?.documents?.signature_photos}
                alt="No"
              />
            </div>
            <div className="create_btn smallBtn">
              <button onClick={downloadImage}>Download</button>
            </div>
          </div>
          <div className="col-lg-6 showItems my-2">
            <label className="">Birth Certificate:</label>
            <div className="image_modal_profile">
              <img
                src={singleUserRed?.data?.documents?.birth_certificate_photos}
                alt="No"
              />
            </div>
            <div className="create_btn smallBtn">
              <button onClick={downloadImage}>Download</button>
            </div>
          </div>
          {photoSub}
        </div>
      </>
    );
  }

  return (
    <div>
      <Dashboard>
        <div className="university userShow">
          <MemoUserEditModal id={id} type={type}>
            <Index type={type} />
          </MemoUserEditModal>
          <div className="profile-details">{profileDetails}</div>
          {/* <Pdf targetRef={ref} filename="code-example.pdf">
            {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
          </Pdf> */}
        </div>
      </Dashboard>
    </div>
  );
}

export default ShowUser;
