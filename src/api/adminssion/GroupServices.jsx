import axios from "axios";

const GroupServices = {};

GroupServices.list = async (pageNo = null) => {
  let url = `group?page=${pageNo}`;
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

GroupServices.all = async (pageNo = null) => {
  let url = `group-list`;
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

GroupServices.store = async (data) => {
  let url = "/group";
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

GroupServices.update = async (data) => {
  let urlUpdate = "/group/" + data.id + "?_method=PUT";
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

GroupServices.delete = async (id) => {
  const urlDelete = "/group/" + id + "?method=DELETE";
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

export default GroupServices;
