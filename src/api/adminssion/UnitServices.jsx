import axios from "axios";

const UnitServices = {};

UnitServices.list = async () => {
  let url = "/unit";
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

UnitServices.all = async (pageNo = null) => {
  let url = `unit-list`;
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

UnitServices.store = async (data) => {
  let url = "/unit";
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

UnitServices.update = async (data) => {
  let urlUpdate = "/unit/" + data.id + "?_method=PUT";
  const res = await axios
    .post(urlUpdate, data)
    .then((response) => {
      // console.log(`response.data.data`, response.data);
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
  return res;
};

UnitServices.delete = async (id) => {
  const urlDelete = "/unit/" + id + "?method=DELETE";
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

export default UnitServices;
