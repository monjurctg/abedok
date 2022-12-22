import { editBoard, saveBoard } from "../redux/actions/university/boardAction";
import { saveUnit } from "../redux/actions/university/unitAction";

let userType = {};

userType.Unit = (data) => {
  return saveUnit(data);
};

userType.EditBoard = (data)=>{
  return editBoard(data)
}
userType.Board = (data)=>{
  // console.log('first')
    return saveBoard(data);
}
export default userType;
