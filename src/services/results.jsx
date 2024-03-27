import { axiosGet, axiosPost } from '../axios/axios';

export const getResult = (id) => {
  return axiosGet(`/quiz/result/${id}`);
};
export const addResult = (data) => {
  return axiosPost('/quiz/add-result', data);
};

