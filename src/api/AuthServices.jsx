import axios from "axios";

const AuthServices = {};

AuthServices.login = async (data) => {
  let url = "admin/login";
  // axios.get('/sanctum/csrf-cookie').then(response => {
  const res = axios
    .post(url, data)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      // console.log("err.response.data :>> ", err.response.data);
      return err.response;
    });
  return res;
};

AuthServices.user = async () => {
  let url = "/profile/view";
  const res = await axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
  return res;
};

AuthServices.count = async () => {
  let url = "/all-count";
  const res = await axios
    .get(url)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return res;
};

// AuthServices.Register = async (data) => {
//   let url = "/register";
//   // axios.get('/sanctum/csrf-cookie').then(response => {
//   const res = axios
//     .post(url, data)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       return error.response.data;
//     });
//   return res;
// };

// AuthServices.changePassword = async (data) => {
//   let url = "/change-password";
//   // axios.get('/sanctum/csrf-cookie').then(response => {
//   const res = axios
//     .put(url, data)
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       return [];
//     });
//   return res;
// };

AuthServices.logout = async () => {
  const res = await axios
    .post("/logout")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
  return res;
};

// logout

export default AuthServices;
