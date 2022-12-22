import axios from "axios";

const PassingYearServices = {};

PassingYearServices.list = async (pageNo = null) => {
  let url = `passing_year?page=${pageNo}`;
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

PassingYearServices.Alllist = async () => {
  let url = `passing-year-list`;
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

PassingYearServices.store = async (data) => {
  let url = "/passing_year";
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

PassingYearServices.update = async (data) => {
  let urlUpdate = "/passing_year/" + data.id + "?_method=PUT";
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

PassingYearServices.delete = async (id) => {
  const urlDelete = "/passing_year/" + id + "?method=DELETE";
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

export default PassingYearServices;
