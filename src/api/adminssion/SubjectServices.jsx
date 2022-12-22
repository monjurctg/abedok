import axios from "axios";

const SubjectServices = {};

SubjectServices.list = async (pageNo = null) => {
  let url = `subjects?page=${pageNo}`;
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

SubjectServices.listAll = async (pageNo = null) => {
  let url = `subjects-list`;
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

SubjectServices.singleList = async (id) => {
  let url = `subjects/${id}`;
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

SubjectServices.store = async (data) => {
  let url = "/subjects";
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

SubjectServices.update = async (data) => {
  let urlUpdate = "/subjects/" + data.id + "?_method=PUT";
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

SubjectServices.delete = async (id) => {
  const urlDelete = "/subjects/" + id + "?method=DELETE";
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

export default SubjectServices;
