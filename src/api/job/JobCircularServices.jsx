import axios from "axios";

const JobCircularServices = {};

JobCircularServices.list = async (pageNo = null) => {
  let url = `/jobs`;
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

JobCircularServices.adminPaymentUpdate = async (id) => {
  // console.log("data :>> ", data.name);
  let urlUpdate = "/user-payment-send-update/" + id;
  const res = await axios
    .post(urlUpdate)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return res;
};

JobCircularServices.changeActivation = async (id = null) => {
  let url = `jobs-inactive/${id}?_method=PUT`;
  const res = axios
    .post(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response.data;
    });
  return res;
};

JobCircularServices.singleJob = async (id = null) => {
  let url = `jobs/${id}`;
  const res = axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

JobCircularServices.activeList = async (pageNo = null) => {
  let url = `jobs-active?page=${pageNo}`;
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

JobCircularServices.store = async (data) => {
  console.log(data);
  let url = "/jobs";
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

JobCircularServices.csvUpload = async (data) => {
  let url = "/non-applied-status";
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

JobCircularServices.update = async (data) => {
  // console.log("data :>> ", data.name);
  let urlUpdate = "/jobs/" + data.id + "?_method=PUT";
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

JobCircularServices.withoutPermissionApply = async (data, id) => {
  // console.log("data :>> ", data.name);
  let urlUpdate = `applied-job-web-store/${id}`;
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

JobCircularServices.delete = async (id) => {
  const urlDelete = "/jobs/" + id;
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

JobCircularServices.paymentTransfer = async (data, id) => {
  // console.log("data :>> ", data.name);
  let urlUpdate = `/job-transfer-by-merchant/${id}`;
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

export default JobCircularServices;
