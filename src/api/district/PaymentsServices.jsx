import axios from "axios";

const PaymentsServices = {};

PaymentsServices.workerPaymentList = async (pageNo = null) => {
  let url = `/worker-payment-send`;
  // axios.get('/sanctum/csrf-cookie').then(response => {
  const res = axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      // console.log("err.response.data :>> ", err.response.data);
      return err.response;
    });
  return res;
};

export default PaymentsServices;
