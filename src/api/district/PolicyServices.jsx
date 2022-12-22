import axios from "axios";

const PolicyServices = {};

PolicyServices.list = async (pageNo = null) => {
  let url = `/policy/1`;
  // axios.get('/sanctum/csrf-cookie').then(response => {
  const res = axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      // console.log("err.response.data :>> ", err.response.data);
      return err.response.data;
    });
  return res;
};

PolicyServices.store = async (data) => {
  let url = "/policy";
  let res = await axios
    .post(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
  return res;
};

PolicyServices.update = async (data) => {
  let urlUpdate = "/policy/" + data.id + "?_method=PUT";
  const res = await axios
    .post(urlUpdate, data)
    .then((response) => {
      // console.log(`response.data.data`, response.data);
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
};

PolicyServices.delete = async (id) => {
  const urlDelete = "/policy/" + id + "?method=DELETE";
  const res = await axios
    .delete(urlDelete)
    .then((response) => {
      //   $.notify({ message:'Deleted' }, { type: 'success' });
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return res;
};

export default PolicyServices;
