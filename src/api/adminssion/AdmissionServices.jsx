import axios from "axios";

const AdmissionServices = {};

AdmissionServices.list = async (pageNo = null) => {
  let url = `admission`;
  // console.log("url :>> ", url);
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

// merchentsList
AdmissionServices.merchentsList = async (pageNo) => {
  let url = `all-applied-adsmission-marchent`;
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
AdmissionServices.singleAdmission = async (id) => {
  let ids = id || null;
  // console.log("id :>> ", id);
  let url = `admission/${ids}`;
  const res = await axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

AdmissionServices.withoutPermissionApply = async (data, id) => {
  let ids = id || null;
  // console.log("id :>> ", id);
  let url = `user-admission-web-store/${ids}`;
  const res = await axios
    .post(url, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

AdmissionServices.activeList = async (pageNo = null) => {
  let url = `admission/list`;
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

AdmissionServices.appliedList = async (pageNo = null) => {
  let url = `user-admission`;
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

AdmissionServices.updateROllAdmission = async (data) => {
  let url = `user-admission/${data.id}?_method=PUT`;
  const res = axios
    .post(url, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

AdmissionServices.store = async (data) => {
  let url = "/admission";
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

AdmissionServices.apply = async (data) => {
  let url = "/user-admission";
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

AdmissionServices.csvUpload = async (data) => {
  let url = "/excel-upload";
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

AdmissionServices.update = async (data, id) => {
  // console.log("data :>> ", data);
  let urlUpdate = "/admission/" + id + "?_method=PUT";
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

AdmissionServices.delete = async (id) => {
  const urlDelete = "/admission/" + id;
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

AdmissionServices.changeActivation = async (id = null) => {
  let url = `admission/status/${id}`;
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

AdmissionServices.admissionStatusList = async (id = null) => {
  let url = `admission/user/status/${id}`;
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

AdmissionServices.admissionAppliedSingleList = async (id = null) => {
  let url = `user-admission/${id}`;
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

AdmissionServices.admissionStatusChange = async (id = null) => {
  let url = `user-admission/status/${id}`;
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

AdmissionServices.updateStatus = async (data, id) => {
  // console.log("data :>> ", data);
  let urlUpdate = "/admission-status/" + id + "?_method=PUT";
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

AdmissionServices.storeStatus = async (data, id) => {
  // console.log("data :>> ", data);
  let urlUpdate = "/admission/user/status/store/" + id;
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

AdmissionServices.paymentTransfer = async (data, id) => {
  // console.log("data :>> ", data.name);
  let urlUpdate = `/admission-transfer-by-merchant/${id}`;
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

AdmissionServices.payNonPaid = async (data, id) => {
  // console.log("data :>> ", data.name);
  let urlUpdate = `/user-admission-store-merchant/${id}`;
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

AdmissionServices.newpayNonPaid = async (data, id) => {
  let url = `transfer-payment-admission-done`;
  const res = axios
    .post(url, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

export default AdmissionServices;
