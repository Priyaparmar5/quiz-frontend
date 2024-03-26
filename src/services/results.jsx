import { axiosPost } from '../axios/axios';

export const login = (user) => {
  return axiosPost('/user/login', user);
};
export const addResult = (data) => {
  return axiosPost('/quiz/add-result', data);
};

