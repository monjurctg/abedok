import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import {
  toastifyAlertError,
  toastifyAlertSuccess,
} from "../../components/alert/tostifyALert";
import ModalDesign from "../../components/modal/ModalDesign";
import { inputV } from "../../redux/actions/inputAction";
import { loadingState, modalState } from "../../redux/actions/modalAction";
import {
  boardList,
  editBoard,
  saveBoard,
} from "../../redux/actions/university/boardAction";

function BoardInput({ pageNo, modalShow, editName, id }) {
  let dispatch = useDispatch();
  let { inputValue } = useSelector((state) => state.inputVal);
  let { storeBoard, editBoardData } = useSelector((state) => state.board);

  let inputChange = (e) => {
    e.preventDefault();
    let value = e.target.value;
    dispatch(inputV(value));
  };

  // console.log("storePassingYearReducer :>> ", storePassingYear);
  useMemo(() => {
    // console.log("storeBoard :>> ", storeBoard);
    if (storeBoard?.message === "Board create Successfully") {
      dispatch(loadingState(false));
      dispatch(boardList(pageNo));
      toastifyAlertSuccess(storeBoard.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (storeBoard?.errors) {
      toastifyAlertError(storeBoard.errors.name[0], "top-center");
    }
  }, [storeBoard]);

  useMemo(() => {
    if (editBoardData?.message === "Board update Successfully") {
      dispatch(loadingState(false));
      dispatch(boardList(pageNo));
      toastifyAlertSuccess(editBoardData.message, "top-center");
      dispatch(modalState(false));
      dispatch(inputV(""));
    } else if (editBoardData?.errors) {
      toastifyAlertError(editBoardData.errors.name[0], "top-center");
    }
  }, [editBoardData]);

  let handleSubmit = () => {
    dispatch(loadingState(true));
    modalShow === "create"
      ? dispatch(saveBoard({ name: inputValue }))
      : dispatch(editBoard({ name: inputValue, id: id }));
  };
  return (
    <div>
      <ModalDesign
        name={"Board"}
        handleSubmit={handleSubmit}
        inputChange={inputChange}
        editName={editName}
        modalShow={modalShow}
      />

      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default BoardInput;
