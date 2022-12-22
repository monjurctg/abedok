import axios from "axios";

const RoleServices = {};

RoleServices.list = async (data) => {
  let url = "/role";
  // axios.get('/sanctum/csrf-cookie').then(response => {
  const res = axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response.data;
    });
  return res;
};
RoleServices.assignRole = async (data) => {
  let url = "role/assign";
  const res = axios
    .post(url, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

RoleServices.singleRole = async (id) => {
  let ids = id || null;
  // console.log("id :>> ", id);
  let url = `role/${ids}`;
  const res = await axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

RoleServices.store = async (data) => {
  let url = "role";
  let res = await axios
    .post(url, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

RoleServices.update = async (data) => {
  let urlUpdate = "/role/" + data.id + "?_method=PUT";
  const res = await axios
    .post(urlUpdate, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
};

RoleServices.delete = async (id) => {
  const urlDelete = "/role/" + id;
  const res = await axios
    .delete(urlDelete)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return res;
};

export default RoleServices;
