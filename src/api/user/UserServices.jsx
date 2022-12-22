import axios from "axios";

const UserServices = {};

UserServices.userlist = async (search = null, pageNo = null) => {
  // console.log("pageNo", pageNo);
  let searchBar = search?.name || "";
  let page = pageNo || "";
  // console.log("page :>> ", page);
  // console.log("searchBar :>> ", searchBar);
  let url = searchBar
    ? `user-list?search=${searchBar}`
    : `user-list?page=${page}`;
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
UserServices.merchentUserlist = async (search = null, pageNo = null) => {
  // console.log("pageNo", pageNo);
  let searchBar = search?.name || "";
  let page = pageNo || "";
  // console.log("page :>> ", page);
  // console.log("searchBar :>> ", searchBar);
  let url = searchBar
    ? `web-merchant-list?search=${searchBar}`
    : `web-merchant-list?page=${page}`;
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

// admission/users-list/6
UserServices.eligibleUserAdmission = async (
  search = null,
  pageNo = null,
  id
) => {
  let ids = id || null;
  let page = pageNo || 1;
  // console.log("id :>> ", id);
  let url = `admission/users-list/${ids}?page=${page}`;
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

UserServices.eligibleUserJob = async (search = null, pageNo = null, id) => {
  let ids = id || null;
  let page = pageNo || 1;
  // console.log("id :>> ", id);
  let url = `job/users-list/${ids}?page=${page}`;
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

UserServices.singleUser = async (id) => {
  let ids = id || null;
  // console.log("id :>> ", id);
  let url = `user-show/${ids}`;
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

UserServices.singleAdmission = async (id) => {
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

UserServices.activeList = async (pageNo = null) => {
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

UserServices.store = async (data) => {
  let url = "/admin/register";
  let res = await axios
    .post(url, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });
  return res;
};

UserServices.basicInfoStore = async (data) => {
  let url = "/basicInfo";
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

UserServices.basicInfoupdate = async (data, id) => {
  let url = "/basicInfo/" + id + "?_method=PUT";
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

UserServices.addressUpdate = async (data, id) => {
  let url = "/address/" + id + "?_method=PUT";
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

UserServices.addressStore = async (data) => {
  let url = "/address";
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

UserServices.graduate = async (data) => {
  let url = "/graduate";
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
UserServices.higherGraduate = async (data) => {
  let url = "/higher-graduate";
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

UserServices.skill = async (data) => {
  let url = "/skill";
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

UserServices.experience = async (data) => {
  let url = "/experience";
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

UserServices.update = async (data) => {
  // console.log("data :>> ", data);
  let urlUpdate = "/admission/" + data.id + "?_method=PUT";
  const res = await axios
    .post(urlUpdate, data.name)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return res;
};

UserServices.delete = async (id) => {
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

UserServices.userDelete = async (id) => {
  const urlDelete = "/user/" + id;
  const res = await axios
    .delete(urlDelete)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return res;
};

UserServices.changeActivation = async (id = null) => {
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

UserServices.merchantList = async () => {
  let url = `all-merchant-list`;
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

UserServices.merchantUserList = async () => {
  let url = `merchant-list`;
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

UserServices.transferUser = async (id, data) => {
  let url = `merchant-transfer/${id}`;
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

// /{user_id}

export default UserServices;
