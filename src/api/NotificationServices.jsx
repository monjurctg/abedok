import axios from "axios";

const NotificationServices = {};

NotificationServices.notifications = async () => {
  let url = "user-notification";
  let res = await axios
    .get(url)
    .then((res) => res)
    .catch((res) => res.response);
  return res;
};

export default NotificationServices;
