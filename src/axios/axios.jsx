import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { Store } from "redux";
import { ToastShow } from "../redux/slices/toastSlice";
import { removeToken } from "../redux/slices/authSlice";
import { REACT_APP_API_URL } from "../config";
import moment from "moment-timezone";

export const setupAxios = (store) => {
  axios.interceptors.request.use((request) => {
    const storeData = store.getState();
    console.log(storeData,"storeeesss");
    const authToken = storeData.auth.token;
    request.headers.Timezone = moment.tz.guess();
    if (authToken) {
      request.headers.Authorization = `jwt ${authToken}`;
    }

    return request;
  });

  axios.interceptors.response.use(
    (res) => {
      const toast = res?.data?.toast;
      if (toast) {
        store.dispatch(
          ToastShow({
            message: res.data.message,
            type: res.data.response_type,
          })
        );
      }
      return res;
    },
    (e) => {
      const toast = e.response?.data?.toast;
      if (toast) {
        store.dispatch(
          ToastShow({
            message: e.response.data.message,
            type: e.response.data.response_type,
          })
        );
      }
      const storeData = store.getState();
      if (storeData.auth.token !== null) {
        if (e?.response?.status === 401) {
          if (e.response.message) {
            store.dispatch(
              ToastShow({
                message: e.response.message,
                type: e.response.data.response_type,
              })
            );
          }
          store.dispatch(removeToken());
          window.location.href = "/login";
        } else if (e?.response?.status === 403) {
          window.location.href = "/";
        }
      }
      return e.response;
    }
  );
};

export default setupAxios;

export function axiosGet(url, data) {
  return axios.get(`${REACT_APP_API_URL}${url}`, {
    params: data,
  });
}

export function axiosPost(url, data, headers) {
  return axios.post(`${REACT_APP_API_URL}${url}`, data, headers ?? {});
}

export const axiosConfig = (method, url, config, data) => {
  return axios({
    method: method,
    url: `${REACT_APP_API_URL}${url}`,
    ...config,
    data,
  });
};

export const axiosPatch = (url, data) => {
  return axios.patch(`${REACT_APP_API_URL}${url}`, data);
};

export const axiosPut = (url, data) => {
  return axios.put(`${REACT_APP_API_URL}${url}`, data);
};

export const axiosDelete = (url) => {
  return axios.delete(`${REACT_APP_API_URL}${url}`);
};
