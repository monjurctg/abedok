import axios from "axios";

const UniversityServices = {};

UniversityServices.list = async (pageNo = null) => {
  let url = `/university?page=${pageNo}`;
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

UniversityServices.singleView = async (id = null) => {
  let url = `/university/${id}`;
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

UniversityServices.all = async (pageNo = null) => {
  let url = `university-list`;
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

UniversityServices.store = async (data) => {
  let url = "/university";
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
UniversityServices.photos = async (data) => {
  let url = "/photos";
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

UniversityServices.certificatePhotos = async (data) => {
  let url = "/photos-sub";
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

UniversityServices.update = async (data, id) => {
  // console.log("data :>> ", data);
  let urlUpdate = "/university/" + id + "?_method=PUT";
  const res = await axios
    .post(urlUpdate, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
};

UniversityServices.delete = async (id) => {
  const urlDelete = "/university/" + id + "?method=DELETE";
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

export default UniversityServices;
