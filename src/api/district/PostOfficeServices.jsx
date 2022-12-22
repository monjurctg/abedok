import axios from "axios";

const PostOfficeServices = {};

PostOfficeServices.list = async (pageNo = null) => {
  let url = `/post-office?page=${pageNo}`;
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

PostOfficeServices.allList = async () => {
  let url = `/post-office-list`;
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

PostOfficeServices.store = async (data) => {
  let url = "/post-office";
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

PostOfficeServices.update = async (data) => {
  let urlUpdate = "/post-office/" + data.id + "?_method=PUT";
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

PostOfficeServices.singleList = async (id) => {
  let url = `post-office/${id}`;
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

PostOfficeServices.delete = async (id) => {
  const urlDelete = "/post-office/" + id + "?method=DELETE";
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

export default PostOfficeServices;
