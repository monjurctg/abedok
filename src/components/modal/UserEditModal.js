import React, { memo } from "react";
import { useSelector } from "react-redux";

export const UserEditModal = ({
  children,
}) => {
  const { modalUp } = useSelector((state) => state.modalValue);
  return (
    <div
      className={`modal_self ${modalUp ? "show modalOne" : "modalOneOut"}`}
      id="main_div"
    >
      {children}
    </div>
  );
};

export const MemoUserEditModal = memo(UserEditModal);
