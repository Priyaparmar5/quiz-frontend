import { axiosPost, axiosGet, axiosPut } from '../axios/axios';

export const login = (user) => {
  return axiosPost('/user/login', user);
};

export const changePassword = (data) => {
  return axiosPost('/user/change-password', data);
};

export const signUp = (data) => {
  return axiosPost('/user/register', data);
};

