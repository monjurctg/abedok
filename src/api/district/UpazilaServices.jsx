import axios from "axios";

const UpazilaServices = {};

UpazilaServices.list = async (pageNo = null) => {
  let url = `/upazila?page=${pageNo}`;
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

UpazilaServices.allList = async (pageNo = null) => {
  let url = `/upazila-list`;
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

UpazilaServices.store = async (data) => {
  let url = "/upazila";
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

UpazilaServices.update = async (data) => {
  let urlUpdate = "/upazila/" + data.id + "?_method=PUT";
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

UpazilaServices.singleList = async (id) => {
  let url = `upazila/${id}`;
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

UpazilaServices.delete = async (id) => {
  const urlDelete = "/upazila/" + id + "?method=DELETE";
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

export default UpazilaServices;
