import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AD } from "../../constants/ad";
import { boardList } from "../../redux/actions/university/boardAction";
import userType from "../../utils/useType";
import { toastifyAlertSuccess } from "../alert/tostifyALert";

function ModalInput({ name, type, pageNo }) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      text: "",
    }
  );

  const { saveBoard } = useSelector((state) => state.board);

  useEffect(() => {
    if (saveBoard?.message === AD.BOARDSUCCESS) {
      toastifyAlertSuccess("sucess","top-center")
      disPatch(boardList(pageNo));

    }
  }, [saveBoard]);

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
    // console.log("pageNo", pageNo);
    if (name === "Unit") disPatch(userType.Unit({ name: state.text }));
    else if (name === "Board") {
      disPatch(userType.Board({ name: state.text }));
      // console.log("last");
      // console.log("save", saveBoard);
    

      // console.log('boardList')
    }
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
              Add {name}
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
                placeholder={`Add ${name}`}
              ></textarea>
            ) : (
              <input
                className="modal__input"
                value={state.text}
                onChange={inputChange}
                name="text"
                type="text"
                placeholder={`Add ${name}`}
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
              Add {name}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer transition={Zoom} />
    </div>
  );
}

export default ModalInput;
