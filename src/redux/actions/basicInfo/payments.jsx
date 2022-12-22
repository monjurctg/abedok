import PaymentsServices from "../../../api/district/PaymentsServices";
import { ActionTypes } from "../../constants/action-types";

export const workerPayments = () => async (dispatch) => {
  const res = await PaymentsServices.workerPaymentList();
  dispatch({
    type: ActionTypes.WORKERPAYMENT,
    payload: res.data,
  });
};
