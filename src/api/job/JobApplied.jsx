import axios from "axios";

const JobApplyServices = {};

JobApplyServices.store = async (data) => {
  let url = `/applied-job-store/${data.jobId}`;
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

JobApplyServices.list = async (pageNo) => {
  let url = `all-applied-job?page=${pageNo}`;
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

JobApplyServices.merchentsList = async (pageNo) => {
  let url = `all-applied-job-marchent`;
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

JobApplyServices.pendinglist = async () => {
  let url = `all-applied-job-pending`;
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

JobApplyServices.pendinglist = async () => {
  let url = `all-applied-job-pending`;
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

JobApplyServices.updateROll = async (data) => {
  let url = `applied-job-update/${data.id}`;
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

JobApplyServices.singleList = async (id) => {
  let url = `applied-job-show/${id}`;
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

JobApplyServices.changeStatus = async (id) => {
  let url = `applied-job-status-active/${id}`;
  const res = axios
    .post(url)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

JobApplyServices.updateStatus = async (data, id) => {
  let url = `applied-job-status-update/${id}?_method=PUT`;
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

JobApplyServices.storeStatus = async (data, id) => {
  let url = `applied-job-status-create/${id}`;
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

JobApplyServices.transferPayment = async (data, id) => {
  let url = `applied-job-store-merchant/${id}`;
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
JobApplyServices.newtransferPayment = async (data, id) => {
  let url = `transfer-payment-job-done`;
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

JobApplyServices.paymentListAdmin = async () => {
  let url = `admin-payment-send`;
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

// JobApplyServices.store = async (data) => {
//   let url = "/jobs";
//   let res = await axios
//     .post(url, data)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       return err.response;
//     });
//   return res;
// };

// JobCircularServices.changeActivation = async (id = null) => {
//   let url = `jobs-inactive/${id}?_method=PUT`;
//   const res = axios
//     .post(url)
//     .then((response) => {
//       return response;
//     })
//     .catch((err) => {
//       return err.response.data;
//     });
//   return res;
// };

// JobCircularServices.singleJob = async (id = null) => {
//   let url = `jobs/${id}`;
//   const res = axios
//     .get(url)
//     .then((response) => {
//       return response;
//     })
//     .catch((err) => {
//       return err.response;
//     });
//   return res;
// };

// JobCircularServices.activeList = async (pageNo = null) => {
//   let url = `jobs-active?page=${pageNo}`;
//   const res = axios
//     .get(url)
//     .then((response) => {
//       return response;
//     })
//     .catch((err) => {
//       return err.response.data;
//     });
//   return res;
// };

// JobCircularServices.store = async (data) => {
//   let url = "/jobs";
//   let res = await axios
//     .post(url, data)
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       return err.response;
//     });
//   return res;
// };

// JobCircularServices.update = async (data) => {
//   // console.log("data :>> ", data);
//   let urlUpdate = "/jobs/" + data.id + "?_method=PUT";
//   const res = await axios
//     .post(urlUpdate, data.name)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return error.response.data;
//     });
//   return res;
// };

// JobCircularServices.delete = async (id) => {
//   const urlDelete = "/jobs/" + id;
//   const res = await axios
//     .delete(urlDelete)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return error;
//     });
//   return res;
// };

export default JobApplyServices;
