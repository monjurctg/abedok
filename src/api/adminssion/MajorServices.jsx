import axios from "axios";

const MajorServices = {};

MajorServices.list = async (pageNo = null) => {
  let url = `major?page=${pageNo}`;
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

MajorServices.allList = async () => {
  let url = `major-list`;
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

MajorServices.singleList = async (id) => {
  let url = `major/${id}`;
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

MajorServices.store = async (data) => {
  let url = "/major";
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

MajorServices.update = async (data) => {
  let urlUpdate = "/major/" + data.id + "?_method=PUT";
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

MajorServices.delete = async (id) => {
  const urlDelete = "/major/" + id + "?method=DELETE";
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

export default MajorServices;
