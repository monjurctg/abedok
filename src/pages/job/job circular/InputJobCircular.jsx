import React from "react";
import ModalJobCircularShow from "../../../components/modal/job_circular/ModalJobCircularShow";

function InputJobCircular({ modalShow, id }) {
  return (
    <div>
      <ModalJobCircularShow id={id} modalShow={modalShow} />
    </div>
  );
}

export default InputJobCircular;
