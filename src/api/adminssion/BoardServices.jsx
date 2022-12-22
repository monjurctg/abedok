import axios from "axios";

const BoardServices = {};

BoardServices.list = async (pageNo = null) => {
  let url = `/board?page=${pageNo}`;
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

BoardServices.allList = async () => {
  let url = `/board-list`;
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

BoardServices.store = async (data) => {
  let url = "/board";
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

BoardServices.update = async (data) => {
  let urlUpdate = "/board/" + data.id + "?_method=PUT";
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

BoardServices.delete = async (id) => {
  const urlDelete = "/board/" + id + "?method=DELETE";
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

export default BoardServices;
