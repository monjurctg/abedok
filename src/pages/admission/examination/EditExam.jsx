import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EditModal from "../../../components/modal/EditModal";
import { editV } from "../../../redux/actions/inputAction";

function EditExam() {


  let { editValue } = useSelector((state) => state.inputVal);
  let dispatch = useDispatch();
  let inputChange = (e) => {
    // console.log("first");

    e.preventDefault();
    let value = e.target.value;
    dispatch(editV(value));
    // setState({ [name]: value });
  };

  let handleSubmit = () => {
    // dispatch(saveExam({ name: inputValue }));
  };

  return (
    <div>
      <EditModal
        inputChange={inputChange}
        name="Exam"
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default EditExam;
