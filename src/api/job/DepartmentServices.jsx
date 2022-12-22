import axios from "axios";

const DepartmentServices = {};

DepartmentServices.list = async () => {
  let url = "/departments";
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

DepartmentServices.store = async (data) => {
  let url = "/departments";
  let res = await axios
    .post(url, data)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

DepartmentServices.update = async (data, id) => {
  let urlUpdate = "/departments/" + id + "?_method=PUT";
  const res = await axios
    .post(urlUpdate, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return res;
};

DepartmentServices.delete = async (id) => {
  const urlDelete = "/departments/" + id + "?method=DELETE";
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

export default DepartmentServices;
