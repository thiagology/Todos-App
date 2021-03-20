import axios from 'axios';
import { toast } from 'react-toastify';
import { tokenKey } from './constants';

const { REACT_APP_API_BASE_URL: apiBaseURL } = process.env;

const myAxios = axios.create({
  baseURL: apiBaseURL,
});

myAxios.interceptors.request.use((request) => { // atualiza os dados do token quando houver um request
  const token = localStorage.getItem(tokenKey);

  if (token) {
    request.headers.Authorization = `bearer ${token}`;
  }

  return request;
});

myAxios.interceptors.response.use((response) => {
  if (response.status >= 400) {
    toast.error('Request Failed ...');
  }
  
  return response;
});

export default myAxios;