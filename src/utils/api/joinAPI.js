import axios from 'axios';
import { authToken } from 'utils/authToken';
import { JOIN_API, CHECK_NICKNAME_API } from './_ep';

const api = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

export const join = {
  submit: data => api.post(JOIN_API, data),
  nickname: data => api.head(CHECK_NICKNAME_API(data))
  // send_code: data => api.post(SEND_CODE_API, data)
  // verify_code: data => api.head(VERIFY_CODE_API, data)
};

axios.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${authToken.getToken()}`;
    config.withCredentials = true;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);