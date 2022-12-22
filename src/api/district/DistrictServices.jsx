import axios from "axios";

const DistrictServices = {};

DistrictServices.list = async (pageNo = null) => {
  let url = `/district?page=${pageNo}`;
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

DistrictServices.allList = async () => {
  let url = `/district-list`;
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

DistrictServices.store = async (data) => {
  let url = "/district";
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

DistrictServices.update = async (data) => {
  let urlUpdate = "/district/" + data.id + "?_method=PUT";
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

DistrictServices.singleList = async (id) => {
  let url = `district/${id}`;
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

DistrictServices.delete = async (id) => {
  const urlDelete = "/district/" + id + "?method=DELETE";
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

export default DistrictServices;
