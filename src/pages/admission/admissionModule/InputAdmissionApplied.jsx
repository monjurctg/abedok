import React from "react";
import ModalJobCircularShow from "../../../components/modal/job_circular/ModalJobCircularShow";

function InputAdmissionApplied({ modalShow, id }) {
  return (
    <div>
      <ModalJobCircularShow id={id} modalShow={modalShow} />
    </div>
  );
}

export default InputAdmissionApplied;
