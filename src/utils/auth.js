
const authToken = "auth_token";
const intendedUrl = "intendedUrl";
const defaultIntendedUrl = "/dashboard";
const sidebar = "sidebar";
const defaultSidebar = "/dashboard"
const notification = "notification";
const notificationPrevious = "previousNotification"; 
export const getToken = () => window.localStorage.getItem(authToken);

export const setToken = (token) => {
  token
    ? window.localStorage.setItem(authToken, token)
    : window.localStorage.removeItem(authToken);
};



export const getNotification = () => window.localStorage.getItem(notification);

export const setNotification = (token) => {
  token
    ? window.localStorage.setItem(notification, token)
    : window.localStorage.removeItem(notification);
};

export const getPreviousNotification = () => window.localStorage.getItem(notificationPrevious);

export const setPreviousNotification = (token) => {
  token
    ? window.localStorage.setItem(notificationPrevious, token)
    : window.localStorage.removeItem(notification);
};


export const getIntendedUrl = () => {
  // console.log(intendedUrl|| defaultIntendedUrl);
  // console.log("intendedUrl", window.localStorage.getItem(intendedUrl));
  // console.log("defaultIntendedUrl", defaultIntendedUrl);
  return window.localStorage.getItem(intendedUrl) || defaultIntendedUrl;
};

export const setIntendedUrl = (url) => {
  url
    ? window.localStorage.setItem(intendedUrl, url)
    : window.localStorage.removeItem(intendedUrl);
};


export const setSideBar = (value)=>{
 window.localStorage.setItem(sidebar, value)
  // : window.localStorage.removeItem(sidebar);
}

export const getSideBar = () => {

  return window.localStorage.getItem(sidebar) || defaultSidebar;
};


export const validated = (value)=>{
  let errors = Object.values(value)
  return errors;
 }