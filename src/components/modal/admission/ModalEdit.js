import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { boardList } from "../../../redux/actions/university/boardAction";
import userType from "../../../utils/useType";
import { toastifyAlertError, toastifyAlertSuccess } from "../../alert/tostifyALert";

function ModalEdit({ name, type, pageNo,id,edit }) {
    // console.log('id', id)
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      text: name,
    }
  );

  const { editBoard } = useSelector((state) => state.board);
  // console.log('editBoard', editBoard)
  // console.log('modalShow', modalShow)

  useEffect(() => {
      
      if (editBoard.message === "The given data was invalid.") {
          toastifyAlertError("The given data was invalid.","top-center")
          disPatch(boardList(pageNo));

    }else{
        toastifyAlertSuccess("The given data was invalid.","top-center")
        disPatch(boardList(pageNo));
    }
  }, [editBoard]);

  let disPatch = useDispatch();

  let inputChange = (e) => {
    e.preventDefault();
    let target = e.target;
    let name = target.name;
    let value = target.value;
    setState({ [name]: value });
  };

  let handleSubmit = () => {
    // console.log("state.text", state.text);
    console.log("pageNo", pageNo);
    if (edit === "board") disPatch(userType.EditBoard({ name: state.text,
    id:id }));
    // else if (name === "Board") {
    //   disPatch(userType.Board({ name: state.text }));
      // console.log("last");
      // console.log("save", saveBoard);
    

      // console.log('boardList')
    // }
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Edit {name}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {type ? (
              <textarea
                className="modal__input"
                value={state.text}
                onChange={inputChange}
                name="text"
                type="text"
                placeholder={`Edit ${name}`}
              ></textarea>
            ) : (
              <input
                className="modal__input"
                value={state.text}
                onChange={inputChange}
                name="text"
                type="text"
                placeholder={`Edit ${name}`}
              />
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary btn_close"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-primary btn__modal"
            >
              Edit {name}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default ModalEdit;
